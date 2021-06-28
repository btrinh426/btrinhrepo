import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
    isSearchResult: false,
    oldSearchString: "",
    newSearchString: "",
    pagination: {
      currentPage: 1,
      totalFriends: 0,
      pageSize: 5,
    },
    showFriends: true,
  };

  componentDidMount = () => {
    this.getFriendDatabase(0, 100); // For the first call to the friend database try to get the first 100 friends
  };

  // componentDidUpdate = () => {
  //   if (this.state.pagination.totalFriends === 0) {
  //     this.getFriendDatabase(0, 100);
  //   }
  // };

  clickAddFriendButton = (e) => {
    e.preventDefault();
    this.props.history.push("/friends/new");
  };

  clickShowHideFriends = (e) => {
    this.setState(
      () => {
        const newState = { showFriends: !this.state.showFriends };
        if (!this.state.showFriends) {
          newState.isSearchResult = false;
          newState.newSearchString = "";
          newState.oldSearchString = "";
        }
        return newState;
      },
      () => {
        if (this.state.showFriends) {
          this.updateFriendsView();
        }
      }
    );
  };

  getFriendDatabase = (pageIndex = 0, pageSize = this.state.pagination.pageSize) => {
    friendService
      .getFriends(Math.max(pageIndex, 0), pageSize)
      .then(this.onGetFriendDatabaseSuccess)
      .catch(this.onGetFriendDatabaseError);
  };

  onGetFriendDatabaseSuccess = (response) => {
    this.updateStateWithFriends(response);
  };

  updateStateWithFriends = (response) => {
    let friends, friendsObjs;
    // console.log("Pagination page size:", this.state.pagination.pageSize);
    if (this.state.pagination.totalFriends === 0) {
      // If this is the first call to get friends, do not map all the friends: only the appropriate page size of friends
      friends = [...response.data.item.pagedItems].splice(0, this.state.pagination.pageSize);
      friendsObjs = [...response.data.item.pagedItems]
        .splice(0, this.state.pagination.pageSize)
        .map(this.mapSingleFriend);
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
        newState.pagination.currentPage = response.data.item.pageIndex + 1; //The index received is 0-based, the paginator starts at 1
        return newState;
      },
      () => {
        // console.log("Finished setting friend array in state.");
      }
    );
  };

  onGetFriendDatabaseError = (error) => {
    let errorText = error.response.data.errors.join("\n");
    console.error("Error getting friends from database:");
    console.error(errorText);
    debugger;
  };

  mapSingleFriend = (aFriend) => {
    // This function takes a friend from the friend array and returns a formatted react element for that friend to be used in the rendering of the page
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
    // console.log(`Edit friend, ID#: ${friendId}`);
    const targetURL = `../friends/${friendId}/edit`;
    let friendInfo = this.state.friends.find((friend) => friend.id === friendId);
    this.props.history.push(targetURL, { friendInfo });
  };

  clickFriendCardDeleteButton = (friendId) => {
    Swal.fire({
      title: "Are you sure you want to delete your friend?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        friendService.deleteFriend(friendId).then(this.onDeleteFriendSuccess).catch(this.onDeleteFriendError);
      }
    });
  };

  onDeleteFriendSuccess = (response) => {
    const friendId = this.searchTextFromAxiosResponse(response);
    toast.success(`Friend ID# ${friendId} deleted.`);
    // This logic will ensure that if the friend was the last card on that page, the previous page will be called
    if (this.state.friends.length > 1) {
      this.getFriendDatabase(this.state.pagination.currentPage - 1, this.state.pagination.pageSize);
    } else {
      this.getFriendDatabase(Math.max(0, this.state.pagination.currentPage - 2), this.state.pagination.pageSize);
    }
  };

  onDeleteFriendError = (error) => {
    toast.error("An error occured while deleting friend. Check database to ensure friend deleted.");
    console.error(error);
    debugger;
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
    const notWhiteSpace = /\S\w*/;
    if (!this.state.newSearchString.match(notWhiteSpace)) {
      toast.error(`Invalid search string.`);
      return;
    }

    friendService
      .searchFriends(this.state.newSearchString, 0, this.state.pagination.pageSize)
      .then(this.onSearchFriendsSuccess)
      .catch(this.onSearchFriendsError);
  };

  onSearchFriendsSuccess = (response) => {
    if (!this.state.isSearchResult || this.state.newSearchString !== this.state.oldSearchString) {
      console.log(`New search for:  ${this.state.newSearchString}`);
      // This was the first time searching this string
      this.setState(() => {
        return {
          oldSearchString: this.state.newSearchString,
        };
      });

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
        newState.isSearchResult = true;
        newState.showFriends = false;
        return newState;
      });
    } else {
      console.log(`Search continuation for:  ${this.state.oldSearchString}`);
      const totalCount = response.data.item.totalCount;
      const pageIndex = response.data.item.pageIndex;
      const friends = [...response.data.item.pagedItems];
      const friendsObjs = [...response.data.item.pagedItems]
        .splice(0, this.state.pagination.pageSize)
        .map(this.mapSingleFriend);
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.friends = friends;
        newState.friendsObjs = friendsObjs;
        newState.pagination.currentPage = pageIndex + 1;
        newState.pagination.totalFriends = totalCount;
        return newState;
      });
    }
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
      const newState = { ...prevState };
      newState.pagination.currentPage = page;
      return newState;
    }, this.updateFriendsView);
  };

  updateFriendsView = () => {
    if (this.state.isSearchResult) {
      friendService
        .searchFriends(
          this.state.newSearchString,
          this.state.pagination.currentPage - 1,
          this.state.pagination.pageSize
        )
        .then(this.onSearchFriendsSuccess)
        .catch(this.onSearchFriendsError);
    } else {
      this.getFriendDatabase(this.state.pagination.currentPage - 1, this.state.pagination.pageSize);
    }
  };

  onSearchFieldChange = (e) => {
    const currentSearchString = e.currentTarget.value;
    this.setState(() => {
      return { newSearchString: currentSearchString };
    });
  };

  onSearchFieldKeyPress = (e) => {
    // console.log(e.keyCode);
    if (e.keyCode === 13) {
      // User hit Enter...start friend search
      this.clickSearchFriendsButton();
    }
  };

  onPageSizeChange = (e) => {
    const newPageSize = e.currentTarget.value;
    this.setState(() => {
      const newPagination = { ...this.state.pagination };
      newPagination.pageSize = parseInt(newPageSize);
      return { pagination: newPagination };
    }, this.getFriendDatabase);
  };

  render() {
    return (
      <div className="col pl-3 mr-3">
        <div className="row m-0 pl-0 pt-2 pb-2 pr-2">
          <h3 className="col pl-0" id="mainTitle">
            {this.state.isSearchResult ? "Friends: Search Results" : "Friends"}
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
              <Button
                className="col-1 mb-1 ml-0 mt-0 mr-3"
                id="getFriends"
                color="success"
                style={{ minWidth: "170px", height: "fit-content" }}
                onClick={this.clickShowHideFriends}
              >
                {/* Show the pagination and frind cards if "state.showFriends" is true, OR if "state.isSearchResult" is true  */}
                {this.state.showFriends ? "Hide Active Friends" : "Show Active Friends"}
              </Button>
              <div className="col">
                <div className="row">
                  <Input
                    className="form-control mr-2 mb-1"
                    id="searchFriendsInput"
                    style={{ minWidth: "150px", maxWidth: "200px" }}
                    name="newSearchString"
                    value={this.state.newSearchString}
                    onChange={this.onSearchFieldChange}
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
              {this.state.showFriends || this.state.isSearchResult ? (
                <div className="col">
                  <div className="row mb-3">
                    <Pagination
                      total={this.state.pagination.totalFriends}
                      pageSize={this.state.pagination.pageSize}
                      current={this.state.pagination.currentPage}
                      onChange={this.changePage}
                    />
                    <div className="ml-2" style={{ fontWeight: "500" }}>
                      {" "}
                      Friends per page:{" "}
                    </div>
                    <select
                      type="select"
                      className="my-select-box ml-2 mr-2 mb-1 col"
                      style={{ maxWidth: "60px" }}
                      name="friendsPerPage"
                      value={this.state.pagination.pageSize}
                      onChange={this.onPageSizeChange}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                  <div className="row">
                    <div className="col nav-item pl-0 pr-3">
                      <div className="row pl-3 pr-3 pb-0 pt-0">{this.state.friendsObjs}</div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Friends);
