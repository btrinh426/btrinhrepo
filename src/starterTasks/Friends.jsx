import { timers } from "jquery";
import React from "react";
import UpdateForm from "./UpdateFriendForm";
import friendService from "../services/friendService";
import FriendCard from "./FriendCard";
import UpdateFriendForm from "./UpdateFriendForm";

class Friends extends React.Component {
  state = {
    friendArray: [],

    individualFriend: {
      id: 0,
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
    },
  };

  componentDidMount() {
    console.log("It worked");
    friendService
      .friendsPaginated(0, 10)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }

  onActionSuccess = (response) => {
    var friends = response?.data?.item?.pagedItems;
    if (friends?.length > 0) {
      this.updateStateWithFriends(friends);
    }
  };

  updateStateWithFriends(friends) {
    this.setState((prevState) => {
      return {
        ...prevState,
        friendArray: friends.map(this.friendMap),
      };
    });
  }

  onActionError = (err) => {
    console.log("Denied", err);
  };

  friendMap = (friend) => {
    return (
      <FriendCard
        deleteMe={() => this.deleteFriend(friend.id)}
        editMe={() => this.updateFriend(friend)}
        friend={friend}
        key={friend.id}
      />
    );
  };

  deleteFriend = (id) => {
    friendService
      .deleteById(id)
      .then(this.onDeleteSuccess)
      .catch(this.onActionError);
  };

  onDeleteSuccess = (id) => {
    console.log(id);

    this.setState((prevState) => {
      const friendArray = [...prevState.friendArray];

      const index = friendArray.findIndex((f) => parseInt(f.key) === id);

      console.log(index);

      if (index > -1) {
        friendArray.splice(index, 1);
      }
      return { friendArray };
    });
  };
  //how to add this to the app.jsx??
  updateFriend = (friend) => {
    // console.log("I update: ", friend);
    this.props.history.push(`/friends/${friend.id}/edit`, friend);
  };

  toCreateFriend = (e) => {
    e.preventDefault();
    console.log("i was pressed");
    this.props.history.push("/friends/new");
  };

  render() {
    return (
      <div className="row p-5">
        <div className="col-md-4 p-5">
          <button
            onClick={this.toCreateFriend}
            type="button"
            className="btn btn-success"
          >
            Add new friend
          </button>
          {this.state.friendArray}
        </div>
      </div>
    );
  }
}

export default Friends;
