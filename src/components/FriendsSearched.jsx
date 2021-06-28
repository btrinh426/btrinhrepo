import React from "react";
import { render } from "react-dom";
import FriendsService from "../services/FriendsService";
import SingleFriend from "./SingleFriend";
const queryString = require("searchResult");
class FriendSearched extends React.Component {
  state = {
    friends: [],
  };

  componentDidMount() {
    console.log("componentDidMount");
    let friendName = queryString.parse(this.props.location.search).name;
    console.log(friendName);
    FriendsService.searchFriends(0, 3, friendName)
      .then(this.onSearchFriendsSuccess)
      .catch(this.onSearchFriendsError);
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  onSearchFriendsSuccess = (response) => {
    let friend = response.data.item.pagedItems;
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.friends = friend;

      return newState;
    });
  };

  onSearchFriendsError = (response) => {
    console.error(response);
  };

  onAFriendEditClicked = (friend) => {
    console.log("Edit clicked friend", friend.id);
    this.props.history.push(`/AddFriends/${friend.id}/edit/`, {
      type: "FriendData",
      payload: friend,
    });
  };

  onAFriendDeleteClicked = (friend) => {
    console.log(friend);
    FriendsService.deleteFriend(friend.id)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
    let newFriends = this.state.friends.filter((item) => {
      return item.id !== friend.id;
    });

    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.friends = newFriends;
      console.log(newState);
      return newState;
    });
  };

  //-----Single Friend-----
  mapFriend = (oneFriend) => {
    return (
      <SingleFriend
        key={`Friends-${oneFriend.id}`}
        friendData={oneFriend}
        onEditRequested={this.onAFriendEditClicked}
        onDeleteRequested={this.onAFriendDeleteClicked}
      ></SingleFriend>
    );
  };

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Friends</h1>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.onAddFriendClicked}
        >
          Add Friend
        </button>
      </div>
    );
  }
}
export default FriendSearched;
