import React from "react";
import SingleFriend from "./SingleFriend";
//import Update from "./Update";
import * as friendsService from "../services/friendsService";
import showFriends from "../services/listService";
import FriendForm from "./FriendForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Friends extends React.Component {
  state = {
    mappedFriends: [],
  };

  //ajax for pagination
  componentDidMount() {
    showFriends()
      .then(this.onShowFriendsSuccess)
      .catch(this.onShowFriendsError);
  }
  onShowFriendsSuccess = (response) => {
    let allFriends = response.data.item.pagedItems;
    this.setState(() => {
      return { mappedFriends: allFriends.map(this.mapFriend) };
    });
  };
  onShowFriendsError(err) {
    console.log(err);
    toast["error"]("No Friends to show...");
  }
  onNewFriendClicked = (e) => {
    this.props.history.push("/friends/new");
  };

  //handlers from singlefriend
  onEditClicked = (friend) => {
    let friendId = friend.id;
    this.props.history.push(
      `/friends/${friendId}/edit`,
      friend,
      this.props.friendForm
    );
  };
  onDeleteClicked = (friend) => {
    let friendId = friend.id;
    friendsService
      .deleteFriend(friendId)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };
  onDeleteFriendSuccess = (id) => {
    toast["success"](`"Deleted Friend (id:${id})"`);
    this.setState((prevState) => {
      const indexOfPerson = prevState.mappedFriends.findIndex(
        (friend) => friend.key == id
      );
      const updatedPeople = [...prevState.mappedFriends];
      if (indexOfPerson >= 0) {
        updatedPeople.splice(indexOfPerson, 1);
      }
      return {
        mappedFriends: updatedPeople,
        friendForm: null,
      };
    });
  };
  onDeleteFriendError = (err) => {
    console.log(err);
  };

  //mapper w template
  mapFriend = (aFriend) => {
    return (
      <SingleFriend
        key={aFriend.id}
        {...this.props}
        friend={aFriend}
        onClick={this.onDeleteClicked}
        onEditClicked={this.onEditClicked}
      ></SingleFriend>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onNewFriendClicked}
          >
            New Friend
          </button>
          <div className="col-md-12 friend-list">
            {this.state.mappedFriends}
          </div>
        </div>
        <div className="container">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="..."
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="...">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="...">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="...">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="...">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
