import React from "react";
import { Container } from "reactstrap";
import * as friendService from "../services/friendService";
import Swal from "sweetalert2";

class CreatFriends extends React.Component {
  state = {
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "1",
    primaryImage: "",
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      console.log("newState", newState);

      return newState;
    });
  };

  onUpdateButtonClicked = (e) => {
    e.preventDefault();

    friendService
      .addFriend(this.state)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };
  onActionSuccess = (response) => {
    Swal.fire(
      "Success!",
      "You have added new friend successfully!",
      "success"
    ).then(this.props.history.push("/Friends"));

    console.log(response);
  };
  onActionError = (errResponse) => {
    Swal.fire(" Faliled", "Something went wrong!", "error");

    console.error(errResponse);
  };

  render() {
    return (
      <React.Fragment>
        <Container className="themed-container" fluid="sm">
          <form className="form-addfriend center">
            <h1 className="mt-4">User Profile</h1>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Titie
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.title}
                  type="text"
                  className="form-control-lg"
                  id="inputTitle"
                  name="title"
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Bio
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.bio}
                  type="text"
                  className="form-control-lg"
                  id="inputBio"
                  name="bio"
                  placeholder="Bio"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Summary
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.summary}
                  type="text"
                  className="form-control-lg"
                  id="inputSummary"
                  name="summary"
                  placeholder="summary"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Headline
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.headline}
                  type="text"
                  className="form-control-lg"
                  id="inputHeadline"
                  name="headline"
                  placeholder="Headline"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Slug
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.slug}
                  type="Url"
                  className="form-control-lg"
                  id="inputSlug"
                  name="slug"
                  placeholder="Slug Url"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Status
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.statusId}
                  type="text"
                  className="form-control-lg"
                  id="inputStatusId"
                  name="statusId"
                  placeholder="Status"
                />
              </div>
            </div>
            <div className="form-group row" align="center">
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Primary Image
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.primaryImage}
                  type="url"
                  className="form-control-lg"
                  id="inputImage"
                  name="primaryImage"
                  placeholder="Primary image Url"
                />
              </div>
            </div>
            <div className="button">
              <button
                onClick={this.onUpdateButtonClicked}
                type="button"
                id="update"
                className="btn btn-primary mr-5"
              >
                Update
              </button>
            </div>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

export default CreatFriends;
