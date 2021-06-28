import React from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";

class EditProfile extends React.Component {
  state = {
    formData: {
      title: " ",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      skills: "",
      primaryImage: "",
    },
  };

  // we coordinate with names of
  //properties of state
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    //console.log(currentTarget);
    let newValue = currentTarget.value; //  capture prop value
    let inputName = currentTarget.name; // assn prop name of input value (e.g. eMail)
    //console.log(newValue, currentTarget);

    this.setState((prevState) => {
      //current most recent state object
      let formData = { ...prevState.formData }; // copying all of the properties of current state at this momenent in time
      formData[inputName] = newValue; // bind state to ea form field
      // as char entered
      return { formData };
    });
  };

  onUpdateClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //console.log(e.currentTarget);
    let payload = { ...this.state.formData };
    //console.log(payload);

    let formatPayload = {
      title: payload.title,
      bio: payload.bio,
      summary: payload.summary,
      headline: payload.headline,
      slug: payload.slug,
      statusId: payload.statusId,
      primaryImage: payload.primaryImage.imageUrl,
    };

    let id = payload.id;

    if (id) {
      userService
        .updateFriendById(id, formatPayload)
        .then(onUpdateFriendSuccess)
        .catch(onUpdateFriendFail);
    } else {
      userService
        .addFriend(formatPayload)
        .then(onAddFriendSuccess)
        .catch(onAddFriendFail);
    }

    function onUpdateFriendSuccess(res) {
      console.log("onUpdateFriendSuccess:", res);
      (function () {
        toast.success("Update Friend Successful", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })();
    }

    function onUpdateFriendFail(res) {
      console.warn("onUpdateFail", res);
      (function () {
        toast.error("Failed To Update Friend", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })();
    }

    function onAddFriendSuccess(res) {
      console.log("onAddFriendSuccess:", res);
      (function () {
        toast.success("Add Friend Successful", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })();
    }

    function onAddFriendFail(res) {
      console.warn(res);
    }
  };

  componentDidMount = () => {
    let personId = this.props.match.params.personId;
    console.log(personId);
    if (personId) {
      userService
        .getFriendById(personId)
        .then(this.onGetFriendIdSuccess)
        .catch(this.onGetFriendByIdFail);
    }
  };

  onGetFriendIdSuccess = (res) => {
    let friendToPop = res.data.item;
    console.log("onGetFriendIdSuccess res.data.item", friendToPop);

    this.setState((prevState) => {
      var formData = { ...friendToPop }; // copies the properties from the entire object so we don't mutate state
      return { formData }; // returns the ammended formData
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container main flex-column bkground">
          <div className="container parent-container d-flex">
            <div className="container left">
              <div className="row">
                <div className="col">
                  <form>
                    <div className="title" text="html">
                      <h3>User Profile</h3>
                    </div>

                    <label htmlFor="inputTitle" className="title">
                      Title
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="title"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.title}
                    />

                    <label htmlFor="inputBio" className="bio">
                      Bio
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="bio"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.bio}
                    />

                    <label htmlFor="inputSummary" className="summary">
                      Summary
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="summary"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.summary}
                    />

                    <label htmlFor="inputHeadline" className="headline">
                      Headline
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="headline"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.headline}
                    />

                    <label htmlFor="inputSlug" className="slug">
                      Slug
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="slug"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.slug}
                    />

                    <label htmlFor="inputStatusId" className="statusId">
                      StatusId
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="statusId"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.statusId}
                    />

                    <label htmlFor="inputSkills" className="skills">
                      Skills
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="skills"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.skills || ""}
                    />
                  </form>
                </div>
              </div>
            </div>

            <div className="container middle">
              <div className="row">
                <div className="col-md-12">
                  <div id="primaryimage" className="col text-center"></div>
                  <label htmlFor="inputImage" className="image">
                    Image URL
                  </label>

                  <input
                    className="form-control clear-fields"
                    type="text"
                    name="primaryImage"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.primaryImage}
                  />

                  <img
                    className="card-img-top"
                    src={this.state.formData.primaryImage}
                    style={{
                      border: "solid",
                      borderRadius: 30,
                      marginLeft: 75,
                      marginTop: 0,
                      width: 100,
                    }}
                    alt="..."
                  />
                </div>

                <div className="col-md-12">
                  <button
                    id="putAPI"
                    type="submit"
                    className="btn btn-info ml-3 mb-5"
                    onClick={this.onUpdateClick}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditProfile;
