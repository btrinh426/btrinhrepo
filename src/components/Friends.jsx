import React from "react";
import * as friendService from "../services/friendService";
import FriendCard from "./FriendCard";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {
    mapFriends: [],
  };

  componentDidMount() {
    friendService
      .read(0, 10)
      .then(this.onReadFriendsSuccess)
      .catch(this.onReadFriendsError);
  }
  onReadFriendsError = (response) => {
    console.warn({ error: response });
  };

  onReadFriendsSuccess = (response) => {
    let friendsList = response.data.item.pagedItems;
    console.log(friendsList);

    this.setState(() => {
      return { mapFriends: friendsList.map(this.mapFriends) };
    });
  };

  mapFriends = (aFriend) => {
    return (
      <FriendCard
        friend={aFriend}
        onDel={this.deleteFriendClicked}
        editData={this.editFriendClick}
        key={"Friends" + aFriend.id}
      />
    );
  };

  deleteFriendClicked = (id) => {
    console.log(id);

    const delId = id;

    friendService
      .deleteById(delId)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (id) => {
    this.setState((prevState) => {
      console.log(prevState.mapFriends);
      let indexOfFriend = prevState.mapFriends.findIndex(
        (aFriend) => aFriend.props.friend.id === id
      );

      let uptdFriends = [...prevState.mapFriends];

      if (indexOfFriend >= 0) {
        uptdFriends.splice(indexOfFriend);
      }
      return {
        mapFriends: uptdFriends,
      };
    }, this.stateChanged);
  };

  onDeleteError = (resp) => {
    console.warn({ error: resp });
  };

  editFriendClick(frndData) {
    console.log(frndData);

    let editData = frndData;

    friendService
      .update(editData)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  }

  // onUpdateSuccess = (editData) => {
  //   this.setState((prevState) => {
  //     console.log(prevState.mapFriends);
  //     let ndxOfFriend = prevState.mapFriends.findIndex((form) => {
  //       return form.id === editData.id;
  //     });
  //     let updatedFriends = null;

  //     if (ndxOfFriend >= 0) {
  //       updatedFriends = [...prevState.friends];
  //       updatedFriends[ndxOfFriend] = editData;
  //     }
  //     return {
  //       friends: updatedFriends,
  //     };
  //   }, this.stateChanged);

  // this.props.history.push("/editfriend/");
  // }

  onUpdateError = (response) => {
    console.warn({ error: response });
  };

  render() {
    return (
      <div>
        <div className="col-md-12 p-5">
          <h1>Friends</h1>
          <hr />
          <div className="row">{this.state.mapFriends}</div>
        </div>
      </div>
    );
  }
}

export default Friends;
