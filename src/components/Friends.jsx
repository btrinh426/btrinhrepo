import React, { Component } from "react";
import { getFriends, deleteFriend } from "../services/appService";
import SingleFriend from "./SingleFriend";

class Friends extends Component {
  state = {
    friends: [],
    mappedFriends: [],
  };

  componentDidMount() {
    getFriends().then(this.onGetFriendsSuccess).catch(this.onGetFriendsError);
  }

  onGetFriendsSuccess = (response) => {
    let friend = response.data.item.pagedItems;
    this.setState((prevState) => {
      return {
        ...prevState,
        friend,
        mappedFriends: friend.map(this.mapFriend),
      };
    });

    console.log(friend);
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
        (friend) => friend.id === idDeleted
      );
      console.log(indexOfFriend);
      const updatedFriends = [...prevState.mappedFriends];
      if (indexOfFriend === 0) {
        updatedFriends.splice(indexOfFriend, 1);
      }
      return { mappedFriends: updatedFriends };
    });
    console.log(idDeleted);
  };

  onDeleteFriendError = (err) => console.error(err);

  onEdit = (id) => {
    this.props.history.push(`/friends/${id}/edit`);
  };

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
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"/>
            <div className="container-flu   id"/>
                <a className="navbar-brand" href=" ">Friends</a>
                <a href="addEditFriend.html" id="addFriend" className="btn btn-outline-success" type="submit">+Friend</a>
                <form className="d-flex"/>
                    <input className="form-control me-2" type="search" placeholder="Search friends" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button> */}

        <div className="card w-20">{this.state.mappedFriends}</div>
      </React.Fragment>
    );
  }
}

export default Friends;
