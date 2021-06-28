import React from "react";
import PracticeCard from "./PracticeCard";
import * as friendService from "../../services/friendsServices";

class PracticePage extends React.Component {
  state = {
    pageIndex: 0,
    pageSize: 10,
    mappedFriends: [],
  };

  componentDidMount = () => {
    this.onLoadGetFriends();
  };
  onLoadGetFriends = () => {
    friendService
      .getAll(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };
  onGetFriendsSuccess = (response) => {
    let friends = response.data.item.pagedItems;

    this.setState(() => {
      return { mappedFriends: friends.map(this.mapFriend) };
    });
  };
  mapFriend = (friend) => {
    return (
      <PracticeCard
        key={friend.id}
        oneFriend={friend}
        onEditClicked={this.onEditClicked}
        onDeleteSuccess={this.onDeleteSuccess}
        onDeleteError={this.onDeleteError}
      ></PracticeCard>
    );
  };

  onEditClicked = (e) => {
    console.log(e);
  };
  render() {
    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Practice Page</h1>
            <p className="lead">Stuff here</p>
          </div>
        </div>
        <div className="container">
          <div className="row">{this.state.mappedFriends}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default PracticePage;
