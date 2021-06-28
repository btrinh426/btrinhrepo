import React from "react";
import * as friendsSerivce from "../services/friendsService";
import SingleFriend from "./SingleFriend";
const queryString = require("query-string");
class FriendSearched extends React.Component {
  state = {
    friends: [],
  };

  componentDidMount() {
    console.log("componentDidMount");
    let friendName = queryString.parse(this.props.location.search).friendName;
    console.log(friendName);
    friendsSerivce
      .getByName(0, 10, friendName)
      .then(this.onGetByNameSuccess)
      .catch(this.onGetByNameError);
  }
  componentDidUpdate(prevProps) {
    //if () { make ajax call if the query string if prevProps(querystring) is different with currentprops
    console.log("componentDidUpdate");
  }
  onGetByNameSuccess = (res) => {
    let friend = res.data.item.pagedItems;
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.friends = friend;
      return newState;
    });
  };

  onGetByNameError = (res) => {
    console.error(res);
  };

  onUpdateClick = (e) => {
    console.log(e.id);
    this.props.history.push(`/update?friendId=${e.id}`);
  };

  onDeleteClick = (e) => {
    console.log(e);
    friendsSerivce
      .remove(e.id)
      .then(this.onRemoveSuccess)
      .catch(this.onRemoveError);
    let newFriends = this.state.friends.filter((item) => {
      return item.id !== e.id;
    });

    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.friends = newFriends;
      console.log(newState);
      return newState;
    });
  };

  mapFriends = (singleFriend) => {
    return (
      <SingleFriend
        key={`Friend-${singleFriend.id}`}
        friend={singleFriend}
        onUpdateClick={this.onUpdateClick}
        onDeleteClick={this.onDeleteClick}
      />
    );
  };
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={this.onAddFriendClick}
          >
            Add Friend
          </button>
          <div className="row">{this.state.friends.map(this.mapFriends)}</div>
        </div>
      </div>
    );
  }
}

export default FriendSearched;
