import React from "react";
import SingleFriend from "./SingleFriend";
import * as friendsService from "../services/friendsService";
import FriendForm from "./FriendForm";
import debug from "sabio-debug";
import PropTypes from "prop-types";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const _logger = debug.extend("Friends");

class Friends extends React.Component {
  state = {
    mappedFriends: [],
    searchInput: { query: " " },
  };

  onInputChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let searchData = { ...this.state.searchInput };
      searchData[inputName] = newValue;
      return { searchInput: searchData };
    });
  };

  //ajax for pagination
  componentDidMount() {
    _logger("componentDidMount");
    friendsService
      .showFriends()
      .then(this.onShowFriendsSuccess)
      .catch(this.onShowFriendsError);
  }

  //search
  onSearchClicked = (e) => {
    e.preventDefault();
    friendsService
      .searchFriend(this.state.searchInput.query)
      .then(this.onSearchFriendSuccess)
      .catch(this.onSearchFriendError);
  };
  onSearchFriendSuccess = (response) => {
    let result = JSON.stringify(response.data.item.pagedItems[0].id);

    this.setState((prevState) => {
      const existingPersonIndex = prevState.mappedFriends.findIndex((item) => {
        return item.key === result;
      });
      let updatedPeople = null;

      if (existingPersonIndex >= 0) {
        updatedPeople = [...prevState.mappedFriends];
        result = updatedPeople[existingPersonIndex];
      }

      return { mappedFriends: result };
    });
  };
  onSearchFriendError(err) {
    console.log(err);
  }
  //list SingleFriend(s)
  onShowFriendsSuccess = (response) => {
    let allFriends = response.items;
    console.log(allFriends);
    this.setState(() => {
      return { mappedFriends: allFriends.map(this.mapFriend) };
    });
  };
  onShowFriendsError(err) {
    console.log(err);
    toast["error"]("No Friends to show...");
  }
  onNewFriendClicked = (e) => {
    this.props.history.push("/friends/new");
  };

  //handlers from singlefriend
  onEditClicked = (friend) => {
    let friendId = friend.id;
    this.props.history.push(
      `/friends/${friendId}/edit`,
      friend,
      this.props.friendForm
    );
  };
  onDeleteClicked = (friend) => {
    let friendId = friend.id;
    friendsService
      .deleteFriend(friendId)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };
  onDeleteFriendSuccess = (id) => {
    toast["success"](`"Deleted Friend (id:${id})"`);
    this.setState((prevState) => {
      const indexOfPerson = prevState.mappedFriends.findIndex(
        (friend) => friend.key == id
      );
      const updatedPeople = [...prevState.mappedFriends];
      if (indexOfPerson >= 0) {
        updatedPeople.splice(indexOfPerson, 1);
      }
      return {
        mappedFriends: updatedPeople,
        friendForm: null,
      };
    });
  };
  onDeleteFriendError = (err) => {
    console.log(err);
  };

  //mapper w template
  mapFriend = (aFriend) => {
    return (
      <SingleFriend
        key={aFriend.id}
        {...this.props}
        friend={aFriend}
        onClick={this.onDeleteClicked}
        onEditClicked={this.onEditClicked}
      ></SingleFriend>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <input
            className="search form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            name="query"
            onChange={this.onInputChanged}
          />
          <button
            className="search btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={this.onSearchClicked}
          >
            Search
          </button>
          <div className="container">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onNewFriendClicked}
            >
              New Friend
            </button>
          </div>

          <div className="col-md-12 friend-list">
            {this.state.mappedFriends}
          </div>
        </div>
        <div className="container">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="..."
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/friends?pageIndex=0">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/friends?pageIndex=1">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/friends?pageIndex=2">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="...">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
