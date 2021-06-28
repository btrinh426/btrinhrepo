import React from "react";
import * as friendService from "./friendService";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import SingleFriend from "./SingleFriend";
import * as FriendService from "./friendService";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    friendService
      .getFriends()
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    let friends = response.data.item.pagedItems;
    console.log(friends);

    this.setState((prevState) => {
      return { mappedFriends: friends.map(this.mapFriend) };
    });
  };

  onGetFriendsError = () => {
    console.log("could not retrieve friends");
  };

  onFriendClicked = (e) => {
    let id = e.currentTarget.dataset.friendId;
    console.log(id);
  };

  onFriendClickedFull = (friend) => {
    console.log(friend.id);
    friendService.currentFriendWithId(friend.id);
    // this.props.history.push("/EditContact");
  };

  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`Friend-${oneFriend.summary}`}>
        <SingleFriend
          friend={oneFriend}
          onClick={this.onFriendClickedFull}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  // <NavLink to="/CreateContact">Edit</NavLink>
  // mapFriend = (oneFriend) => {
  //   return <p key={`Friend-${oneFriend.summary}`}>{oneFriend.title}</p>;
  // };

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Friends List</h1>
        <hr />
        <div className="row">
          {/* {this.state.friendData.map(this.mapFriend)} */}
          {this.state.mappedFriends}
        </div>
      </div>
    );
  }
}

export default Friends;
