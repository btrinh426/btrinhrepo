import React from "react";
import { showFriends, deleteFriend } from "../services/listService";

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

  //mapper w template
  mapFriend = (aFriend) => {
    return (
      <div className="card" key={`Names-${aFriend.id}`}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{aFriend.title}</h5>
          <p className="card-text">{aFriend.summary}</p>
          <button className="btn btn-primary link-btn">edit</button>
          <button
            className="btn btn-primary link-btn"
            onClick={() => this.onDeleteClicked(aFriend)}
            data-id={aFriend.id}
          >
            delete
          </button>
        </div>
      </div>
    );
  };

  //click handlers
  onDeleteClicked = (friend) => {
    //  let friendId = e.currentTarget.dataset.id;
    console.log(friend);

    // deleteFriend(friendId)
    //   .then(this.onDeleteFriendSuccess)
    //   .catch(this.onDeleteFriendError);
  };
  onDeleteFriendSuccess = (response) => {
    console.log(response);
  };
  onDeleteFriendError = (err) => {
    console.log(err);
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
