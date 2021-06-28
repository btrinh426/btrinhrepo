import React from "react";
import { withRouter } from "react-router-dom";
import * as friendService from "../services/friendService";
import FriendCard from "./FriendCard";
// import Pagination from "rc-pagination";
// import "rc-pagination/assets/index.css";

class Friends extends React.Component {
  // state = {
  //   friends: [
  //     { id: 1, name: "John", title: "Dr" },
  //     { id: 2, name: "Mary", title: "Awesome" },
  //     { id: 3, name: "Michelle", title: "Profesor" },
  //   ],
  // };

  // mapFriend = (friend) => <FriendCard key={friend.id} friend={friend} />;

  // render() {
  //   return (
  //     <div>
  //       <h1>Friends</h1>
  //       <div>{this.state.friends.map(this.mapFriend)}</div>
  //     </div>
  //   );
  // }

  state = {};

  componentDidMount() {
    friendService
      .getFriends()
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  }

  onGetFriendsSuccess = (response) => {
    console.log(response.data.item.pagedItems);

    let friends = response.data.item.pagedItems;

    this.setState(() => {
      return { mappedFriends: friends.map(this.mapFriend) };
    });
  };

  onGetFriendsError = (err) => {
    console.error(err);
  };

  onDeleteClicked = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.dataset.friendId);

    let id = e.currentTarget.dataset.friendId;

    friendService
      .removeFriend(id)
      .then(this.onRemoveFriendSuccess)
      .catch(this.onRemoveFriendError);
  };

  onRemoveFriendSuccess = (response) => {
    console.log(response);
  };

  onRemoveFriendError = (err) => {
    console.error(err);
  };

  onAddFriendClicked = () => {
    this.props.history.push("/friends/new");
  };

  onEditClicked = (e) => {
    e.preventDefault();

    console.log(e.currentTarget.dataset.friendId);

    let id = e.currentTarget.dataset.friendId;

    this.props.history.push("/friends/" + id);
  };

  mapFriend = (friend) => (
    <FriendCard
      key={friend.id}
      friend={friend}
      onDeleteClick={this.onDeleteClicked}
      onEditClick={this.onEditClicked}
    />
  );

  render() {
    return (
      <div>
        <h2>
          Friends
          <button
            type="button"
            className="btn btn-primary ml-3"
            onClick={this.onAddFriendClicked}
          >
            + Friend
          </button>
        </h2>

        <div className="row">{this.state.mappedFriends}</div>
      </div>
    );
  }
}

export default withRouter(Friends);
