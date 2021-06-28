import React from "react";
import * as friendService from "../services/friendService";
import SingleFriend from "./SingleFriend";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class FriendsList extends React.Component {
  state = {
    friends: [],
  };

  componentDidMount = (response) => {
    friendService
      .getFriends(0, 5)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    this.setState((prevState) => {
      return {
        friends: response.data.item.pagedItems,
      };
    });
    console.log(this.state);
  };
  onGetFriendsError = (err) => {
    console.log(err);
  };

  onEditClick = (friend) => {
    // e.preventDefault();
    // e.stopPropagation();

    // friendService;
    // .editFriend(e.currentTarget.dataset.frId)
    // .then(this.onEditSuccess)
    // .catch(this.onEditError);
    console.log(friend);
  };

  onEditSuccess = (response) => {
    toast.success("You have updated a friend.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onEditError = (errResponse) => {
    toast.error("You could not update friend.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    friendService
      .deleteFriend()
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (response) => {
    toast.success("You have deleted a friend.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onDeleteError = (errResponse) => {
    toast.error("You could not delete friend.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`Friends-${oneFriend.id}`}>
        <SingleFriend
          friend={oneFriend}
          onClick={this.onEditClick}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <div className="row">{this.state.friends.map(this.mapFriend)}</div>
          </div>
        </div>
      </main>
    );
  }
}

export default FriendsList;
