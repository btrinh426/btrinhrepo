import React, { Component } from "react";
import { toast } from "react-toastify";
import "./App.css";

import * as friendService from "./friendService";

class Friends extends React.Component {
  state = {
    friends: [
      {
        title: "Gamst",
        // editMode: false,
        bio: "Hi",
        summary: "YouTuber",
        headline: "Hello",
        slug: "",
        statusId: 0,
        primaryImage: {
          imageUrl:
            "https://th.bing.com/th/id/OIP.nHc15cvbTxTfoXhjlnfcWwHaHa?w=173&h=180&c=7&o=5&dpr=1.38&pid=1.7",
        },
      },
      // {
      //   title: "C.K.",
      //   bio: "Bye",
      //   summary: "Streamer",
      //   headline: "Goodbye",
      //   slug: "",
      //   statusId: 1,
      //   primaryImage: {
      //     imageUrl:
      //       "https://th.bing.com/th/id/OIP.cMYk8k92ZkFEm83a5wtSIwHaHT?w=164&h=180&c=7&o=5&dpr=1.38&pid=1.7",
      //   },
      // },
      // {
      //   title: "Waku",
      //   bio: "Ay",
      //   summary: "Pro Gamer",
      //   headline: "Ayyyy",
      //   slug: "",
      //   statusId: 2,
      //   primaryImage: {
      //     imageUrl:
      //       "https://th.bing.com/th/id/OIP.xHcvXa6C0aVTcIp4AXUnpgHaHd?w=163&h=180&c=7&o=5&dpr=1.38&pid=1.7",
      //   },
      // },
    ],
  };

  friendIdData = this.props.match.params.friendId;

  componentDidMount() {
    friendService.onGet().then(this.onGetSuccess).catch(this.onGetError);
  }

  onGetSuccess = (response) => {
    console.log("friends obtained", response);

    this.setState((preState) => {
      return {
        // hardCodedFriends: preState.friends.map(this.mapFriend),
        // totalFriends: response.data.item.totalCount,
        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };

  onGetError = (err) => {
    console.error(err);
  };

  onEditClicked = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.dataset);
    let currentTarget = e.currentTarget;
    let id = currentTarget.dataset.friendId;

    this.props.history.push("/friends/" + id + "/edit");

    // this.setState({
    //   editMode: true;
    // })
  };

  // onDeleteClickFull = (friend) => {
  //   console.log("deleting", friend);
  // };

  onDeleteClicked = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let id = currentTarget.dataset.friendId;
    friendService
      .onDelete(id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteFail);
  };

  onDeleteSuccess = (response) => {
    console.log(response);
    // this.props.history.push("/friends");
    toast.success("Adios, friend");
  };

  onDeleteFail = (err) => {
    console.error(err);
    toast.error("Failed to delete friend");
  };

  mapFriend = (oneFriend) => {
    return (
      <div key={`Friends-${oneFriend.id}`} className="card col-md-3">
        <img
          className="card-img-top"
          src={oneFriend.primaryImage.imageUrl}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{oneFriend.title}</h5>
          <p className="card-text">{oneFriend.summary}</p>
          <button
            className="btn btn-primary link-button"
            onClick={this.onEditClicked}
            data-friend-id={oneFriend.id}
          >
            Edit
          </button>
          <button
            className="btn btn-primary link-button deleteBtn"
            onClick={this.onDeleteClicked}
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
          {/* <div>Total Friends: {this.state.totalFriends}</div> */}
          <div className="row">
            {/* {this.state.friends.map(this.mapFriend)} */}
            {/* {this.state.hardCodedFriends} */}

            {this.state.mappedFriends}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
