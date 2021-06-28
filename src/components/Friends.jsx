import React from "react";
import {
  getFriends,
  searchFriends,
  deleteFriend,
  getFriendsPaginate,
} from "../services/friendsService";
import { NavLink } from "react-router-dom";
import Pagination from "rc-pagination";
import SingleFriend from "./SingleFriend";
import debug from "sabio-debug";
import { toast } from "react-toastify";
import "rc-pagination/assets/index.css";
const _logger = debug.extend("App");

class Friends extends React.Component {
  state = {
    mappedFriends: [],
    pageIndex: "",
    pageSize: "",
    totalCount: "",
    totalPages: "",
    searchTerm: "",
    current: 1,
  };

  componentDidMount() {
    getFriends().then(this.onGetFriendsSuccess).catch(this.onGetFriendsError);
  }
  onGetFriendsSuccess = (response) => {
    _logger("Get friends Success: ", response.data.item.pagedItems);
    let friends = response.data.item.pagedItems;
    this.setState((preState) => {
      return {
        mappedFriends: friends.map(this.mapFriend),
        pageIndex: response.data.item.pageIndex,
        pageSize: response.data.item.pageSize,
        totalCount: response.data.item.totalCount,
        totalPages: response.data.item.totalPages,
      };
    });
  };
  onGetFriendsError = (response) => {
    _logger("Get friends Error: ", response);
  };

  mapFriend = (friend) => {
    return (
      <SingleFriend
        key={friend.id}
        friend={friend}
        deleteClick={this.deleteClick}
        editClick={this.editClick}
      ></SingleFriend>
    );
  };

  editClick = (frnd) => {
    _logger("edit button clicked: ", frnd);
    this.props.history.push("/friends/" + frnd.id, {
      type: "FRIEND_TO_UPDATE",
      payload: frnd,
    });
  };

  deleteClick = (frnd) => {
    _logger("id to delete: ", frnd.id);
    deleteFriend(frnd.id)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };
  onDeleteFriendSuccess = (deletedId) => {
    _logger("Deleted: ", deletedId);

    this.setState((prevState) => {
      const indexOfFriend = prevState.mappedFriends.findIndex(
        (aFriend) => aFriend.props.friend.id === deletedId
      );
      _logger("indexOfFriend", indexOfFriend);

      const updatedFriends = [...prevState.mappedFriends];

      if (indexOfFriend >= 0) {
        updatedFriends.splice(indexOfFriend, 1);
      }
      return { mappedFriends: updatedFriends };
    }, this.stateChanged);
  };
  onDeleteFriendError = (response) => _logger("Delete Error: ", response);

  onSearchFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    _logger("search field change, current is", this.state.current);

    this.setState(
      () => {
        let newSearchTerm = { ...this.state.searchTerm };
        newSearchTerm[inputName] = newValue;
        _logger("newSearchTerm: ", newSearchTerm);

        return newSearchTerm;
      },
      () =>
        searchFriends(this.state.searchTerm) // what to do with searchTerm : "" ? errors 404
          .then(this.onGetFriendsSuccess)
          .catch(this.onSearchFriendsError)
    );
  };

  searchFriendsErrorCheck = (searchThis) => {
    if (searchThis === "") {
      getFriends().then(this.onGetFriendsSuccess).catch(this.onGetFriendsError);
    } else {
      searchFriends(searchThis)
        .then(this.onGetFriendsSuccess)
        .catch(this.onGetFriendsError);
    }
  };

  onSearchFriendsError = (response) => {
    _logger("searchError: ", response);
    toast["info"]("searchThis api resulted in error", "Search Error");
    if (this.state.searchTerm === "") {
      getFriends().then(this.onGetFriendsSuccess).catch(this.onGetFriendsError);
    }
  };

  componentDidUpdate() {
    console.log("component did update:");
  }

  onChange = (page, size) => {
    console.log(`Page: ${page} Size: ${size}`);
    this.setState(
      (preState) => {
        let newState = { ...preState, current: page };
        return newState;
      },
      () =>
        getFriendsPaginate(page - 1, size)
          .then(this.onGetFriendsSuccess)
          .catch(this.onGetFriendsError)
    );
  };

  render() {
    _logger("component rendered.");

    return (
      <div className="col-md-12 p-5">
        <h1>Friends</h1>
        <div className="row">
          <NavLink to="/friends/createfriend">
            <button type="button" className="btn btn-primary mr-1">
              Add Friend
            </button>
          </NavLink>
          <div className="row">
            <div className="col-lg-12">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search for..."
                  id="searchTerm"
                  name="searchTerm"
                  onChange={this.onSearchFieldChange}
                  value={this.state.searchTerm}
                />
              </div>
            </div>
          </div>
          <Pagination
            onChange={this.onChange}
            current={this.state.current} //pageIndex? or current? ->pageIndex makes button highlight
            total={this.state.totalCount}
          />
        </div>
        <hr />
        <div className="row">{this.state.mappedFriends}</div>
      </div>
    );
  }
}

export default Friends;
