import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from "reactstrap";
import * as friendService from "../services/friendService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Jobs extends Component {
  state = {
    friends: [],
    addUpdateFriendModalShown: false,
    newFriend: {
      // title,
      // firstName,
      // lastName,
      // bio,
      // summary,
      // headline,
      // slug,
      // statusId,
      // skills,
      // primaryImage,
    },
  };

  defaultFriendImage =
    "https://www.pngitem.com/pimgs/m/164-1648722_female-filled-icon-kostenloser-human-silhouette-head-and.png";

  componentDidMount = () => {
    console.log("Friends component mounted....getting friends database....");
    this.getFriendDatabase();
  };

  clickShowHideFriends = (e) => {
    console.log("Clicked Show/Hide Friends button.");
    if (e.currentTarget.innerText.indexOf("Show") !== -1) {
      e.currentTarget.innerText = "Hide Active Friends";
      document.getElementById("displayFriendCards").classList.remove("d-none");
    } else {
      e.currentTarget.innerText = "Show Active Friends";
      document.getElementById("displayFriendCards").classList.add("d-none");
    }
  };

  onFriendsFormChange = (e) => {
    let currentTargetName = e.currentTarget.name;
    let currentTargetValue = e.currentTarget.value;
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.newFriend[currentTargetName] = currentTargetValue;
      return newState;
    });
  };

  getNewFriendData = () => {
    const defaultFriendImage =
      "https://www.pngitem.com/pimgs/m/164-1648722_female-filled-icon-kostenloser-human-silhouette-head-and.png";
    const newFriend = {
      title: this.state.newFriend.title,
      firstName: this.state.newFriend.firstName,
      lastName: this.state.newFriend.lastName,
      bio: this.state.newFriend.bio,
      summary: this.state.newFriend.summary,
      headline: this.state.newFriend.headline,
      slug: this.state.newFriend.slug,
      statusId: this.state.newFriend.statusId,
      skills: this.state.newFriend.skills,
      primaryImage: this.state.newFriend.primaryImage || defaultFriendImage,
    };
    return newFriend;
  };

  getFriendDatabase = () => {
    console.log("Running getFriendDatabase");
    friendService.getFriends(0, 50).then(this.onGetFriendDatabaseSuccess).catch(this.onGetFriendDatabaseError);
  };

  onGetFriendDatabaseSuccess = (response) => {
    console.log("Success getting friends from database.");
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.friends = response.data.item.pagedItems;
      return newState;
    }, console.log("this.state.friends updated"));
  };

  onGetFriendDatabaseError = (error) => {
    debugger;
    let errorText = error.response.data.errors.join("\n");
    console.error("Error getting friends from database:");
    console.error(errorText);
  };

  mapSingleFriend = (friend) => {
    // This function takes a friend from the friend array and returns a formatted react element for that friend to be used in the rendering of the page
    // console.log(`Map friend:  ${friend.headline}`);
    // debugger;
    const friendCard = (
      <div
        className={friend.statusId !== "Active" ? " cardparent notInDatabase" : "cardParent"}
        key={friend.id.toString()}
        id={friend.id}
      >
        <div
          className="card border-1 mt-0 ml-0 mr-3 mb-3"
          style={{
            width: "15rem",
            height: "30rem",
            borderColor: "#929089",
            backgroundColor: "rgb(100 152 107 / 30%) !important",
          }}
        >
          <div className="" style={{ textAlign: "center", alignItems: "center" }}>
            <img
              className="friend-card-img"
              style={{ maxHeight: "235px", width: "235px", objectFit: "cover" }}
              src={friend.primaryImage ? friend.primaryImage.imageUrl : this.defaultFriendImage}
              alt="Card cap"
            />
          </div>

          <div className="card-body" style={{ textAlign: "center" }}>
            <h5 className={friend.title}>Friend Name</h5>
            <p className="card-text m-0">{friend.summary}</p>
          </div>
          <div className="card-footer text-center">
            <div>
              <Button
                type="submit"
                color="primary"
                className="btn-sm editFriend mr-3"
                onClick={this.clickFriendCardEditButton}
              >
                Edit
              </Button>
              <Button
                type="submit"
                color="danger"
                className="btn-danger btn-sm deleteFriend"
                onClick={this.clickFriendCardDeleteButton}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
    return friendCard;
  };

  clickFriendCardEditButton = (e) => {
    e.preventDefault();
    const targetParent = e.currentTarget.closest(".cardParent");
    const friendId = parseInt(targetParent.getAttribute("id"));

    this.setState(
      (prevState) => {
        const newState = { ...prevState };
        newState.addUpdateFriendModalShown = true;
        return newState;
      },
      () => {
        console.log(`Edit friend, ID#: ${friendId}`);
        console.log(`State.addUpdateFriendModalShown:  ${this.state.addUpdateFriendModalShown}`);
        this.updateModal(friendId);
      }
    );
  };

  updateModal = (friendId) => {
    console.log("modal should be rendered...");
    console.log("Update friend modal.");

    let stateFriends = [...this.state.friends];
    debugger;
    let friendInfo = stateFriends.find((friend) => friend.id === friendId);
    document.getElementById("friendTitleInput").value = friendInfo.title;
    document.getElementById("friendBioInput").value = friendInfo.bio;
    document.getElementById("friendSummaryInput").value = friendInfo.summary;
    document.getElementById("friendHeadlineInput").value = friendInfo.headline;
    document.getElementById("friendSlugInput").value = friendInfo.slug;
    document.getElementById("friendStatusInput").value = friendInfo.statusId;
    document.getElementById("friendSkillsInput").value = friendInfo.skills;
    document.getElementById("friendImageInput").value = friendInfo.primaryImage
      ? friendInfo.primaryImage.imageUrl
      : this.defaultFriendImage;
  };

  clickFriendCardDeleteButton = (e) => {
    e.preventDefault();
    const targetParent = e.currentTarget.closest(".cardParent");
    const friendId = targetParent.getAttribute("id");
    friendService.deleteFriend(friendId).then(this.onDeleteFriendSuccess).catch(this.onDeleteFriendError);
  };

  onDeleteFriendSuccess = (response) => {
    const friendId = this.searchTextFromAxiosResponse(response);

    // Remove friend from state
    this.setState((prevState) => {
      const newState = { ...prevState };
      const friendLoc = newState.friends.findIndex((friend) => friend.id === friendId);
      newState.friends.splice(friendLoc, 1);
      return newState;
    });
    const targetFriendCard = document.querySelector("div[id=" + CSS.escape(friendId) + "]");
    targetFriendCard.remove();
    toast.success("Friend deleted.");
    console.log(`Deleted friend, ID# ${friendId}`);
  };

  onDeleteFriendError = (error) => {
    debugger;
    toast.error("Could not delete friend.");
    console.error(error);
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

  toggleModal = () => {
    console.log("Add Friend button (or modal 'x') clicked.  Running toggleModal...");
    // debugger;
    if (this.state.addUpdateFriendModalShown) {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.addUpdateFriendModalShown = false;
        return newState;
      });
      return false;
    } else {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.addUpdateFriendModalShown = true;
        return newState;
      });
      return true;
    }
  };

  clickFriendImageSubmitButton = (e) => {
    e.preventDefault();
    console.log("User clicked Friend Image Submit button");
    if (document.getElementById("friendImageInput").value !== "") {
      document.getElementById("friendImageDisplay").src = document.getElementById("friendImageInput").value;
    } else {
      document.getElementById("friendImageDisplay").src = this.defaultFriendImage;
    }
  };

  clickFriendSubmitButton = (e) => {
    e.preventDefault();
    console.log("User clicked Friend Form Submit button");
    const friendToAdd = {
      title: this.state.newFriend.title,
      bio: this.state.newFriend.bio,
      summary: this.state.newFriend.summary,
      headline: this.state.newFriend.headline,
      slug: this.state.newFriend.slug,
      statusId: document.getElementById("friendStatusInput").value,
      skills: this.state.newFriend.skills,
      primaryImage: this.state.newFriend.primaryImage || this.defaultFriendImage,
    };
    friendService.addFriend(friendToAdd).then(this.onAddFriendSuccess).catch(this.onAddFriendError);
  };

  onAddFriendSuccess = (response) => {
    console.log(`Add friend success: ${response.data.item}.`);
    // Add new friend to state:
    const newFriendData = JSON.parse(response.config.data);
    console.log(newFriendData);
    this.setState(
      (prevState) => {
        const newState = { ...prevState };
        const newFriend = {
          id: response.data.item,
          title: newFriendData.title,
          bio: newFriendData.bio,
          headline: newFriendData.headline,
          summary: newFriendData.summary,
          statusId: newFriendData.statusId,
          skills: newFriendData.skills,
          primaryImage: { imageUrl: newFriendData.primaryImage },
        };

        newState.friends.reverse().push(newFriend);
        newState.friends.reverse();

        return newState;
      },
      () => {
        console.log("State set with new friend.");
        toast.success(`Friend added.`);
        this.toggleModal();
      }
    );
  };

  onAddFriendError = (error) => {
    debugger;
    console.error("Error registering new user.");
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

  clickFriendClearButton = (e) => {
    e.preventDefault();
    console.log("User clicked Friend Form Reset button");
    document.getElementById("friendAddUpdateForm").reset();
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.newFriend = {};
      return newState;
    });
  };

  addUpdateFriendModal = () => {
    return (
      <Modal isOpen={this.state.addUpdateFriendModalShown} toggle={this.toggleModal} id="eventAddUpdateModal">
        <div
          className="modal-dialog mb-0 mt-0"
          role="document"
          style={{ minWidth: "750px !important", backgroundColor: "rgb(210, 217, 235)" }}
        >
          <div className="modal-content">
            <ModalHeader toggle={this.toggleModal}>Add Friend Form</ModalHeader>
            <ModalBody className="pl-0 pr-0 pb-0">
              <Form
                className="friendLogForm col-4 mr-3"
                id="friendAddUpdateForm"
                style={{ marginBottom: "1rem", minWidth: "350px", height: "fit-content" }}
              >
                <FormGroup className="form-group row mr-1">
                  <div className="col">
                    <div className="row align-items-center">
                      <Label for="friendTitleInput" className="form-label my-label col-3" style={{ minWidth: "68px" }}>
                        Title
                      </Label>
                      <Input
                        type="text"
                        className="form-control my-input-control col"
                        id="friendTitleInput"
                        name="title"
                        aria-describedby="friendTitleHelp"
                        placeholder=""
                        onChange={this.onFriendsFormChange}
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
                        onChange={this.onFriendsFormChange}
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
                        placeholder=""
                        onChange={this.onFriendsFormChange}
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
                        placeholder=""
                        onChange={this.onFriendsFormChange}
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
                        type="url"
                        className="form-control my-input-control col"
                        id="friendSlugInput"
                        name="slug"
                        aria-describedby="friendSlugHelp"
                        placeholder=""
                        onChange={this.onFriendsFormChange}
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
                        onChange={this.onFriendsFormChange}
                      >
                        {/* <option>Choose...</option> */}
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
                        placeholder=""
                        onChange={this.onFriendsFormChange}
                      />
                    </div>
                  </div>
                </FormGroup>
                <FormGroup className="form-group row mr-1 align-items-top">
                  <Label for="friendImageInput" className="col-3 form-label my-label" style={{ height: "10rem" }}>
                    Primary Image
                  </Label>
                  <div className="col pl-0 pr-0" style={{ minWidth: "100px" }}>
                    <img
                      className="row ml-0"
                      style={{
                        objectFit: "scale-down",
                        objectPosition: "left top",
                        marginBottom: "0.25rem",
                        maxHeight: "150px",
                        maxWidth: "100%",
                      }}
                      src={this.defaultFriendImage}
                      id="friendImageDisplay"
                      alt="Friend avatar"
                    />
                    <Input
                      type="url"
                      className="form-control row p-1 ml-0"
                      id="friendImageInput"
                      name="primaryImage"
                      aria-describedby="friendImageHelp"
                      placeholder="www.imageurl.com"
                      onChange={this.onFriendsFormChange}
                    />
                    <Button
                      type="submit"
                      color="primary"
                      className="row ml-0"
                      style={{ width: "100% !important" }}
                      id="friendImageUploadButton"
                      onClick={this.clickFriendImageSubmitButton}
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
                    onClick={this.clickFriendSubmitButton}
                  >
                    Submit
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
                </div>
                <div className="d-none" id="updateFriendId"></div>
              </Form>
            </ModalBody>
          </div>
        </div>
      </Modal>
    );
  };

  render() {
    console.log("Rendering Friends.jsx");

    // Format friend button:
    let friendShowHideButton;
    if (this.state.friends.length === 0) {
      friendShowHideButton = (
        <Button
          className="col-1 mb-0 ml-0 mt-0 mr-3"
          id="getFriends"
          color="success"
          style={{ minWidth: "170px" }}
          onClick={this.clickShowHideFriends}
        >
          Show Active Friends
        </Button>
      );
    } else {
      friendShowHideButton = (
        <Button
          className="col-1 mb-0 ml-0 mt-0 mr-3"
          id="getFriends"
          color="success"
          style={{ minWidth: "170px" }}
          onClick={this.clickShowHideFriends}
        >
          Hide Active Friends
        </Button>
      );
    }

    return (
      <div className="col pl-3 mr-3">
        <div className="row m-0 pl-0 pt-2 pb-2 pr-2">
          <h3 className="col pl-0" id="mainTitle">
            Friends
          </h3>
        </div>
        <div
          className="container row border border-secondary rounded mb-0 mr-3 ml-0 p-3"
          id="mainView"
          style={{ backgroundColor: "rgb(210, 217, 235)", minWidth: "600px", maxWidth: "2100px" }}
        >
          <div className="col pl-3 pt-0 pb-0 m-0">
            <div className="row pl-0 pr-3 pt-0 pb-0 mb-3">
              <Button
                className="col-1 btn mb-0 ml-0 mt-0 mr-3"
                id="addFriendButton"
                color="secondary"
                style={{ minWidth: "200px" }}
                onClick={() => this.toggleModal()}
              >
                Add A Friend
              </Button>
              {friendShowHideButton}
              <Button
                className="col-1 mb-0 mt-0 ml-0"
                id="getAllFriends"
                color="primary"
                style={{ minWidth: "160px" }}
                onClick={() => console.log("Clicked Show All Frends button")}
              >
                Show All Friends
              </Button>
            </div>
            <div className="row">
              <div className="col nav-item pl-0 pr-3" style={{ marginBottom: "1rem" }}>
                <div className="row displayFriendCards pl-3 pr-3 pb-3 pt-0" id="displayFriendCards">
                  {this.state.friends.map(this.mapSingleFriend)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>{this.addUpdateFriendModal()}</div>
      </div>
    );
  }
}

