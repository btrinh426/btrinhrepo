import React from "react";
import FriendsService from "../services/friendsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import FriendCard from "./FriendCards";
import { NavLink } from "react-router-dom";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Swal from "sweetalert2";

class FriendsDisplay extends React.Component {
  state = {
    searchQuery: "",
    friendCardsGroup: "",
    startPageIndex: 0,
    currentPage: 1,
    totalRecords: "",
    pageSize: 6,
    isSearch: false,
  };

  componentDidMount() {
    this.getAllFriends();
  }

  getAllFriends = () => {
    FriendsService.getAllFriends(this.state.startPageIndex, this.state.pageSize)
      .then(this.renderFriends)
      .catch(this.onGetAllFriendsFail);
  };

  renderFriends = (response) => {
    this.setState(() => {
      return {
        friendCardsGroup: response.data.item.pagedItems.map(this.mapFriends),
        totalRecords: response.data.item.totalCount,
        pageSize: response.data.item.pageSize,
        currentPage: response.data.item.pageIndex + 1,
      };
    });
  };

  onGetAllFriendsFail = (error) => {
    console.log(error.response);
  };

  mapFriends = (individualfriendObj) => {
    return (
      <div
        className="card m-3"
        style={{ width: "22rem" }}
        key={individualfriendObj.id}
      >
        <FriendCard
          friend={individualfriendObj}
          deleteInvFriend={this.deleteFriend}
        ></FriendCard>
      </div>
    );
  };

  deleteFriend = (friend) => {
    Swal.fire({
      icon: "warning",
      text: `Delete ${friend.title}?`,
      showConfirmationButton: true,
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((results) => {
      if (results.isConfirmed) {
        this.removeUserFromDataBase(friend);
      }
    });
  };

  removeUserFromDataBase(friend) {
    FriendsService.deleteUserById(friend.id)
      .then((response) => this.onDeleteSuccess(friend.id, response))
      .catch(this.onDeleteFail);
  }

  onDeleteSuccess = (friendId) => {
    this.removeDeletedFriendFromDom(friendId);
  };

  removeDeletedFriendFromDom = (friendId) => {
    console.log(friendId);
    let newState = { ...this.state };
    let indexOfDeleted = newState.friendCardsGroup.findIndex(
      (singleFriend) => parseInt(singleFriend.key) === friendId
    );

    if (indexOfDeleted >= 0) {
      newState.friendCardsGroup.splice(indexOfDeleted, 1);
    }

    this.setState(() => {
      newState.totalRecords = newState.totalRecords - 1;
      return newState;
    });
  };

  setSearchQuery = (e) => {
    let newVal = e.currentTarget.value;
    let newState = { ...this.state };
    this.setState(() => {
      newState.searchQuery = newVal;
      return newState;
    });
  };

  searchFriends = () => {
    if (this.state.searchQuery.length > 0) {
      this.setState(() => {
        return { isSearch: true };
      });
      FriendsService.searchFriendsByName(
        this.state.startPageIndex,
        this.state.pageSize,
        this.state.searchQuery
      )
        .then(this.renderFriends)
        .catch(this.searchError);
    } else {
      this.setState(() => {
        return { isSearch: false };
      });
      this.getAllFriends();
    }
  };

  searchError = (error) => {
    let searchErrorMessage = (
      <div className="row d-flex bg-light ml-auto mr-auto mt-4 mb-4">
        <p className="m-auto mt-4 mb-4 text-center">No results found</p>
      </div>
    );
    let newState = { ...this.state };
    this.setState(() => {
      newState.friendCardsGroup = searchErrorMessage;
      newState.totalRecords = 0;
      return newState;
    });
  };

  paginationOnChange = (page) => {
    let indexPage = page - 1;
    if (this.state.isSearch) {
      FriendsService.searchFriendsByName(
        indexPage,
        this.state.pageSize,
        this.state.searchQuery
      )
        .then(this.renderFriends)
        .catch(this.searchError);
    } else {
      FriendsService.getAllFriends(indexPage, this.state.pageSize).then(
        this.renderFriends
      );
    }
  };

  render() {
    return (
      <div className="row mt-3 ml-3">
        <div className="col-9 bg-white border pb-3">
          <div className="flex-row d-flex justify-content-end pt-3">
            <NavLink to="/main/friends/add" className="btn btn-primary">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Add Friend
            </NavLink>
          </div>
          <div className="flex-row d-flex justify-content-between pt-4 border-bottom">
            <h6 className="mb-3 mt-2 ml-3" id="friendCounter">
              {this.state.totalRecords} Friends Found
            </h6>

            <div
              className="input-group input-group-sm mb-3 mt-2"
              style={{ width: "250px" }}
            >
              <input
                type="text"
                className="form-control"
                value={this.state.searchQuery}
                onChange={this.setSearchQuery}
              />
              <div className="input-group-append" style={{ cursor: "pointer" }}>
                <span className="input-group-text" onClick={this.searchFriends}>
                  Search
                </span>
              </div>
            </div>
          </div>
          {/* Cards Section Start */}
          <div className="row d-flex bg-light mr-1 ml-1">
            {this.state.friendCardsGroup}
          </div>
          <div className="flex-row d-flex justify-content-center pt-4">
            {
              <Pagination
                onChange={this.paginationOnChange}
                current={this.state.currentPage}
                total={this.state.totalRecords}
                pageSize={this.state.pageSize}
              ></Pagination>
            }
          </div>
          {/* Cards Section End */}
        </div>
      </div>
    );
  }
}

export default FriendsDisplay;
