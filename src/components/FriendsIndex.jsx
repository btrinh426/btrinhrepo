import React from "react";

import * as friendService from "../services/appService";
import Friend from "./Friend";
import { NavLink } from "react-router-dom";

class FriendsIndex extends React.Component {
  state = {
    friends: [""],
  };

  componentDidMount() {
    console.log("component did mount");
    this.getAllFriends();
  }

  getAllFriends = () => {
    friendService
      .getFriends()
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    console.log(response);
    this.setState((prevState) => {
      return {
        ...prevState,
        friends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };

  onGetFriendsError = (err) => {
    console.log(err);
  };

  mapFriend = (friend) => {
    return (
      <React.Fragment key={`Friend-${friend.id}`}>
        <Friend friend={friend} onClick={this.editFriendFull}></Friend>
      </React.Fragment>
    );
  };

  editFriendClick = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.dataset);
    console.log(e.currentTarget.dataset.friendId);
  };

  editFriendFull = (friend) => {
    console.log(friend);
  };

  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <div style={{ padding: 20 }}>
              <h1>Friends</h1>
            </div>
            <NavLink to="/friends">
              <button className="btn btn-primary">Go Back</button>
            </NavLink>
            <hr />
            <div className="row justify-content-center">
              {this.state.friends}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FriendsIndex;