export default withRouter(Friends);

// <div className="col pl-3">
//   <div className="row m-0 pt-1">
//     <h3>Friends</h3>
//   </div>
//   <div
//     className="container col-3 border border-secondary rounded mb-0 mr-3 ml-0 pl-0 pt-0 pr-0 pb-3"
//     id="userRegister"
//     style={{ backgroundColor: "rgb(210, 217, 235)", minWidth: "406px" }}
//   >
//     <div className="form-header">Welcome</div>

//     <Form className="userLoginForm pl-3 pr-3" style={{ marginTop: "1rem" }}>
//       <div className="form-group row mr-1">
//         <div className="col pr-0">
//           <Input
//             type="text"
//             className="form-control my-input-control col"
//             id="userEmail"
//             name="userEmail"
//             aria-describedby="emailHelp"
//             placeholder="E-mail"
//             // value={this.state.userEmail}
//             onChange={this.onFriendsFormChange}
//           />
//           <div className="col pl-0 pr-0">
//             <small id="emailHelpBlock" className="d-none form-text text-muted col myHelpNote">
//               Please enter your e-mail address.
//             </small>
//           </div>
//         </div>
//       </div>
//       <div className="form-group row mr-1">
//         <div className="col pr-0">
//           <Input
//             type="password"
//             className="form-control my-input-control col"
//             id="passwordInput"
//             name="userPassword"
//             placeholder="Password"
//             onChange={this.onFriendsFormChange}
//           />
//           <FormText>
//             <small id="passwordHelpBlock" className="d-none form-text text-muted col myHelpNote">
//               Please enter your password.
//             </small>
//           </FormText>
//         </div>
//       </div>
//       <div className="form-group row ml-0 mr-1">
//         <Button
//           type="submit"
//           color="primary"
//           className="form-group"
//           id="loginButton"
//           style={{ width: "100%" }}
//           onClick={(e) => {
//             e.preventDefault();
//             console.log("Login button clicked.");
//             this.clickLoginButton();
//           }}
//         >
//           Login
//         </Button>
//       </div>
//       <div className="form-group border-top ml-0 mr-1 pt-3 my-border-top">
//         <div className="col">
//           <div className="row">
//             <Label
//               for="registerNow"
//               className="form-label my-label pb-1"
//               style={{ color: "#212529", fontWeight: "400", textAlign: "center", width: "100%" }}
//             >
//               Need to Signup?
//             </Label>
//           </div>
//           <div className="row">
//             <Button
//               color="secondary"
//               type="submit"
//               id="registerButton"
//               style={{ width: "100%" }}
//               onClick={this.clickRegisterButton}
//             >
//               Register Now
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Form>
//   </div>
// </div>
