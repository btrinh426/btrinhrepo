import React from "react";
import SingleFriend from "./SingleFriend";
import * as friendsService from "../services/friendsService";

class Friends extends React.Component {
  state = {
    mappedFriends: "",
  };

  componentDidMount() {
    friendsService.getFriends().then(this.onGetSuccess).catch(this.onGetError);
  }

  onGetError = (err) => {
    console.error("failed!" + err);
  };
  onGetSuccess = (myFriends) => {
    let friends = myFriends.data.item.pagedItems;

    this.setState((prevState) => {
      return {
        ...prevState,
        mappedFriends: friends.map(this.mapFriend),
        friends,
      };
    });
  };
  mapFriend = (singleFriend) => {
    return (
      <SingleFriend
        key={singleFriend.id}
        person={singleFriend}
        onFriendClicked={this.onSelectedItemChange}
      />
    );
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="container">{this.state.mappedFriends}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
