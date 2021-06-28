import React, { Component } from "react";
import { getFriends, deleteFriend } from "../services/friendsService";
import SingleFriend from "./SingleFriend";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import debug from "sabio-debug";
const _logger = debug.extend("Friends");

class Friends extends Component {
  state = {
    // friends: [],
    mappedFriends: [],
    current: 1,
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
    _logger(friend);
    // console.log(friend);
  };
  onGetFriendsError = (response) => console.warn(response);

  onFriendDeleteClick = (friendId) => {
    // e.preventDefault();
    _logger("working");
    deleteFriend(friendId)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onDeleteFriendSuccess = (idDeleted) => {
    this.setState((prevState) => {
      const indexOfFriend = prevState.mappedFriends.findIndex(
        (friend) => friend.props.friend.id === idDeleted
      );

      _logger("idDeleted");

      const updatedFriends = [...prevState.mappedFriends];
      if (indexOfFriend >= 0) {
        updatedFriends.splice(indexOfFriend, 1);
      }
      return { mappedFriends: updatedFriends };
    });
    // console.log(idDeleted);
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

  onChange = (page) => {
    console.log(page);
    this.setState({ current: page });
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
        <div className="card w-20">{this.state.mappedFriends}</div>

        <Pagination
          showLessItems
          defaultCurrent={1}
          total={50}
          showTitle={false}
          onChange={this.onChange}
          current={this.state.current}
        />
      </React.Fragment>
    );
  }
}

export default Friends;
