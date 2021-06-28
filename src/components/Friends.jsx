import React, { Component } from "react";
import { getFriends, deleteFriends } from "../services/friendsService";
import FriendCard from "./FriendCard";

class Friends extends Component {
  state = {
    //friends: [],
    mappedFriends: [],
  };
  componentDidMount() {
    getFriends().then(this.onGetFriendsSuccess).catch(this.onGetFriendsError);
  }
  onGetFriendsSuccess = (response) => {
    let friends = response.data.item.pagedItems;
    this.setState((prevState) => {
      return {
        ...prevState,
        friends,
        mappedFriends: friends.map(this.generateFriendCard),
      };
    });
    console.log(friends);
  };
  onGetFriendsError = () => {
    console.warn();
  };
  onDeleteFriendsClick = (friendId) => {
    console.log("onDeleteFriendsClick");
    deleteFriends(friendId)
      .then(this.onDeleteFriendsSuccess)
      .catch(this.onDeleteFriendsError);
  };
  onDeleteFriendsSuccess = (idDeleted) => {
    console.log("onDeleteFriendsSuccess");
    getFriends().then(this.onGetFriendsSuccess).catch(this.onGetFriendsError);
    // this.setState((prevState) => {
    //   const indexOfFriends = prevState.mappedFriends.findIndex(
    //     (friends) => friends.props.friendsId === idDeleted
    //   );
    //   console.log(idDeleted);

    //   const updatedFriends = [prevState.mappedFriends];
    //   if (indexOfFriends >= 0) {
    //     updatedFriends.splice(indexOfFriends, 1);
    //   }
    //   return {
    //     mappedFriends: updatedFriends,
    //     formData: null,
    //   };
    // });
  };
  onDeleteFriendsError = (err) => console.log(err);

  onEdit = (oneFriend) => {
    this.props.history.push(`/friends/${oneFriend.id}/edit`, {
      type: "friend_Obj",
      payload: { oneFriend },
    });
  };
  //console.log(oneFriend);

  generateFriendCard = (oneFriend) => {
    return (
      <FriendCard
        key={oneFriend.id}
        friend={oneFriend}
        onDeleteFriendsClick={this.onDeleteFriendsClick}
        handleEditClick={this.onEdit}
      />
    );
  };

  render() {
    return <div className="card-group">{this.state.mappedFriends}</div>;
  }
}

export default Friends;
