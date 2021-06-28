import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, CardImg } from "reactstrap";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

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
        imageUrl: this.defaultFriendImage,
      },
    };
  }

  componentDidMount = () => {
    // console.log("FriendForm did mount...");

    if (this.props.location.pathname !== "/friends/new") {
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
            skills: "",
            imageUrl: this.props.location.state.friendInfo.primaryImage.imageUrl,
          },
        };
        if (newState.friendForm.skills) {
          newState.friendForm.skills = this.props.location.state.friendInfo.skills
            .map((skill) => skill.name)
            .join(", ");
        }
        return newState;
      }, this.clickFriendImageSubmitButton);
    }
    console.log("Component finished mounting.");
  };

  defaultFriendImage =
    "https://www.pngitem.com/pimgs/m/164-1648722_female-filled-icon-kostenloser-human-silhouette-head-and.png";

  onFriendsFormChange = (e) => {
    let currentTargetName = e.currentTarget.name;
    let currentTargetValue = e.currentTarget.value;
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.friendForm[currentTargetName] = currentTargetValue;
      return newState;
    });
  };

  // clickFriendImageSubmitButton = (e) => {
  //   if (e) {
  //     e.preventDefault();
  //   }
  //   this.setState(() => {
  //     const newState = { ...this.state };
  //     newState.friendForm.imageUrl = document.getElementById("friendImageInput").value;
  //     return newState;
  //   });

  //   if (this.state.friendForm.imageUrl !== "") {
  //     document.getElementById("friendImageDisplay").src = this.state.friendForm.imageUrl;
  //   } else {
  //     document.getElementById("friendImageDisplay").src = this.defaultFriendImage;
  //   }
  // };

  clickFriendSubmitButton = (e) => {
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
    const newFriend = {
      title: this.state.friendForm.title,
      bio: this.state.friendForm.bio,
      summary: this.state.friendForm.summary,
      headline: this.state.friendForm.headline,
      slug: this.state.friendForm.slug,
      statusId: this.state.friendForm.statusId,
      primaryImage: document.getElementById("friendImageDisplay").getAttribute("src"),
    };

    // **** The "/friends" API does not accept skills ****
    // let skillText = this.state.friendForm.skills;
    // if (skillText.indexOf(",") !== -1) {
    //   skillText = skillText.split(",");
    // } else {
    //   skillText = skillText.split(" ");
    // }
    // newFriend.skills = [...skillText];
    //*****************************************************

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
    debugger;
    console.error("Error adding new friend.");
    const errorText = error.response.data.errors;
    const ErrorDiv = () => (
      <div>
        <p>Registration failed:</p>
        <p>{errorText.join("\n")}</p>
      </div>
    );
    toast.error(<ErrorDiv />, { autoClose: 10000 });
  };

  onUpdateFriendSuccess = (response) => {
    toast.success(`Friend updated.`);
  };

  onUpdateFriendError = (error) => {
    debugger;
    toast.error(`Error updating friend.`);
    console.error("Error updating friend.", error);
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
      newState.friendForm.imageUrl = "";
      document.getElementById("friendImageDisplay").setAttribute("src", this.defaultFriendImage);

      return newState;
    });
  };

  clickFriendCancelButton = (e) => {
    e.preventDefault();
    this.props.history.push("/friends");
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
                              className="form-label my-label col-3"
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
                            <Label for="friendBioInput" className="form-label my-label col-3">
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
                            <Label for="friendSummaryInput" className="form-label my-label col-3">
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
                            <Label for="friendHeadlineInput" className="form-label my-label col-3">
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
                            <Label for="friendSlugInput" className="form-label my-label col-3">
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
                            <Label className="form-label my-label col-3">Status</Label>
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
                            <Label className="form-label my-label col-3">Skills</Label>
                            <Input
                              type="text"
                              className="form-control my-input-control col"
                              name="skills"
                              //As of right now the POST/PUT of friends does not accept "skills"
                              disabled="disabled"
                              value={this.state.friendForm.skills}
                              onChange={this.onFriendsFormChange}
                              aria-describedby="friendSkillsHelp"
                            />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1 align-items-top">
                        <Label className="col-3 form-label my-label" style={{ height: "10rem" }}>
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
                              this.state.friendForm.imageUrl === ""
                                ? this.defaultFriendImage
                                : this.state.friendForm.imageUrl
                            }
                            id="friendImageDisplay"
                            alt="Friend avatar"
                          />
                        </div>
                      </FormGroup>
                      <FormGroup className=" row mr-1 align-items-top">
                        <div className="col">
                          <div className="row align-items-center">
                            <Label className="form-label my-label col-3">Image URL</Label>
                            <Input
                              type="url"
                              className="form-control col p-1 ml-0"
                              id="friendImageInput"
                              placeholder={"www.avatar-url-here.com"}
                              name="imageUrl"
                              value={this.state.friendForm.imageUrl}
                              onChange={this.onFriendsFormChange}
                              aria-describedby="friendImageHelp"
                            ></Input>
                          </div>
                        </div>
                      </FormGroup>
                      {/* <Button
                            type="submit"
                            color="primary"
                            className="row ml-0"
                            style={{ width: "100% !important" }}
                            id="friendImageUploadButton"
                            onClick={this.clickFriendImageSubmitButton}
                          >
                            <span className="fas fa-upload"> </span> Upload
                          </Button> */}
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
                          className=" m-1"
                          id="friendFormClearButton"
                          onClick={this.clickFriendClearButton}
                        >
                          Clear Form
                        </Button>
                        <Button
                          type="reset"
                          color="secondary"
                          className=" m-1"
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
