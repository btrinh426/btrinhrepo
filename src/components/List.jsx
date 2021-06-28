import React from "react";
import SingleFriend from "./SingleFriend";
import deleteFriend from "../services/singleFriendService";
import showFriends from "../services/listService";

//add update friend functionality

class List extends React.Component {
  state = {
    friendForm: [
      {
        title: "",
        id: "",
        bio: "",
        summary: "",
        slug: "",
        statusId: "",
        primaryImage: "",
      },
    ],
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
  }

  //delete + handlers
  onDeleteClicked = (friend) => {
    let friendId = friend.id;

    deleteFriend(friendId)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };
  onDeleteFriendSuccess = (response) => {
    console.log(response);
  };
  onDeleteFriendError = (err) => {
    console.log(err);
  };

  //mapper w template
  mapFriend = (aFriend) => {
    return (
      <div className="card" key={`Names-${aFriend.id}`}>
        <SingleFriend
          friend={aFriend}
          onClick={this.onDeleteClicked}
        ></SingleFriend>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="col-md-12 friend-list">
            {this.state.mappedFriends}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default List;
