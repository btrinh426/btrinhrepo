import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Button, Input } from "reactstrap";
import Pagination from "rc-pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import * as friendService from "../services/friendService";
import FriendCard from "./FriendCard";

class Friends extends Component {
  state = {
    friends: [],
    friendsObjs: [],
    searchString: "",
    isSearchResult: false,
    pagination: {
      currentPage: 1,
      totalFriends: 0,
      pageSize: 5,
    },
  };

  componentDidMount = () => {
    console.log("Friends component mounted....getting friends database....");
    this.getFriendDatabase(0, 100); // For the first call to the friend database try to get the first 100 friends
  };

  // componentDidUpdate = () => {
  //   if (this.state.pagination.totalFriends === 0) {
  //     this.getFriendDatabase(0, 100);
  //   }
  // };

  clickAddFriendButton = (e) => {
    e.preventDefault();
    console.log("Click Add Friend button....");
    this.props.history.push("/friends/new");
  };

  clickShowHideFriends = (e) => {
    console.log("Clicked Show/Hide Friends button.");
    if (e.currentTarget.innerText.indexOf("Show") !== -1) {
      document.getElementById("mainTitle").innerText = "Friends";
      e.currentTarget.innerText = "Hide Active Friends";
      document.getElementById("searchFriendsInput").value = "";
      document.getElementById("displayFriendCards").classList.remove("d-none");
      this.props.history.push("/friends");
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.isSearchResult = false;
        newState.searchString = "";
        newState.pagination.currentPage = 1;
        return newState;
      }, this.updateFriendsView);
    } else {
      e.currentTarget.innerText = "Show Active Friends";
      document.getElementById("displayFriendCards").classList.add("d-none");
    }
  };

  getFriendDatabase = (pageIndex = 0, pageSize = this.state.pagination.pageSize) => {
    console.log("Running getFriendDatabase");
    friendService
      .getFriends(pageIndex, pageSize)
      .then(this.onGetFriendDatabaseSuccess)
      .catch(this.onGetFriendDatabaseError);
  };

  onGetFriendDatabaseSuccess = (response) => {
    console.log("Success getting friends from database.");
    this.updateStateWithFriends(response);
  };

  updateStateWithFriends = (response) => {
    let friends, friendsObjs;
    console.log("Pagination page size:", this.state.pagination.pageSize);
    if (this.state.pagination.totalFriends === 0) {
      // If this is the first call to get friends, do not map all the friends: only the appropriate page size of friends
      friends = [...response.data.item.pagedItems].splice(0, this.state.pagination.pageSize);
      friendsObjs = [...response.data.item.pagedItems]
        .splice(0, this.state.pagination.pageSize)
        .map(this.mapSingleFriend);
      console.log(friendsObjs);
      console.log(friends);
    } else {
      friendsObjs = response.data.item.pagedItems.map(this.mapSingleFriend);
      friends = response.data.item.pagedItems;
    }
    this.setState(
      (prevState) => {
        const newState = { ...prevState };
        newState.friends = friends;
        newState.friendsObjs = friendsObjs;
        newState.pagination.totalFriends = response.data.item.totalCount;
        return newState;
      },
      () => {
        console.log("Finished setting friend array in state.");
      }
    );
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
    console.log(`Edit friend, ID#: ${friendId}`);
    const targetURL = `../friends/${friendId}/edit`;
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
    toast.success("Friend deleted.");
    console.log(`Deleted friend, ID# ${friendId}`);
    this.getFriendDatabase(this.state.pagination.currentPage - 1, this.state.pagination.pageSize);
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
    if (e) {
      e.preventDefault();
    }
    const searchString = document.getElementById("searchFriendsInput").value;
    const notWhiteSpace = /\S\w*/;
    if (!searchString.match(notWhiteSpace)) {
      toast.error(`Invalid search string.`);
      return;
    }
    console.log(`Clicked Search Friends button: ${searchString}`);

    // const numsOnlyRegexp = /^[0-9]+$/;
    // if (searchString.match(numsOnlyRegexp)) {
    //   console.log("Numbers only -> search for friend by ID.");
    //   friendService
    //     .getFriendById(searchString)
    //     .then(this.onSearchFriendByIdSuccess)
    //     .catch(this.onSearchFriendByIdError);
    // } else {
    //   console.log("Not numbers only search -> search friend database....");
    //   friendService
    //     .searchFriends(searchString, 0, 50)
    //     .then(this.onSearchFriendsSuccess)
    //     .catch(this.onSearchFriendsError);
    // }
    friendService
      .searchFriends(searchString, 0, this.state.pagination.pageSize)
      .then(this.onSearchFriendsSuccess)
      .catch(this.onSearchFriendsError);
  };

  // onSearchFriendByIdSuccess = (response) => {
  //   let friend = response.data.item;
  //   console.log("Success getting friend from database.");
  //   console.log(`Friend ID: ${friend.id}`);
  //   console.log("Response data:");
  //   console.log(friend);
  //   const FriendDiv = () => (
  //     <div>
  //       <p>Friend(s) found:</p>
  //       <div>{friend.title}</div>
  //     </div>
  //   );
  //   toast.success(<FriendDiv />, { autoClose: 10000 });

  //   this.updateStateWithFriends(response);
  // };

  // onSearchFriendByIdError = (error) => {
  //   debugger;
  //   let errorText = error.response.data.errors[0];
  //   const searchId = this.searchTextFromAxiosResponse(error);
  //   console.error(`Error finding friend by ID: ${searchId}`);
  //   toast.error(`No friends found with ID: ${searchId}`);
  //   console.error(errorText);
  // };

  onSearchFriendsSuccess = (response) => {
    document.getElementById("mainTitle").innerText = "Search Results";
    if (!this.state.isSearchResult || this.state.searchString !== document.getElementById("searchFriendsInput").value) {
      // This was the first search result
      document.getElementById("getFriends").innerText = "Show Active Friends";
      document.getElementById("displayFriendCards").classList.remove("d-none");

      console.log("Success searching for friend.");
      console.log("Response data:");
      console.log(response.data.item.pagedItems);
      const totalCount = response.data.item.totalCount;
      const totalPages = response.data.item.totalPages;
      const friends = [...response.data.item.pagedItems];
      const friendsObjs = [...response.data.item.pagedItems]
        .splice(0, this.state.pagination.pageSize)
        .map(this.mapSingleFriend);
      const FriendDiv = () => (
        <React.Fragment>
          <div>
            <p>Found {totalCount} friends.</p>
          </div>
          <div>
            <p>Showing page 1 of {totalPages}.</p>
          </div>
        </React.Fragment>
      );
      toast.success(<FriendDiv />, { autoClose: 5000 });

      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.friends = friends;
        newState.friendsObjs = friendsObjs;
        newState.pagination.currentPage = 1;
        newState.pagination.totalFriends = totalCount;
        newState.searchString = document.getElementById("searchFriendsInput").value;
        newState.isSearchResult = true;
        return newState;
      });
    } else {
      const totalCount = response.data.item.totalCount;
      // const totalPages = response.data.item.totalPages;
      const pageIndex = response.data.item.pageIndex;
      const friends = [...response.data.item.pagedItems];
      const friendsObjs = [...response.data.item.pagedItems]
        .splice(0, this.state.pagination.pageSize)
        .map(this.mapSingleFriend);

      // const FriendDiv = () => (
      //   <div>
      //     <p>
      //       Showing page {pageIndex + 1} of {totalPages}.
      //     </p>
      //   </div>
      // );
      // toast.success(<FriendDiv />, { autoClose: 5000 });
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.friends = friends;
        newState.friendsObjs = friendsObjs;
        newState.pagination.currentPage = pageIndex + 1;
        newState.pagination.totalFriends = totalCount;
        return newState;
      });
    }

    document.getElementById("getFriends").innerText = "Show Active Friends";
  };

  onSearchFriendsError = (error) => {
    const errorText = error.response.data.errors[0];
    const searchString = this.searchTextFromAxiosResponse(error);
    console.error(`Error searching friends by string: ${searchString}`);
    toast.error(`No friends found with string: "${searchString}"`);
    console.error(errorText);
  };

  changePage = (page) => {
    this.setState((prevState) => {
      console.log("Change page to", page);
      const newState = { ...prevState };
      newState.pagination.currentPage = page;
      return newState;
    }, this.updateFriendsView);
  };

  updateFriendsView = () => {
    if (this.state.isSearchResult) {
      friendService
        .searchFriends(this.state.searchString, this.state.pagination.currentPage - 1, this.state.pagination.pageSize)
        .then(this.onSearchFriendsSuccess)
        .catch(this.onSearchFriendsError);
    } else {
      this.getFriendDatabase(this.state.pagination.currentPage - 1, this.state.pagination.pageSize);
    }
  };

  onSearchFieldKeyPress = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      // User hit Enter...start friend search
      this.clickSearchFriendsButton();
    }
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
          className="container row border border-secondary rounded mb-0 mr-3 ml-0 pl-3 pt-3 pr-3 pb-0 "
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
                    aria-label="Search"
                    style={{ minWidth: "150px", maxWidth: "200px" }}
                    onKeyDown={this.onSearchFieldKeyPress}
                  />
                  <Button
                    color="link mb-1 p-0"
                    id="searchFriendsButton"
                    type="submit"
                    onClick={this.clickSearchFriendsButton}
                  >
                    <span>
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="row" id="displayFriendCards">
              <div className="col">
                <div className="row mb-3">
                  <Pagination
                    total={this.state.pagination.totalFriends}
                    defaultPageSize={this.state.pagination.pageSize}
                    current={this.state.pagination.currentPage}
                    onChange={this.changePage}
                  />
                </div>
                <div className="row">
                  <div className="col nav-item pl-0 pr-3">
                    <div className="row displayFriendCards pl-3 pr-3 pb-0 pt-0">{this.state.friendsObjs}</div>
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

export default withRouter(Friends);
