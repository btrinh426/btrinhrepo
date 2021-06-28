import React from "react";
import * as userService from "../services/userService";
import FriendCard from "./FriendCard";

class Friends extends React.Component {
  state = {
    mappedFriends: [],
  };

  componentDidMount() {
    userService.getFriends().then(this.onGetSuccess).catch(this.onGetError);
  }

  onGetSuccess = (response) => {
    console.log(response);

    this.setState((prevState) => {
      return {
        ...prevState,

        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };

  onGetError = (err) => {
    console.error(err);
  };

  onEditClick = (friend) => {
    console.log("firing", friend);
    this.props.history.push(`/friends/${friend.id}/edit`, friend);
  };

  onDelete = (idToDelete) => {
    console.log("delete button is firing", idToDelete);
    // grab id make axios call and on success update DOM

    userService
      .deleteById(idToDelete)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (id) => {
    console.log("onDelete", { deletedFriend: id });

    this.setState((prevState) => {
      const indexOfPerson = prevState.mappedFriends.findIndex(
        (mappedFriend) => mappedFriend.key == id
      );

      const updatedFriends = [...prevState.mappedFriends];

      if (indexOfPerson >= 0) {
        updatedFriends.splice(indexOfPerson, 1);
      }

      return {
        mappedFriends: updatedFriends,
      };
    });
  };

  onDeleteError = (errResponse) => {
    console.log(errResponse);
  };

  mapFriend = (oneFriend) => {
    return (
      <FriendCard
        key={oneFriend.id}
        friend={oneFriend}
        editClick={this.onEditClick}
        handleDelete={this.onDelete}
      ></FriendCard>
    );
  };

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Friends</h1>
        <hr />
        <div className="row">
          {/* {this.state.friends.map(this.mapFriend)} */}
          {this.state.mappedFriends}
        </div>
      </div>
    );
  }
}

export default Friends;
