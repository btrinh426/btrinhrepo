import React from "react";
import * as friendService from "../services/friendService";

class FriendsList extends React.Component {
  componentDidMount = (response) => {
    friendService
      .getFriends(0, 4)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    console.log({ response });

    // this.setState((prevState) => {
    //   return {
    //     totalNumber: response.data.item.totalCount,
    //     mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
    //   };
    // });
  };
  onGetFriendsError = (err) => {
    console.log(err);
  };

  mapFriends() {}

  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <div className="card">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">{this.state}</p>
                  <a href="#" className="btn btn-primary">
                    Edit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default FriendsList;
