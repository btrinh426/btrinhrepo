import React, { Component } from "react";
import { toast } from "react-toastify";
import SingleFriend from "./SingleFriend";
import * as friendService from "./friendService";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class Friends extends React.Component {
  state = {
    current: 0,
    pageCount: "",
    totalFriends: "",
    searchTerm: "",
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
    ],
  };

  friendIdData = this.props.match.params.friendId;

  componentDidMount() {
    friendService.getFriend(0).then(this.onGetSuccess).catch(this.onGetError);
  }

  onGetSuccess = (response) => {
    console.log("friends obtained", response);

    this.setState((preState) => {
      return {
        // hardCodedFriends: preState.friends.map(this.mapFriend),
        totalFriends: response.data.item.totalPages,
        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };

  // onGetFriendsSuccess = (response) => {
  //   let newData = response.data.item.pagedItems;
  //   let totalData = response.data.item.totalPages;

  //   this.setState(() => {
  //     let newState = {};
  //     newState.friends = newData;
  //     newState.total = totalData;
  //     return { newState, totalData };
  //   });
  // };

  onGetError = (err) => {
    console.error(err);
  };

  onEditClicked = (friend) => {
    // e.preventDefault();
    // console.log(e.currentTarget.dataset);
    let id = friend.id;
    console.log(id);
    // let currentTarget = e.currentTarget;
    // let id = currentTarget.dataset.friendId;

    this.props.history.push("/friends/" + id + "/edit");

    // this.setState({
    //   editMode: true;
    // })
  };

  // onDeleteClickFull = (friend) => {
  //   console.log("deleting", friend);
  // };

  onDeleteClicked = (friend) => {
    // e.preventDefault();
    // let currentTarget = e.currentTarget;
    // let id = currentTarget.dataset.friendId;
    console.log(friend);
    let id = friend.id;
    friendService
      .deleteFriend(id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteFail);
  };

  onDeleteSuccess = (response) => {
    console.log(response);
    this.props.history.push("/friends");
    toast.success("Adios, friendo");
  };

  onDeleteFail = (err) => {
    console.error(err);
    toast.error("Failed to delete friend");
  };

  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`Friends-${oneFriend.id}`}>
        <SingleFriend
          friend={oneFriend}
          onEdit={this.onEditClicked}
          onDelete={this.onDeleteClicked}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  onAddClick = () => {
    this.props.history.push("/friends/new");
  };

  //   mapFriendSimple = (oneFriend) => {
  //     return <p key={`Friends-${oneFriend.statusId}`}>{oneFriend.title}</p>;
  //   };

  onChange = (page) => {
    this.setState((prevState) => {
      var pageIndex = prevState.current;
      console.log(pageIndex);
      pageIndex = page - 1;
      friendService
        .getFriend(pageIndex)
        .then(this.onGetSuccess)
        .catch(this.onGetError);
      return { current: page };
    });
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    // let inputName = currentTarget.name;
    console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState.searchTerm = newValue;

      return newState;
    });
  };

  onSearchClicked = (e) => {
    e.preventDefault();
    var searchFriend = this.state.searchTerm;
    if (searchFriend) {
      this.props.history.push("/friends/?s=" + searchFriend);
      friendService
        .searchForFriends(searchFriend)
        .then(this.onSearchSuccess)
        .catch(this.onSearchFail);
    } else {
      this.props.history.push("/friends");
      toast.error("Type a search term before hitting the button");
    }
  };

  onSearchSuccess = (response) => {
    console.log(response);
    toast.success("Search Successful!");
    this.setState(() => {
      return {
        totalFriends: response.data.item.totalPages,
        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };

  onSearchFail = (err) => {
    console.error(err);
    this.props.history.push("/friends");
    toast.error("No friends found");
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <button type="submit" className="addFriend" onClick={this.onAddClick}>
            Add Friend
          </button>
        </div>
        <form className="form-inline my-2 my-lg-0">
          {/* <span>Search For Friends</span> */}
          <input
            className="form-control mr-sm-2"
            name="q"
            type="text"
            placeholder="Search For Friends"
            aria-label="Search"
            onChange={this.onFormFieldChanged}
            value={this.state.searchTerm}
          />
          <button
            className="btn btn-outline-light my-2 my-sm-0 srchBtn"
            type="submit"
            onClick={this.onSearchClicked}
          >
            Search
          </button>
        </form>
        <div className="col-md-12 p-5">
          <h1>Friends</h1>
          <div className="row">{this.state.mappedFriends}</div>
          <div>
            <Pagination
              onChange={this.onChange}
              className="pagination"
              defaultPageSize={1}
              currentPage={1}
              current={this.state.current}
              total={this.state.totalFriends}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
