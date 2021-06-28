import React, { Component } from "react";
import { toast } from "react-toastify";
import * as peopleService from "../services/peopleService";
import FriendCard from "../components/FriendCard";

class Friends extends Component {
  state = {
    friends: [],
    mapFriends: [],
  };

  componentDidMount() {
    peopleService.list(0, 10).then(this.onActionSucces).catch(this.onActionErr);
  }

  onActionSucces = (res) => {
    console.log("lllll  ", res.data.item.pagedItems);
    if (res && res.data) {
      this.setState({
        friends: res.data.item.pagedItems,
        mapFriends: res.data.item.pagedItems.map(this.mapFriend),
      });
      console.log("xxx ", this.state.mapFriends[0].props.friend);
      toast.success("Welcome friend!");
    }
  };

  onActionErr = (err) => {
    console.log("err ", err);
    toast.error(
      "Add friend fail. Please check your information and try agian."
    );
  };

  onDelete = (id) => {
    peopleService.remove(id).then(this.onRemoveSuccess).catch(this.onActionErr);
  };

  onRemoveSuccess = (id) => {
    // const newState = this.state.mapFriends.filter((item) => item.id !== res.id);

    // this.setState(prevState => {
    //   friends:
    // });
    toast.success("Delete was successful!");
  };

  onEdit = (id) => {
    this.props.history.push({
      pathname: `/friends/${id}/edit`,
    });
  };

  mapFriend = (friend) => {
    return (
      <FriendCard
        key={`friend${friend.id}`}
        friend={friend}
        onEditClick={this.onEdit}
        onDeleteClick={this.onDelete}
      />
    );
  };

  render() {
    return <div className="card-deck">{this.state.mapFriends}</div>;
  }
}

export default Friends;
