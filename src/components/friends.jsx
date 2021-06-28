import React from "react";
import NavBar from "./navbar";
import * as FriendService from "../services/friendService";
import SingleFriend from "./singlefriend";
// import Pagination from 'rc-pagination';

class Friends extends React.Component {
  state = {
    friends: [],
  };

  componentDidMount = () => {
    FriendService.friendsCurrent(0, 10)
      .then(this.onFriendsSuccess)
      .catch(this.onErrorMade);
  };

  onFriendsSuccess = (info) => {
    let friendInfo = info.data.item.pagedItems;
    this.setState(() => {
      return { friends: friendInfo.map(this.mappingFriends) };
    });
  };

  onDeleteButtonClicked = (id) =>
    FriendService.friendsDelete(id)
      .then(this.removePerson)
      .catch(this.onErrorMade);

  removePerson = (friend) => {
    this.setState((prevState) => {

      const copyOfState = [...prevState.friends];

      const idPosition = prevState.friends.findIndex(
        (oneFriend) => oneFriend.id === friend.id
      );

      if (idPosition >= 0) {
        copyOfState.splice(idPosition, 1);
      }
      return { friends: copyOfState };
    });
  };

  onEditButtonClicked = (friend) => {
    this.props.history.push(`/friends/${friend.id}/edit`, {
      type: "EDIT",
      payload: friend,
    });
  };

  onAddFriendClicked = () => this.props.history.push("/friends/new");

  mappingFriends = (aFriend) => {
    console.log(aFriend);
    return (
      <SingleFriend
        editPerson={this.onEditButtonClicked}
        deletePerson={this.onDeleteButtonClicked}
        friend={aFriend}
        key={`Your Key? Why, it's ${aFriend.id}`}
      />
    );
  };

  onErrorMade = (response) =>
    console.log("Check Your Code, Enrique!", response);

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <h3 className="p-4">A List of Friends </h3>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={this.onAddFriendClicked}
        >
          Add Friend
        </button>
        <hr />
        <div className="row">{this.state.friends}</div>
      </React.Fragment>
    );
  }
}

export default Friends;
