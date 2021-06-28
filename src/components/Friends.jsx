import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Button, Input } from "reactstrap";
import * as friendService from "../services/friendService";
import FriendCard from "./FriendCard";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

class Friends extends Component {
  state = {
    friends: [],
    friendsObjs: [],
  };

  componentDidMount = () => {
    console.log("Friends component mounted....getting friends database....");
    this.getFriendDatabase();
  };

  clickAddFriendButton = (e) => {
    e.preventDefault();
    console.log("Click Add Friend button....");
    this.props.history.push("/friends/new");
  };

  clickShowHideFriends = (e) => {
    console.log("Clicked Show/Hide Friends button.");
    if (e.currentTarget.innerText.indexOf("Show") !== -1) {
      e.currentTarget.innerText = "Hide Active Friends";
      document.getElementById("displayFriendCards").classList.remove("d-none");
      this.props.history.push("../friends");
    } else {
      e.currentTarget.innerText = "Show Active Friends";
      document.getElementById("displayFriendCards").classList.add("d-none");
    }
  };

  getFriendDatabase = () => {
    console.log("Running getFriendDatabase");
    friendService.getFriends(0, 50).then(this.onGetFriendDatabaseSuccess).catch(this.onGetFriendDatabaseError);
  };

  onGetFriendDatabaseSuccess = (response) => {
    console.log("Success getting friends from database.");
    let friends = response.data.item.pagedItems.map(this.mapSingleFriend);
    this.setState(() => {
      return {
        friends: response.data.item.pagedItems,
        friendObjs: friends,
      };
    }, console.log("Set state with friend array."));
  };

  onGetFriendDatabaseError = (error) => {
    debugger;
    let errorText = error.response.data.errors.join("\n");
    console.error("Error getting friends from database:");
    console.error(errorText);
  };

  mapSingleFriend = (aFriend) => {
    // This function takes a friend from the friend array and returns a formatted react element for that friend to be used in the rendering of the page
    // console.log(`Map friend:  ${friend.headline}`);
    // debugger;
    return (
      <div
        className={aFriend.statusId !== "Active" ? " cardparent notInDatabase" : "cardParent"}
        key={aFriend.id.toString()}
        id={aFriend.id}
      >
        <FriendCard
          friend={aFriend}
          clickEdit={this.clickFriendCardEditButton}
          clickDelete={this.clickFriendCardDeleteButton}
        />
      </div>
    );
  };

  clickFriendCardEditButton = (friendId) => {
    console.log("Click Add Friend button....");
    // const targetParent = e.currentTarget.closest(".cardParent");
    // const friendId = targetParent.getAttribute("id");
    console.log(`Edit friend, ID#: ${friendId}`);

    const targetURL = `../friends/${friendId}/edit`;

    // const friendArray = [...this.state.friends];
    let friendInfo = this.state.friends.find((friend) => friend.id === friendId);
    this.props.history.push(targetURL, { friendInfo });
    document.getElementById("getFriends").innerText = "Show Active Friends";
  };

