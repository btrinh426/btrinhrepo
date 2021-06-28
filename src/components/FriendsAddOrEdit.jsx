import React from "react";
import { toast } from "react-toastify";
import * as usersService from "../services/usersService";
import * as friendsService from "../services/friendsService";

class FriendsAddOrEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      isLoggedIn: false,
      userInfo: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        avatarUrl: "",
      },
      formData: {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        primaryImage: "",
      },
    };
    this.setIsLoggedIn();
  }

  setIsLoggedIn = () => {
    usersService
      .getCurrentUser()
      .then(this.getCurrentUserSuccess)
      .catch(this.getCurrentUserError);
  };

  getCurrentUserSuccess = (response) => {
    console.log(response);
    this.setState((prevstate) => ({ isLoggedIn: true }));
    console.log(this.state.isLoggedIn);
    this.setState((prevstate) => ({
      userInfo: {
        id: response.data.item.id,
      },
    }));
    console.log(this.state.userInfo);

    this.setUserInfo(this.state.userInfo.id);
  };

  getCurrentUserError = (error) => {
    console.log(error);
    this.setState((prevstate) => ({ isLoggedIn: false }));
  };

  setUserInfo = (id) => {
    usersService
      .getUserInfoById(id)
      .then(this.onGetUserInfoByIdSuccess)
      .catch(this.onGetUserInfoError);
  };

  onGetUserInfoByIdSuccess = (response) => {
    this.setState((prevstate) => ({
      userInfo: {
        firstName: response.data.item.firstName,
        lastName: response.data.item.lastName,
        email: response.data.item.email,
        avatarUrl: response.data.item.avatarUrl,
      },
    }));

    console.log("User Info Set", response);
  };

  onGetUserInfoError = (error) => {
    console.log("User Info Not Set", error);
  };

  onFormFieldChanged = (e) => {
    console.log(e.currentTarget);
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    });
  };

  onAddEditBtnClicked = (e) => {
    console.log(e.currentTarget);

    friendsService
      .add(this.state.formData)
      .then(this.onAddSuccess)
      .catch(this.onAddError);
  };

  onAddSuccess = (response) => {
    console.log(response);
    toast.success(<div>Add Friend Successful</div>);

    this.setState(
      (this.state.formData = {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        primaryImage: "",
      })
    );
  };

  onAddError = (error) => {
    console.error(error);
    toast.error(<div>Could not add friend</div>);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container w-50 p-5">
          <br />

          <form>
            <div className="form-group row">
              <label htmlFor="inputTitle" className="col-sm-2 col-form-label">
                Title
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  name="title"
                  value={this.state.formData.title}
                  onChange={this.onFormFieldChanged}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputBio" className="col-sm-2 col-form-label">
                Bio
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputBio"
                  name="bio"
                  value={this.state.formData.bio}
                  onChange={this.onFormFieldChanged}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputSummary" className="col-sm-2 col-form-label">
                Summary
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputSummary"
                  name="summary"
                  value={this.state.formData.summary}
                  onChange={this.onFormFieldChanged}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                htmlFor="inputHeadline"
                className="col-sm-2 col-form-label"
              >
                Headline
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputHeadline"
                  name="headline"
                  value={this.state.formData.headline}
                  onChange={this.onFormFieldChanged}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputSlug" className="col-sm-2 col-form-label">
                Slug
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputSlug"
                  name="slug"
                  value={this.state.formData.slug}
                  onChange={this.onFormFieldChanged}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputStatus" className="col-sm-2 col-form-label">
                Status
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputStatus"
                  name="statusId"
                  value={this.state.formData.statusId}
                  onChange={this.onFormFieldChanged}
                />
              </div>
            </div>

            {/* Omit for now because not matched to API*/
            /* <div className="form-group row">
              <label htmlFor="inputSkills" className="col-sm-2 col-form-label">
                Skills
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputSkills"
                  name="skills"
                  value={this.state.formData.skills}
                  onChange={this.onFormFieldChanged}
                />
              </div>
            </div> */}

            <div className="form-group row">
              <label
                htmlFor="inputPrimaryImage"
                className="col-sm-2 col-form-label"
              >
                Primary Image
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputPrimaryImage"
                  name="primaryImage"
                  value={this.state.formData.primaryImage}
                  onChange={this.onFormFieldChanged}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <button
                  type="button"
                  className="btn btn-primary"
                  name="addEditSubmit"
                  onClick={this.onAddEditBtnClicked}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default FriendsAddOrEdit;
