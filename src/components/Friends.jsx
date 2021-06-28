import React from "react";
import SingleFriend from "./SingleFriend";
//import Update from "./Update";
import * as friendsService from "../services/friendsService";
import showFriends from "../services/listService";
import FriendForm from "./FriendForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Friends extends React.Component {
  state = {
    mappedFriends: [],
  };

  //ajax for pagination
  componentDidMount() {
    showFriends()
      .then(this.onShowFriendsSuccess)
      .catch(this.onShowFriendsError);
  }
  onShowFriendsSuccess = (response) => {
    let allFriends = response.data.item.pagedItems;
    this.setState(() => {
      return { mappedFriends: allFriends.map(this.mapFriend) };
    });
  };
  onShowFriendsError(err) {
    console.log(err);
    toast["error"]("No Friends to show...");
  }

  //edit + handlers
  onNewFriendClicked = (e) => {
    this.props.history.push("/friends/new");
  };

  onEditClicked = (friend) => {
    let friendId = friend.id;
    this.props.history.push(
      `/friends/${friendId}/edit`,
      friend,
      this.props.friendForm
    );
  };

  onSaveClicked = (e) => {
    e.preventDefault();
    console.log(e);
    //let friendId = friend.id
  };
  onBuildFriendSuccess = (response) => {
    console.log(response);
    this.props.history.push("/friends");
  };
  onBuildFriendError = (err) => {
    console.log(err);
  };
  onUpdateFriendSuccess = (response) => {
    console.log(response);
  };
  onUpdateFriendError = (err) => {
    console.log(err);
  };

  //delete + handlers
  onDeleteClicked = (friend) => {
    let friendId = friend.id;
    console.log(friend, "delete clicked....");

    friendsService
      .deleteFriend(friendId)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onDeleteFriendSuccess = (id) => {
    console.log(id);
    this.setState((prevState) => {
      const indexOfPerson = prevState.mappedFriends.findIndex(
        (friend) => friend.key == id
      );

      const updatedPeople = [...prevState.mappedFriends];

      if (indexOfPerson >= 0) {
        //do not slice or otherwise mutate the objects in array
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
        onSaveClicked={this.onSaveClicked}
      ></SingleFriend>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onNewFriendClicked}
          >
            New Friend
          </button>
          <div className="col-md-12 friend-list">
            {this.state.mappedFriends}
          </div>
        </div>
        <div className="container">
          <div className="col-md-12 friend-list"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
