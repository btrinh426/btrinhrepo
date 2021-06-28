import React from "react";

import { getFriends, deleteFriend } from "./components/apiCalls.js";
import ShowFriend from "./ShowFriend";

class Friends extends React.Component {
  state = {
    // mappedFriends: [],
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
    console.log(e);
    deleteFriend(e.currentTarget.dataset.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  // JTG: Should cause a refresh. What am I doing wrong
  onDeleteSuccess = (response) => {
    // after deleted from database, delete locally
    let deletedId = this.getIdOfDeleted(response.config.url);
    console.log("friends: ", this.state.friends);
    let newState = [...this.state.friends];
    console.log("newState: ", newState);
    let deleteIdx = newState.findIndex((x) => x.props.friend.id === +deletedId);
    newState.slice(deleteIdx, 1);

    console.log("newState: ", newState);
    const newMappedForDOM = newState.map(this.mapForDOM);

    this.setState(() => {
      // return { friends: newMappedForDOM }; // displays but can't delete
      return { friends: newState, mappedFriends: newMappedForDOM };
      // return { mappedFriends: [...newMappedState] };
    });
  };

  onDeleteError = (e) => {
    console.log("Could not delete friend");
  };

  componentDidMount = () => {
    getFriends(0, 20)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    if (response.data.item.totalCount) {
      const newMappedForState = response.data.item.pagedItems.map(
        this.mapForState
      );
      const newMappedForDom = newMappedForState.map(this.mapForDOM);

      console.log("mapped for state:", newMappedForState);
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

  // transform input format (from DB) to format used by this object
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

  mapForDOM = (friend) => {
    console.log("id is:", friend.id);
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
            onClick={this.onEdit}
            id="edit"
          >
            Edit
          </button>
        </div>
      </div>
    );
  };

  render() {
    console.log("on render: ", this.state.friends);
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
