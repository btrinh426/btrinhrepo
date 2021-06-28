import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Button, Form, Label, Input, FormText } from "reactstrap";
import * as friendService from "../services/friendService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Friends extends Component {
  state = {
    friends: [],

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

  componentDidMount = () => {
    console.log("Friends component mounted....");
    console.log("Getting friends database....");
    this.getFriendDatabase();
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
    console.log("Runnign getFriendDatabase");
    friendService.getFriends(0, 50).then(this.onGetFriendDatabaseSuccess).catch(this.onGetFriendDatabaseError);
  };

  onGetFriendDatabaseSuccess = (response) => {
    console.log("Success getting friends from database.");
    console.log(response.data.item.pagedItems);
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.friends = response.data.item.pagedItems;
      return newState;
    });
    // Set state.friends here..
    this.displayFriends(this.state.friends);
  };

  onGetFriendDatabaseError = (error) => {
    debugger;
    let errorText = error.response.data.errors.join("\n");
    console.error("Error getting friends from database:");
    console.error(errorText);
  };

  displayFriends = (friendArray) => {
    console.log("Display friends....");
    let arrayOfFriendTemplates = friendArray.map(this.mapSingleFriend);
    // $("#displayFriendCards").empty();
    // $("#displayFriendCards").prepend(arrayOfFriendTemplates);
    // $("#getFriends").text("Hide Friends");
    // $("#getAllFriends").text("Show All Friends");
  };

  mapSingleFriend = (friend) => {
    // This is the mapping function used by the displayFriends function
    // This function takes a friend from the friend array and returns the formatted html for that friend to be used in the #displayFriendCards <div>
    console.log(`Map friend:  ${friend.headline}`);
    // const defaultFriendImage =
    //   "https://banner2.cleanpng.com/20180404/stq/kisspng-avatar-silhouette-computer-icons-female-id-5ac460f16acf04.7287911915228193134375.jpg";
    // let newFriendHTML = $(".friendCardTemplate").html();
    // var newFriendCard = $(newFriendHTML).clone();

    // const friendUrl = friend.primaryImage.imageUrl || defaultFriendImage;
    // $(newFriendCard).find(".friend-card-img").attr("src", friendUrl);
    // $(newFriendCard).find(".card-title").html(`${friend.title}`);
    // $(newFriendCard).find(".card-text").text(`${friend.summary}`);

    // $(newFriendCard).removeClass("d-none");
    // $(newFriendCard).attr("id", friend.id);

    // if (friend.statusId != "Active") {
    //   $(newFriendCard).addClass("notInDatabase"); // This class has CSS styling that shows a red border.
    // }

    // return newFriendCard;
  };

  render() {
    console.log("Rendering Friends.jsx");

    let friendShowButton;
    // debugger;
    if (this.state.friends.length === 0) {
      friendShowButton = (
        <Button
          className="col-1 mb-0 ml-0 mt-0 mr-3"
          id="getFriends"
          color="success"
          style={{ minWidth: "170px" }}
          onClick={() => console.log("Clicked Show Active Frends button")}
        >
          Show Active Friends
        </Button>
      );
    } else {
      friendShowButton = (
        <Button
          className="col-1 mb-0 ml-0 mt-0 mr-3"
          id="getFriends"
          color="success"
          style={{ minWidth: "170px" }}
          onClick={() => console.log("Clicked Show Active Frends button")}
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
                onClick={() => console.log("Clicked Add A Friend button")}
              >
                Add A Friend
              </Button>
              {friendShowButton}
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
                <div className="row displayFriendCards pl-3 pr-3 pb-3 pt-0" id="displayFriendCards"></div>
                <div className="friendCardTemplate d-none">
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
                        src="https://www.pngitem.com/pimgs/m/164-1648722_female-filled-icon-kostenloser-human-silhouette-head-and.png"
                        alt="Card cap"
                      />
                    </div>

                    <div className="card-body" style={{ textAlign: "center" }}>
                      <h5 className="card-title">Friend Name</h5>
                      <p className="card-text m-0">Headline here or other text. Maybe lots of other text.</p>
                    </div>
                    <div className="card-footer text-center">
                      <div>
                        <Button type="submit" className="btn btn-primary btn-sm editFriend">
                          Edit
                        </Button>
                        <Button type="submit" className="btn btn-danger btn-sm deleteFriend">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>{/* Add Friend modal goes here */}</div>
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
//             onChange={this.onLoginFormChange}
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
//             onChange={this.onLoginFormChange}
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