  clickFriendCardDeleteButton = (friendId) => {
    Swal.fire({
      title: "Are you sure you want to delete your friend?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Delete selected....");
        friendService.deleteFriend(friendId).then(this.onDeleteFriendSuccess).catch(this.onDeleteFriendError);
      }
    });
  };

  onDeleteFriendSuccess = (response) => {
    const friendId = this.searchTextFromAxiosResponse(response);

    // Remove friend from state

    // this.setState((prevState) => {
    //   const newState = { ...prevState };
    //   const friendLoc = newState.friends.findIndex((friend) => friend.id === friendId);
    //   newState.friends.splice(friendLoc, 1);
    //   return newState;
    // });
    // const targetFriendCard = document.querySelector("div[id=" + CSS.escape(friendId) + "]");
    // targetFriendCard.remove();
    toast.success("Friend deleted.");
    console.log(`Deleted friend, ID# ${friendId}`);
    document.getElementById(friendId).remove();
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

  clickSearchFriendsButton = (e) => {
    e.preventDefault();
    const searchString = document.getElementById("searchFriendsInput").value;
    console.log(`Clicked Search Friends button: ${searchString}`);

    const numsOnlyRegexp = /^[0-9]+$/;

    // searchDatabase = [];
    if (searchString.match(numsOnlyRegexp)) {
      console.log("Numbers only -> search for friend by ID.");
      friendService
        .getFriendById(searchString)
        .then(this.onSearchFriendByIdSuccess)
        .catch(this.onSearchFriendByIdError);
    } else {
      console.log("Not numbers only search -> search friend database....");
      friendService
        .searchFriends(searchString, 0, 50)
        .then(this.onSearchFriendsSuccess)
        .catch(this.onSearchFriendsError);
    }
  };

  onSearchFriendByIdSuccess = (response) => {
    let friend = response.data.item;
    console.log("Success getting friend from database.");
    console.log(`Friend ID: ${friend.id}`);
    console.log("Response data:");
    console.log(friend);
    const FriendDiv = () => (
      <div>
        <p>Friend(s) found:</p>
        <div>{friend.title}</div>
      </div>
    );
    toast.success(<FriendDiv />, { autoClose: 10000 });

    // searchDatabase.push(friend);
    // console.log(searchDatabase);
    // displaySearchFriends(searchDatabase);
  };

  onSearchFriendByIdError = (error) => {
    debugger;
    let errorText = error.response.data.errors[0];
    const searchId = this.searchTextFromAxiosResponse(error);
    console.error(`Error finding friend by ID: ${searchId}`);
    toast.error(`No friends found with ID: ${searchId}`);
    console.error(errorText);
  };

  onSearchFriendsSuccess = (response) => {
    console.log("Success searching for friend.");
    console.log("Response data:");
    console.log(response.data.item.pagedItems);
    let foundFriends = response.data.item.pagedItems;
    // let foundFriendText = foundFriends[0].summary;
    // for (let i = 1; i < foundFriends.length; i++) {
    //   foundFriendText = foundFriendText + `\n` + foundFriends[i].summary;
    // }
    const FriendDiv = () => (
      <div>
        <p>Friend(s) found:</p>
        {foundFriends.map((friend) => {
          return <div key={friend.id}>{friend.title}</div>;
        })}
      </div>
    );
    toast.success(<FriendDiv />, { autoClose: 10000 });
    // searchDatabase = response.data.item.pagedItems;
    // displaySearchFriends(searchDatabase);
  };

  onSearchFriendsError = (error) => {
    debugger;
    const errorText = error.response.data.errors[0];
    const searchString = this.searchTextFromAxiosResponse(error);
    console.error(`Error searching friends by string: ${searchString}`);
    toast.error(`No friends found with string: "${searchString}"`);
    console.error(errorText);
    // searchDatabase = [];
  };

  render() {
    console.log("Rendering Friends.jsx");

    // Format friend button:
    let friendShowHideButton;
    if (this.state.friends.length === 0) {
      friendShowHideButton = (
        <Button
          className="col-1 mb-1 ml-0 mt-0 mr-3"
          id="getFriends"
          color="success"
          style={{ minWidth: "170px", height: "fit-content" }}
          onClick={this.clickShowHideFriends}
        >
          Show Active Friends
        </Button>
      );
    } else {
      friendShowHideButton = (
        <Button
          className="col-1 mb-1 ml-0 mt-0 mr-3"
          id="getFriends"
          color="success"
          style={{ minWidth: "170px", height: "fit-content" }}
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
                className="col-1 btn mb-1 ml-0 mt-0 mr-3"
                id="addFriendButton"
                color="primary"
                style={{ minWidth: "200px", height: "fit-content" }}
                onClick={this.clickAddFriendButton}
              >
                Add A Friend
              </Button>
              {friendShowHideButton}
              <div className="col">
                <div className="row">
                  <Input
                    className="form-control mr-2 mb-1"
                    id="searchFriendsInput"
                    type="search"
                    placeholder=""
                    aria-label="Search"
                    style={{ minWidth: "150px", maxWidth: "200px" }}
                  />
                  <Button
                    color="secondary mb-1"
                    id="searchFriendsButton"
                    type="submit"
                    onClick={this.clickSearchFriendsButton}
                  >
                    Search Friends
                  </Button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col nav-item pl-0 pr-3" style={{ marginBottom: "1rem" }}>
                <div className="row displayFriendCards pl-3 pr-3 pb-3 pt-0" id="displayFriendCards">
                  {this.state.friendObjs}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Friends);
