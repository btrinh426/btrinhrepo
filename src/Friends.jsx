import React, { Component } from "react";
import "./App.css";

import * as friendService from "./friendService";

class Friends extends React.Component {
  state = {
    friends: [
      {
        title: "Gamst",
        bio: "Hi",
        summary: "YouTuber",
        headline: "Hello",
        slug: "",
        statusId: 0,
        primaryImage:
          "https://th.bing.com/th/id/OIP.nHc15cvbTxTfoXhjlnfcWwHaHa?w=173&h=180&c=7&o=5&dpr=1.38&pid=1.7",
      },
      {
        title: "C.K.",
        bio: "Bye",
        summary: "Streamer",
        headline: "Goodbye",
        slug: "",
        statusId: 1,
        primaryImage:
          "https://th.bing.com/th/id/OIP.cMYk8k92ZkFEm83a5wtSIwHaHT?w=164&h=180&c=7&o=5&dpr=1.38&pid=1.7",
      },
      {
        title: "Waku",
        bio: "Ay",
        summary: "Pro Gamer",
        headline: "Ayyyy",
        slug: "",
        statusId: 2,
        primaryImage:
          "https://th.bing.com/th/id/OIP.xHcvXa6C0aVTcIp4AXUnpgHaHd?w=163&h=180&c=7&o=5&dpr=1.38&pid=1.7",
      },
    ],
  };

  componentDidMount() {
    friendService.onGet().then(this.onGetSuccess).catch(this.onGetError);

    this.setState((preState) => {
      return { mappedFriends: preState.friends.map(this.mapFriend) };
    });
  }

  onGetSuccess = (myFriends) => {
    console.log("friends obtained", myFriends);

    // this.setState((myFriends) => {
    //   return { mappedFriends: myFriends.map(this.mapFriend) };
    // });
  };

  onGetError = (err) => {
    console.error(err);
  };

  onEditClick = (e) => {
    console.log(e.currentTarget.dataset);
  };

  onDeleteClickFull = (friend) => {
    console.log("deleting", friend);
  };

  mapFriend = (oneFriend) => {
    return (
      <div key={`Friends-${oneFriend.statusId}`} className="card col-md-3">
        <img className="card-img-top" src={oneFriend.primaryImage} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{oneFriend.title}</h5>
          <p className="card-text">{oneFriend.summary}</p>
          <button
            className="btn btn-primary link-button"
            onClick={this.onEditClick}
            data-friend-id={oneFriend.id}
          >
            Edit
          </button>
          <button
            className="btn btn-primary link-button"
            onClick={this.onDeleteClickFull}
            data-friend-id={oneFriend.id}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  onAddClick = () => {
    this.props.history.push("/friends/new");
  };

  //   mapFriendSimple = (oneFriend) => {
  //     return <p key={`Friends-${oneFriend.statusId}`}>{oneFriend.title}</p>;
  //   };

  render() {
    return (
      <React.Fragment>
        <div>
          <button type="submit" className="addFriend" onClick={this.onAddClick}>
            Add Friend
          </button>
        </div>
        <div className="col-md-12 p-5">
          <h1>Friends</h1>

          <div className="row">
            {/* {this.state.friends.map(this.mapFriend)} */}
            {this.state.mappedFriends}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
