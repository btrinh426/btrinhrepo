import React from "react";
import { Form, FormGroup, Label, Input, Button, CardImg } from "reactstrap";
import { toast } from "react-toastify";

import * as friendService from "../services/friendService";
// import Friends from "./Friends";

const FriendForm = (props) => {
  // This function takes a friend from the friend array and returns a formatted react element for that friend to be used in the rendering of the page
  const defaultFriendImage =
    "https://www.pngitem.com/pimgs/m/164-1648722_female-filled-icon-kostenloser-human-silhouette-head-and.png";

  let friendInfo;
  if (props.location.pathname !== "/friends/new") {
    friendInfo = props.location.state.friendInfo;
  } else {
    friendInfo = {
      id: "",
      bio: "",
      title: "",
      summary: "",
      headline: "",
      statusId: "",
      slug: "",
      skills: "",
      primaryImage: { imageUrl: defaultFriendImage },
    };
  }

  // const onFriendsFormChange = (e) => {
  //   let currentTargetName = e.currentTarget.name;
  //   let currentTargetValue = e.currentTarget.value;
  //   this.setState((prevState) => {
  //     let newState = { ...prevState };
  //     newState.newFriend[currentTargetName] = currentTargetValue;
  //     return newState;
  //   });
  // };

  const clickFriendImageSubmitButton = (e) => {
    e.preventDefault();
    console.log("User clicked Friend Image Submit button");
    if (document.getElementById("friendImageInput").value !== "") {
      document.getElementById("friendImageDisplay").src = document.getElementById("friendImageInput").value;
    } else {
      document.getElementById("friendImageDisplay").src = defaultFriendImage;
    }
  };

  const onAddFriendSuccess = (response) => {
    console.log(`Add friend success: ${response.data.item}.`);
    toast.success(`Added new friend, ID: ${response.data.item}`);
    props.history.push("/friends");
    // Add new friend to state:
    // const newFriendData = JSON.parse(response.config.data);
    // console.log(newFriendData);
    // this.setState(
    //   (prevState) => {
    //     let newState = { ...prevState };
    //     const newFriend = {
    //       id: response.data.item,
    //       title: newFriendData.title,
    //       bio: newFriendData.bio,
    //       headline: newFriendData.headline,
    //       summary: newFriendData.summary,
    //       statusId: newFriendData.statusId,
    //       skills: newFriendData.skills,
    //       slug: newFriendData.slug,
    //       primaryImage: { imageUrl: newFriendData.primaryImage },
    //     };

    //     newState.friends.reverse();
    //     newState.friends.push(newFriend);
    //     newState.friends.reverse();
    //     return newState;
    //   },
    //   () => {
    //     console.log("State set with new friend.");
    //     document.getElementById("getFriends").innerText = "Hide Active Friends";
    //     this.props.history.push("/friends");
    //     toast.success(`Friend added.`);
    //   }
    // );
  };

  const onAddFriendError = (error) => {
    debugger;
    console.error("Error adding new friend.");
    const errorText = error.response.data.errors;
    const ErrorDiv = () => (
      <div>
        <p>Registration failed:</p>
        {errorText.map((errMsg) => {
          return <div>{errMsg}</div>;
        })}
      </div>
    );
    toast.error(<ErrorDiv />, { autoClose: 10000 });
  };

  const onUpdateFriendSuccess = (response) => {
    toast.success(`Friend updated.`);
    console.log(`Friend update success: `);
    console.log(response.config.data);
    props.history.push("/friends");
  };

  const onUpdateFriendError = (error) => {
    debugger;
    console.error("Error updating friend.");
    console.error(error);
  };

  const clickFriendSubmitButton = (e) => {
    e.preventDefault();
    console.log("User clicked Friend Form Submit button");
    const friendData = getNewFriendData();
    if (props.location.pathname === "/friends/new") {
      // Add new friend
      friendService.addFriend(friendData).then(onAddFriendSuccess).catch(onAddFriendError);
    } else {
      // Update old friend
      friendData.id = props.location.state.friendInfo.id;
      friendService.updateFriend(friendData).then(onUpdateFriendSuccess).catch(onUpdateFriendError);
    }
  };

  const clickFriendClearButton = (e) => {
    console.log("User clicked Friend Form Reset button");
    document.getElementById("friendTitleInput").defaultValue = "";
    document.getElementById("friendBioInput").defaultValue = "";
    document.getElementById("friendSummaryInput").defaultValue = "";
    document.getElementById("friendHeadlineInput").defaultValue = "";
    document.getElementById("friendSlugInput").defaultValue = "";
    document.getElementById("friendStatusInput").defaultValue = "";
    document.getElementById("friendSkillsInput").defaultValue = "";
    document.getElementById("friendImageDisplay").setAttribute("src", defaultFriendImage);
    document.getElementById("friendImageInput").defaultValue = "www.image-url-here.com";
    // document.getElementById("friendAddUpdateForm").reset();
    // document.getElementById("friendImageDisplay").setAttribute("src", defaultFriendImage);
  };

  const clickFriendCancelButton = (e) => {
    e.preventDefault();
    console.log("User clicked cancel button");
    props.history.push("/friends");
  };

  const getNewFriendData = () => {
    const newFriend = {
      title: document.getElementById("friendTitleInput").value,
      bio: document.getElementById("friendBioInput").value,
      summary: document.getElementById("friendSummaryInput").value,
      headline: document.getElementById("friendHeadlineInput").value,
      slug: document.getElementById("friendSlugInput").value,
      statusId: document.getElementById("friendStatusInput").value,
      skills: document.getElementById("friendSkillsInput").value,
      primaryImage: document.getElementById("friendImageDisplay").getAttribute("src"),
    };
    return newFriend;
  };

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
                    <FormGroup className="form-group row mr-1">
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
                            aria-describedby="friendTitleHelp"
                            defaultValue={friendInfo.title}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="friendBioInput" className="form-label my-label col-3">
                            Bio
                          </Label>
                          <textarea
                            className="form-control my-Input-control col"
                            id="friendBioInput"
                            name="bio"
                            rows="4"
                            defaultValue={friendInfo.bio}
                          ></textarea>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1">
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
                            aria-describedby="friendSummaryHelp"
                            defaultValue={friendInfo.summary}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1">
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
                            aria-describedby="friendHeadlineHelp"
                            defaultValue={friendInfo.headline}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1">
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
                            aria-describedby="friendSlugHelp"
                            defaultValue={friendInfo.slug}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="friendStatusInput" className="form-label my-label col-3">
                            Status
                          </Label>
                          <Input
                            type="select"
                            className="form-control my-input-control col"
                            id="friendStatusInput"
                            name="statusId"
                            defaultValue={friendInfo.statusId}
                          >
                            <option value="">Select Status...</option>
                            <option value="Active">Active</option>
                            <option value="NotSet">Not Set</option>
                            <option value="Deleted">Deleted</option>
                            <option value="Flagged">Flagged</option>
                          </Input>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="friendSkillsInput" className="form-label my-label col-3">
                            Skills
                          </Label>
                          <Input
                            type="text"
                            className="form-control my-input-control col"
                            id="friendSkillsInput"
                            name="skills"
                            aria-describedby="friendSkillsHelp"
                            defaultValue={friendInfo.skills}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1 align-items-top">
                      <Label for="friendImageInput" className="col-3 form-label my-label" style={{ height: "10rem" }}>
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
                          src={friendInfo.primaryImage.imageUrl}
                          id="friendImageDisplay"
                          alt="Friend avatar"
                        />
                        <Input
                          type="url"
                          className="form-control row p-1 ml-0"
                          id="friendImageInput"
                          name="primaryImage"
                          aria-describedby="friendImageHelp"
                          defaultValue={
                            friendInfo.primaryImage.imageUrl === defaultFriendImage
                              ? "www.image-url-here.com"
                              : friendInfo.primaryImage.imageUrl
                          }
                        ></Input>
                        <Button
                          type="submit"
                          color="primary"
                          className="row ml-0"
                          style={{ width: "100% !important" }}
                          id="friendImageUploadButton"
                          onClick={clickFriendImageSubmitButton}
                        >
                          <span className="fas fa-upload"> </span> Upload
                        </Button>
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
                        onClick={clickFriendSubmitButton}
                      >
                        Submit
                      </Button>
                      <Button
                        type="reset"
                        color="warning"
                        className=" m-1"
                        id="friendFormClearButton"
                        onClick={clickFriendClearButton}
                      >
                        Clear Form
                      </Button>
                      <Button
                        type="reset"
                        color="secondary"
                        className=" m-1"
                        id="friendFormCancelButton"
                        onClick={clickFriendCancelButton}
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
};

export default FriendForm;
