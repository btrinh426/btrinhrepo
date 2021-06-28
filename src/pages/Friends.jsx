import React, { Component } from "react";
import { toast } from "react-toastify";
import * as peopleService from "../services/peopleService";
import FriendCard from "../components/FriendCard";

class Friends extends Component {
  state = { friends: [] };

  componentDidMount() {
    peopleService.list(0, 10).then(this.onActionSucces).catch(this.onActionErr);
  }

  onActionSucces = (res) => {
    if (res && res.data) {
      this.setState({ friends: res.data.item.pagedItems });
      toast.success("Welcome friend!");
    }
  };

  onActionErr = (err) => {
    console.log("err ", err);
    toast.error(
      "Add friend fail. Please check your information and try agian."
    );
  };

  mapFriend = (friend) => {
    return (
      <FriendCard
        key={`friend${friend.id}`}
        friend={friend}
        // onEditClick={}
        onDeleteClick={this.onDelete}
      />
    );
  };

  onDelete = (id) => {
    peopleService.remove(id).then(this.onRemoveSucces).catch(this.onActionErr);
  };

  // onEdit = id => {
  //   const
  // }

  // onRemoveSucces = id => {

  // }

  render() {
    let friends = this.state.friends;
    return (
      <div className="card-deck">
        {" "}
        {friends.map((friend) => {
          return this.mapFriend(friend);
        })}
      </div>
    );
  }
}

export default Friends;
