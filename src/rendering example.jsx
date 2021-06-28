import React from "react";
import peopleService from "./services/peopleService";

class RenderingExample extends React.Component {
  state = { friends: [] };
  showFriend = () => {
    peopleService
      .getFriend(0)
      .then(this.onGetFriendSuccess)
      .catch(this.onGetFriendError);
  };

  onGetFriendSuccess = (response) => {
    console.log(response);
    let friendData = response.data.item.pagedItems;
    this.setState(() => {
      let newState = {};
      newState.friends = friendData;
      return newState;
    });
  };
  onGetFriendError = (response) => {
    console.log(response);
  };
  componentDidMount() {
    this.showFriend();
  }

  mapFriends(oneFriend) {
    return (
      <div className="card">
        <img className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{oneFriend.title}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Friends</h1>
        <hr />
        <div className="row">
          <div className="col">{this.state.friends.map(this.mapFriends)}</div>
        </div>
      </div>
    );
  }
}

export default RenderingExample;
