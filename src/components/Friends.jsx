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

import debug from "sabio-debug";
const _logger = debug.extend("Friends");

class Friends extends Component {
  state = {
    friends: [], // This array is the size of the user-selected page size, and contains the entire friend objects as received from the db
    friendsObjs: [], // This array contains the rendered versions of the friend objects
    isSearchResult: false, // This trackes whether the screen is in "search mode" - for pagination control of search results
    oldSearchString: "", // This allows the user to continue a previous search, or begin a new search
    newSearchString: "", // See above
    pagination: {
      currentPage: 1,
      totalFriends: 0,
      pageSize: 10,
    },
    showFriends: true, // This allows the user to hide the friends cards, or refresh the friends cards, or exit "search mode" and display all friend results
  };

  componentDidMount = () => {
    _logger("componentDidMount");
    if (this.props.history.location.state && this.props.history.location.state.pagination) {
      let pagination = { ...this.props.history.location.state.pagination };
      if (pagination.currentPage > pagination.totalFriends / pagination.pageSize) {
        pagination.currentPage = Math.ceil(pagination.totalFriends / pagination.pageSize); // This protects against deleting the last person on the last page
      }
      this.setState(
        () => {
          return { pagination };
        },
        () => {
          this.updateFriendsView();
        }
      );
    } else {
      this.getFriendDatabase(0, 100); // For the first call to the friend database try to get the first 100 friends
    }
  };

  clickAddFriendButton = (e) => {
    // This pushes the user to the FriendForm.
    // The current pagination settings are also pushed, so that they will be pushed back when the user is complete.
    e.preventDefault();
    this.props.history.push("/friends/new", { pagination: { ...this.state.pagination } });
  };

  clickShowHideFriends = (e) => {
    // This button's label changes depending on what mode the user is in "search mode" or "show all"
    // This button will either show/hide friends, refresh the friend cards or exit "search mode" depending on state
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
    // This function is called when the Friends component mounts, after a friend is successfully deleted,
    // and from within the "updateFriendsView" function after the user changes pagination.
    friendService
      .getFriends(Math.max(pageIndex, 0), pageSize)
      .then(this.onGetFriendDatabaseSuccess)
      .catch(this.onGetFriendDatabaseError);
  };

  onGetFriendDatabaseSuccess = (response) => {
    this.updateStateWithFriends(response);
  };

  updateStateWithFriends = (response) => {
    // If the friend database request is successful, update the friends objects in state, create the jsx friend card objects and save to state.
    let friends, friendsObjs;
    if (this.state.pagination.totalFriends === 0) {
      // If this is the first call to get friends (during componentDidMount), do not map all the friends: only the appropriate page size of friends
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
        // _logger("Finished setting friend array in state.");
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
    // This function takes a friend from the friend array and returns a formatted friend card react element for that friend to be used in the rendering of the page
    return (
      <div
        className={aFriend.statusId !== "Active" ? " cardparent notInDatabase" : "cardParent"} // This class just 'tags' the card for future use like changing card border color
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
    // This function is called when the user clicks on the "Edit" button on a friend card,
    // and pushes the user to the FriendForm in "edit" mode
    const targetURL = `../friends/${friendId}/edit`;
    let friendInfo = this.state.friends.find((friend) => friend.id === friendId);
    // Convert the skills from an array of objects into a string
    friendInfo.skills = friendInfo.skills
      ? friendInfo.skills
          .map((skill) => {
            return skill.name;
          })
          .join(", ")
      : "";
    this.props.history.push(targetURL, { friendInfo, pagination: { ...this.state.pagination } });
  };

  clickFriendCardDeleteButton = (friendId) => {
    // This function is called when the user clicks on the "Delete" button on a friend card
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
    // If the delete is successful, refresh the search results
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
    // This function will return the friend ID after a friend is deleted
    let url = response.config.url;
    if (url.indexOf("=") === -1) {
      url = url.split("/");
    } else {
      url = url.split("=");
    }
    return url[url.length - 1];
  };

  clickSearchFriendsButton = (e) => {
    // This function is called when the user clicks on the "search magnifying glass symbol"
    if (e) {
      e.preventDefault();
    }
    // Check to ensure the search field is not empty
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
    // If the friend search is successful, update state to enter "search mode"
    // Check to see if this search result is a result of changing the pagination
    // on a previous search result or a new search query.
    if (!this.state.isSearchResult || this.state.newSearchString !== this.state.oldSearchString) {
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
      // This was not the first time searching this string
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
    // This function is called when the user changes the page (with the pagination controls), and ties the pagination to state.
    // Then, it calls the "updateFriendsView" function, which uses the new pagination state.
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.pagination.currentPage = page;
      return newState;
    }, this.updateFriendsView);
  };

  onPageSizeChange = (e) => {
    // This function is called when the user changes the page size (next to the pagination controls).
    // This function updates the pagination pageSize in state, then calls the "updateFriendsView" function, which uses the new pagination state variables.
    const newPageSize = e.currentTarget.value;
    this.setState(() => {
      const newPagination = { ...this.state.pagination };
      newPagination.pageSize = parseInt(newPageSize);
      if (newPagination.currentPage > newPagination.totalFriends / newPagination.pageSize) {
        newPagination.currentPage = Math.ceil(newPagination.totalFriends / newPagination.pageSize); // This protects against deleting the last person on the last page
      }
      return { pagination: newPagination };
    }, this.updateFriendsView);
  };

  updateFriendsView = () => {
    // This function is called when the pagination page is changed, the page size is changed, or the user
    // clicks on the "Show Active Friends" button. It is also called when the user returns to the root /Friends page with pagination data.
    // If a search is in progress, this function will search the friends db with the current state pagination.
    // Otherwise, this function will get all friends with the appropriate pagination settings.
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
    // This function ties the search field to state
    const currentSearchString = e.currentTarget.value;
    this.setState(() => {
      return { newSearchString: currentSearchString };
    });
  };

  onSearchFieldKeyPress = (e) => {
    // This function is called when the user hits the "enter" key with the search field active,
    // and initiates a friend search. As of right now, the search is only conducted over the Friends table.
    // The search does not include Skills or Image url.
    if (e.keyCode === 13) {
      this.clickSearchFriendsButton();
    }
  };

  render() {
    _logger("render");
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
              {/* Check the Show Friends status in state to determine if friend cards are shown */}
              {this.state.showFriends || this.state.isSearchResult ? (
                <div className="col">
                  <div className="row mb-3">
                    <Pagination
                      total={this.state.pagination.totalFriends}
                      pageSize={this.state.pagination.pageSize}
                      current={this.state.pagination.currentPage}
                      onChange={this.changePage}
                    />
                    <div className="ml-2 my-auto" style={{ fontWeight: "500" }}>
                      {" "}
                      Friends per page:{" "}
                    </div>
                    <select
                      type="select"
                      className="my-select-box ml-2 mr-2 col"
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
