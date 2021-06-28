import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, CardImg } from "reactstrap";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import * as friendService from "../services/friendService";
// import { render } from "react-dom";

class FriendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendForm: {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        skills: "",
        primaryImageUrl: this.defaultFriendImage,
      },
    };
  }

  componentDidMount = () => {
    if (this.props.location.pathname !== "/friends/new") {
      // If the path has an id - upload the friend data into the form/state
      this.setState(() => {
        const newState = {
          friendForm: {
            id: this.props.location.state.friendInfo.id,
            title: this.props.location.state.friendInfo.title,
            bio: this.props.location.state.friendInfo.bio,
            summary: this.props.location.state.friendInfo.summary,
            headline: this.props.location.state.friendInfo.headline,
            slug: this.props.location.state.friendInfo.slug,
            statusId: this.props.location.state.friendInfo.statusId,
            // Join the skills into a string
            skills:
              this.props.location.state.friendInfo.skills === null
                ? ""
                : this.props.location.state.friendInfo.skills
                    .map((skill) => {
                      return skill.name;
                    })
                    .join(", "),
            // Check for a null or undefined image and assign a default image
            primaryImageUrl:
              this.props.location.state.friendInfo.primaryImage.imageUrl === null ||
              this.props.location.state.friendInfo.primaryImage.imageUrl === undefined
                ? this.defaultFriendImage
                : this.props.location.state.friendInfo.primaryImage.imageUrl,
          },
        };
        return newState;
      }, this.clickFriendImageSubmitButton);
    }
    console.log("Component finished mounting.");
  };

  defaultFriendImage = "https://i.pinimg.com/originals/3e/04/6e/3e046ee4eccb7438bdb0d3a7a9e314bd.png";

  onFriendsFormChange = (e) => {
    let currentTargetName = e.currentTarget.name;
    let currentTargetValue = e.currentTarget.value;
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.friendForm[currentTargetName] = currentTargetValue;
      return newState;
    });
  };

  clickFriendSubmitButton = (e) => {
    // This function is called when the user clicks on the "Submit/Update" button on the FriendForm
    e.preventDefault();
    const friendData = this.getNewFriendData();
    if (!this.state.friendForm.hasOwnProperty("id")) {
      // Add new friend
      friendService.addFriend(friendData).then(this.onAddFriendSuccess).catch(this.onAddFriendError);
    } else {
      // Update old friend
      friendData.id = this.props.location.state.friendInfo.id;
      friendService.updateFriend(friendData).then(this.onUpdateFriendSuccess).catch(this.onUpdateFriendError);
    }
  };

  getNewFriendData = () => {
    // This function is called by the "clickFriendSubmitButton" function when the user clicks the "Add/Update" button on the FriendForm
    // This function is also called
    // This function will return the form data in the correct format for a friend add/update call to the server
    const newFriend = {
      title: this.state.friendForm.title,
      bio: this.state.friendForm.bio,
      summary: this.state.friendForm.summary,
      headline: this.state.friendForm.headline,
      slug: this.state.friendForm.slug,
      statusId: this.state.friendForm.statusId,
      // Null check on friend image URL...
      primaryImageUrl:
        this.state.friendForm.primaryImageUrl === null ||
        this.state.friendForm.primaryImageUrl === undefined ||
        this.state.friendForm.primaryImageUrl === ""
          ? this.defaultFriendImage
          : this.state.friendForm.primaryImageUrl,
    };
    // Format the skills into an array
    let skillText = this.state.friendForm.skills;
    if (skillText.indexOf(",") !== -1) {
      skillText = skillText.split(",");
    } else {
      skillText = skillText.split(" ");
    }
    newFriend.skills = [...skillText].map((skill) => {
      return { name: skill };
    });
    return newFriend;
  };

  onAddFriendSuccess = (response) => {
    toast.success(`Added new friend, ID: ${response.data.item}`);
    this.setState(() => {
      const newState = { ...this.state };
      newState.friendForm.id = response.data.item;
      return newState;
    });
    const friendInfo = this.getNewFriendData();
    friendInfo.id = response.data.item;
    this.props.history.push(`/friends/${response.data.item}/edit`, { friendInfo });
  };

  onAddFriendError = (error) => {
    console.error("Error adding new friend.");
    const errorText = error.response.data.errors;
    const ErrorDiv = () => (
      <div>
        <p>Registration failed:</p>
        <p>{errorText.join("\n")}</p>
      </div>
    );
    toast.error(<ErrorDiv />, { autoClose: 15000 });
    debugger;
  };

  onUpdateFriendSuccess = (response) => {
    toast.success(`Friend updated.`);
  };

  onUpdateFriendError = (error) => {
    console.error("Error updating friend.", error);
    const errorText = error.response.data.errors;
    const ErrorDiv = () => (
      <div>
        <p>Updating friend failed:</p>
        <p>{errorText.join("\n")}</p>
      </div>
    );
    toast.error(<ErrorDiv />, { autoClose: 15000 });
    debugger;
  };

  clickFriendClearButton = (e) => {
    this.setState(() => {
      const newState = { ...this.state };
      newState.friendForm.title = "";
      newState.friendForm.bio = "";
      newState.friendForm.summary = "";
      newState.friendForm.headline = "";
      newState.friendForm.slug = "";
      newState.friendForm.statusId = "";
      newState.friendForm.skills = "";
      newState.friendForm.primaryImageUrl = "";
      return newState;
    });
  };

  clickFriendDeleteButton = (e) => {
    e.preventDefault();
    if (this.state.friendForm.hasOwnProperty("id")) {
      Swal.fire({
        title: "Are you sure you want to delete your friend?",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: `Delete`,
      }).then((result) => {
        if (result.isConfirmed) {
          friendService
            .deleteFriend(this.state.friendForm.id)
            .then(this.onDeleteFriendSuccess)
            .catch(this.onDeleteFriendError);
        }
      });
    }
  };

  onDeleteFriendSuccess = (response) => {
    const friendId = this.searchTextFromAxiosResponse(response);
    toast.success(`Friend ID# ${friendId} deleted.`);
    this.props.history.push("/friends");
  };

  onDeleteFriendError = (error) => {
    toast.error("Could not delete friend.");
    console.error(error);
    debugger;
  };

  clickFriendCancelButton = (e) => {
    e.preventDefault();
    this.props.history.push("/friends");
  };

  imageFailsToLoad = (e) => {
    // If the friend image for the Add/Update form preview fails to load, this will change the image source to a default image.
    e.currentTarget.onError = null;
    e.currentTarget.src = this.defaultFriendImage;
  };

  searchTextFromAxiosResponse = (response) => {
    let url = response.config.url;
    if (url.indexOf("=") === -1) {
      url = url.split("/");
    } else {
      url = url.split("=");
    }
    return url[url.length - 1];
  };

  render() {
    return (
      <div className="col pl-3 mr-3" style={{ zIndex: "10" }}>
        <div className="row m-0 pl-0 pt-2 pb-2 pr-2">
          <h3 className="col pl-0" id="mainTitle">
            Friends
          </h3>
        </div>

        <div className="row pl-3">
          <div className="col nav-item pl-0 pr-3" style={{ marginBottom: "1rem" }}>
            <div className="row pl-3 pr-3 pb-3 pt-0">
              <div
                className=" container row border border-secondary rounded mb-0 mr-3 ml-0 p-3"
                id="friendAddUpdateFormBorder"
                style={{ backgroundColor: "rgb(210, 217, 235)", width: "fit-content" }}
              >
                <div className="col pl-3 pt-0 pb-0 m-0" style={{ width: "350px" }}>
                  <div className="row">
                    <Form
                      className="friendLogForm col-4 mr-3"
                      id="friendAddUpdateForm"
                      style={{ marginBottom: "1rem", minWidth: "350px", height: "fit-content" }}
                    >
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label
                              for="friendTitleInput"
                              className="form-label my-friendForm-label col-3"
                              style={{ minWidth: "68px" }}
                            >
                              Title
                            </Label>
                            <Input
                              type="text"
                              className="form-control my-input-control col"
                              id="friendTitleInput"
                              name="title"
                              value={this.state.friendForm.title}
                              onChange={this.onFriendsFormChange}
                              aria-describedby="friendTitleHelp"
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="friendBioInput" className="form-label my-friendForm-label col-3">
                              Bio
                            </Label>
                            <textarea
                              className="form-control my-Input-control col"
                              id="friendBioInput"
                              name="bio"
                              value={this.state.friendForm.bio}
                              onChange={this.onFriendsFormChange}
                              rows="4"
                            ></textarea>
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="friendSummaryInput" className="form-label my-friendForm-label col-3">
                              Summary
                            </Label>

                            <Input
                              type="text"
                              className="form-control my-input-control col"
                              id="friendSummaryInput"
                              name="summary"
                              value={this.state.friendForm.summary}
                              onChange={this.onFriendsFormChange}
                              aria-describedby="friendSummaryHelp"
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="friendHeadlineInput" className="form-label my-friendForm-label col-3">
                              Headline
                            </Label>
                            <Input
                              type="text"
                              className="form-control my-input-control col"
                              id="friendHeadlineInput"
                              name="headline"
                              value={this.state.friendForm.headline}
                              onChange={this.onFriendsFormChange}
                              aria-describedby="friendHeadlineHelp"
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label for="friendSlugInput" className="form-label my-friendForm-label col-3">
                              Slug
                            </Label>
                            <Input
                              type="text"
                              className="form-control my-input-control col"
                              id="friendSlugInput"
                              name="slug"
                              value={this.state.friendForm.slug}
                              onChange={this.onFriendsFormChange}
                              aria-describedby="friendSlugHelp"
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label className="form-label my-friendForm-label col-3">Status</Label>
                            <select
                              type="select"
                              className="custom-select form-control my-input-control col"
                              name="statusId"
                              value={this.state.friendForm.statusId}
                              onChange={this.onFriendsFormChange}
                            >
                              <option value="">Select Status...</option>
                              <option value="Active">Active</option>
                              <option value="NotSet">Not Set</option>
                              <option value="Deleted">Deleted</option>
                              <option value="Flagged">Flagged</option>
                            </select>
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label className="form-label my-friendForm-label col-3">Skills</Label>
                            <Input
                              type="text"
                              className="form-control my-input-control col"
                              name="skills"
                              value={this.state.friendForm.skills}
                              onChange={this.onFriendsFormChange}
                              aria-describedby="friendSkillsHelp"
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1 align-items-top">
                        <Label className="col-3 form-label my-friendForm-label" style={{ height: "10rem" }}>
                          Primary Image
                        </Label>
                        <div className="col pl-0 pr-0" style={{ minWidth: "100px" }}>
                          <CardImg
                            className="row ml-0"
                            style={{
                              objectFit: "scale-down",
                              objectPosition: "left top",
                              marginBottom: "0.25rem",
                              maxHeight: "150px",
                              maxWidth: "100%",
                            }}
                            src={
                              this.state.friendForm.primaryImageUrl === ""
                                ? this.defaultFriendImage
                                : this.state.friendForm.primaryImageUrl
                            }
                            onError={this.imageFailsToLoad}
                            id="friendImageDisplay"
                            alt="Friend avatar"
                          />
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1 align-items-top">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label className="form-label my-friendForm-label col-3">Image URL</Label>
                            <Input
                              type="url"
                              className="form-control col p-1 ml-0"
                              id="friendImageInput"
                              placeholder={"www.default-image-url.com"}
                              name="primaryImageUrl"
                              value={this.state.friendForm.primaryImageUrl}
                              onChange={this.onFriendsFormChange}
                              aria-describedby="friendImageHelp"
                            ></Input>
                          </div>
                        </div>
                      </FormGroup>
                      <div
                        className="row mr-1 pt-3 ml-0"
                        style={{ justifyContent: "center", borderTop: "2px #8e9194 solid" }}
                      >
                        <Button
                          type="submit"
                          color="success"
                          className="m-1"
                          id="friendFormSubmitButton"
                          onClick={this.clickFriendSubmitButton}
                        >
                          {this.state.friendForm.hasOwnProperty("id") ? "Update" : "Submit"}
                        </Button>
                        <Button
                          type="reset"
                          color="warning"
                          className="m-1"
                          id="friendFormClearButton"
                          onClick={this.clickFriendClearButton}
                        >
                          Clear Form
                        </Button>
                        <Button
                          type="submit"
                          color="danger"
                          className="m-1"
                          id="friendFormDeleteButton"
                          onClick={this.clickFriendDeleteButton}
                        >
                          Delete Friend
                        </Button>
                        <Button
                          type="reset"
                          color="secondary"
                          className="m-1"
                          id="friendFormCancelButton"
                          onClick={this.clickFriendCancelButton}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FriendForm);
