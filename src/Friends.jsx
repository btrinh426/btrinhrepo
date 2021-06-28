import React from "react";

import { getFriends, deleteFriend } from "./components/apiCalls.js";
import ShowFriend from "./ShowFriend";

class Friends extends React.Component {
  state = {
    mappedFriends: [],
    friends: [],
  };

  onEdit = (friend) => {
    console.log("onEdit: ", friend);
  };

  getIdOfDeleted = (deleteUrl) => {
    let deleteArray = deleteUrl.split("/");
    return deleteArray[deleteArray.length - 1];
  };

  // JTG: render in ShowFriends - on delete click can't get id
  onDelete = (e) => {
    deleteFriend(e.currentTarget.dataset.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  // JTG: Should cause a refresh. What am I doing wrong
  onDeleteSuccess = (response) => {
    // this works to refresh page after delete but depends on call to database
    // this.getFriendList();

    // after deleted from database, delete locally
    let deletedId = this.getIdOfDeleted(response.config.url);
    deletedId = +deletedId;
    console.log(typeof deletedId);
    let newState = [...this.state.friends];

    // let deleteIdx = newState.findIndex((x) => x.props.friend.id === deletedId);
    let deleteIdx = -1;
    for (let index = 0; index < newState.length; index++) {
      if (newState[index].id === deletedId) {
        deleteIdx = index;
        break;
      }
    }

    // console.log(deleteIdx, newState);
    newState.splice(deleteIdx, 1);
    // console.log(newState);

    const newMappedForDOM = newState.map(this.mapForDOM);

    this.setState(() => {
      return {
        friends: newState,
        mappedFriends: newMappedForDOM,
      };
    });
  };

  onDeleteError = (e) => {
    console.log("Could not delete friend");
  };

  getFriendList = () => {
    getFriends(0, 20)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  componentDidMount = () => {
    this.getFriendList();
  };

  onGetFriendsSuccess = (response) => {
    if (response.data.item.totalCount) {
      const newMappedForState = response.data.item.pagedItems.map(
        this.mapForState
      );
      const newMappedForDom = newMappedForState.map(this.mapForDOM);

      this.setState(() => {
        return {
          friends: newMappedForState,
          mappedFriends: newMappedForDom,
        };
      });

      // displays but can't delete
      // this.setState(() => {
      //   return {
      //     friends: newMappedForDom,
      //   };
      // });
    }
  };

  // could be user has no friends -> error type
  onGetFriendsError = (response) => {
    console.log("onGetFriendError");
  };

  mapForState = (friend) => {
    let stateFriend = {
      id: friend.id,
      title: friend.title,
      bio: friend.bio,
      summary: friend.summary,
      headline: friend.headline,
      slug: friend.slug,
      statusId: "Active",
      primaryImage: friend.primaryImage.imageUrl,
    };
    return stateFriend;
  };

  mapForDOM2 = (friend) => {
    return (
      <div className="card col-md-3" key={friend.id}>
        <img src={friend.primaryImage} className="card-img-top" alt="..." />
        <div className="card-header text-center">
          <h5 className="card-title">{friend.title}</h5>
        </div>
        <div className="card-body">
          <p className="card-text" color="black">
            {friend.summary}
          </p>
        </div>
        <div className="card-footer text-center">
          <button
            type="button"
            className="btn btn-danger mr-3"
            onClick={this.onDelete}
            id="delete"
            data-id={friend.id}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-primary"
            // onClick={() => onEdit(friend)} // concise version of arrow function
            id="edit"
          >
            Edit
          </button>
        </div>
      </div>
    );
  };

  // using this function gives me a warning: index.js:1 Warning: Each child in a list should have a unique "key" prop.
  // even though code almost identical to function above
  mapForDOM = (friend) => {
    return (
      <ShowFriend
        friend={friend}
        onEdit={this.onEdit}
        onDelete={this.onDelete}
      ></ShowFriend>
    );
  };

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Friends</h1>
        <div className="row">{this.state.mappedFriends}</div>
        <hr />
      </div>
    );
  }
}

export default Friends;
