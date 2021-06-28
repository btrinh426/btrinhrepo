import React from "react";
import * as friendService from "../services/friendService";
import SingleFriend from "./SingleFriend";
// import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Friends extends React.Component {
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

  onAddFriendClick = (frnd) => {
    this.props.history.push("/Friends/Add");
  };

  onEditClickedFull = (frnd) => {
    console.log(frnd);
    this.props.history.push("/Friends/" + frnd.id + "/edit");
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

  onDeleteClickedFull = (frnd) => {
    //pass parameter object from edit profile component
    const pointerToFunc = this.onDeleteSuccessCur(frnd.id);
    friendService
      .deleteFriend(frnd.id)
      .then(pointerToFunc)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
    console.log(frnd);
  };

  onDeleteSuccessCur = (id) => {
    return (data) => {
      console.log(data);
      console.log(id);
      this.setState((prevState) => {
        const indexOfFriends = prevState.friends.findIndex(
          (oneFriend) => oneFriend.id === data.id
        );
        debugger;
        const updatedFriends = [...prevState.friends];

        if (indexOfFriends >= 0) {
          updatedFriends.splice(indexOfFriends, 1);
        }
        return { idDeleted: id, friends: updatedFriends, formData: null };
      }, this.stateChanged);
      console.log("Successful Delete", data);
    };
  };

  onDeleteSuccess = () => {
    window.location.reload();
    //Use set state to prevent ajax calls again
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
          onDeleteClick={this.onDeleteClickedFull}
          onEditClick={this.onEditClickedFull}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onAddFriendClick}
            >
              Add Friend
            </button>
            <p></p>
            <div className="row">{this.state.friends.map(this.mapFriend)}</div>
          </div>
        </div>
      </main>
    );
  }
}

export default Friends;
