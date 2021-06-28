import React from "react";
import { Container } from "reactstrap";
import * as friendService from "../services/friendService";
import Swal from "sweetalert2";

class UpdateFriends extends React.Component {
  state = {
    friendData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
    },
  };

  componentDidMount() {
    if (this.props.location.state) {
      let locState = this.props.location.state;
      if (locState.type === "friendData") {
        let friendData = { ...locState.payload };

        this.setState(() => {
          friendData.primaryImage = friendData.primaryImage.imageUrl;
          friendData.statusId = "1";
          friendData.dateCreated = "";
          friendData.dateModified = "";
          friendData.entityTypeId = "";
          friendData.skills = "";
          console.log(friendData);

          return { friendData };
        });
      }
    } else if (!this.props.location.state) {
      let friendId = this.props.match.params.friendId;
      friendService.getFriend(friendId).then(this.onGetFriendSuccess);
    }
  }

  onGetFriendSuccess = (response) => {
    console.log(response.data.item);
    let friendData = response.data.item;

    this.setState(() => {
      friendData.primaryImage = friendData.primaryImage.imageUrl;
      friendData.statusId = "1";
      friendData.dateCreated = "";
      friendData.dateModified = "";
      friendData.entityTypeId = "";
      friendData.skills = "";
      console.log(friendData);

      return { friendData };
    });
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let friendData = { ...prevState.friendData };
      friendData[inputName] = newValue;

      console.log("newState", friendData);

      return { friendData };
    });
  };

  onUpdateButtonClicked = (e) => {
    e.preventDefault();
    let id = this.state.friendData.id;
    console.log(id);

    friendService
      .updateFriend(id, this.state.friendData)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };
  onActionSuccess = (response) => {
    Swal.fire(
      "Success!",
      "You have update a friend successfully!",
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
                Title
              </label>
              <div className="col-sm-5">
                <input
                  onChange={this.onFormFieldChanged}
                  value={this.state.friendData.title || ""}
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
                  value={this.state.friendData.bio || ""}
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
                  value={this.state.friendData.summary || ""}
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
                  value={this.state.friendData.headline || ""}
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
                  value={this.state.friendData.slug || ""}
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
                  value={this.state.friendData.statusId || ""}
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
                  value={this.state.friendData.primaryImage}
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

export default UpdateFriends;
