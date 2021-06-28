import React, { Component } from "react";
import {
  getFriends,
  deleteFriend,
  friendSearch,
} from "../services/friendsService";
import SingleFriend from "./SingleFriend";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { NavLink } from "react-router-dom";

// import debug from "sabio-debug";
// const _logger = debug.extend("Friends");

class Friends extends Component {
  state = {
    // friends: [],
    mappedFriends: [],
    //current: 2,
    pageIndex: 0,
    pageSize: 5,
    totalCount: 0,
    query: "",
  };
  //need page index page size in state
  //need total count in state
  componentDidMount() {
    this.onCallFriends();
  }

  onCallFriends = () => {
    getFriends(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    let friend = response.data.item.pagedItems;
    this.setState((prevState) => {
      return {
        ...prevState,
        friend,
        totalCount: response.data.item.totalCount,
        // pageSize: response.data.item.pageSize,
        // pageIndex: response.data.item.pageIndex,
        mappedFriends: friend.map(this.mapFriend),
      };
    });
    console.log(response.data.item);
  };

  onGetFriendsError = (response) => console.warn(response);

  onFriendDeleteClick = (friendId) => {
    // e.preventDefault();

    deleteFriend(friendId)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onDeleteFriendSuccess = (idDeleted) => {
    this.setState((prevState) => {
      const indexOfFriend = prevState.mappedFriends.findIndex(
        (friend) => friend.props.friend.id === idDeleted
      );

      const updatedFriends = [...prevState.mappedFriends];
      if (indexOfFriend >= 0) {
        updatedFriends.splice(indexOfFriend, 1);
      }
      return { mappedFriends: updatedFriends };
    });
    console.log(idDeleted);
  };

  onDeleteFriendError = (err) => console.error(err);

  onEdit = (oneFriend) => {
    //let friendToPass = {this.state.mappedFriends}
    // pass in the history.push as a object with a type: / payload:{friendToPass}
    this.props.history.push(`/friends/${oneFriend.id}/edit`, {
      type: "friend_Obj",
      payload: { oneFriend },
    });
    console.log(oneFriend);
  };

  handleClick = (e) => {
    e.preventDefault();
    friendSearch(this.state.query)
      .then(this.onFriendSearchSuccess)
      .catch(this.onFriendSearchError);
  };
  onChange = (page) => {
    this.setState(() => {
      return { pageIndex: page - 1 };
    }, this.onCallFriends);
    //set the state of pageIndex....return pageIndex = page -1..use callback fx
  };
  onFormField = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let query = { ...this.state.query };
      query[inputName] = newValue;
      console.log(query);
      return query;
    });
  };

  onFriendSearchSuccess = (response) => {
    let friendFiltered = response.data.item.pagedItems;
    console.log(response);
    this.setState((prevState) => {
      return {
        ...prevState,
        mappedFriends: friendFiltered.map(this.mapFriend),
      };
    });
  };
  onFriendSearchError = (response) => console.error(response);

  mapFriend = (friend) => {
    return (
      <SingleFriend
        key={friend.id}
        friend={friend}
        deleteOneFriend={this.onFriendDeleteClick}
        onEditFriend={this.onEdit}
      />
    );
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark friendNav">
          <div className="container-fluid" />
          <a className="navbar-brand friends" href=" ">
            Friends
          </a>
          <NavLink to="/addoredit">
            <button className="btn btn-outline-success addFriend" type="submit">
              +Friend
            </button>
          </NavLink>
          <form className="d-flex" />
          <input
            className="form-control me-2 friendSearch"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={this.state.query}
            name="query"
            onChange={this.onFormField}
          />
          <button
            className="btn btn-outline-success search"
            type="submit"
            onClick={this.handleClick}
          >
            Search
          </button>
        </nav>
        <div className="card w-20">{this.state.mappedFriends}</div>

        <Pagination
          pageSize={this.state.pageSize}
          total={this.state.totalCount}
          onChange={this.onChange}
          page={this.state.pageIndex}
        />
      </React.Fragment>
    );
  }
}

export default Friends;
