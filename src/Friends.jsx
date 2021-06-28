import React from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

import { getFriends, getFriend, deleteFriend } from "./components/apiCalls.js";
import ShowFriend from "./ShowFriend";

class Friends extends React.Component {
  state = {
    mappedFriends: [],
    friends: [],
  };

  idxForPagination = 0;
  pageSize = 20; // 2 for testing; 20 otherwise

  constructor(props) {
    super(props);

    this.getFriendList();
  }

  componentDidMount() {
    if (
      this.props.location.state &&
      this.props.location.state.type === "EDITED_FRIEND"
    ) {
      getFriend(this.props.location.state.id)
        .then(this.onGetOneFriendSuccess)
        .catch(this.onGetOneFriendError);
    }
  }

  onGetOneFriendSuccess = (response) => {
    let id = this.getIdOfDeleted(response.config.url);
    id = +id;
    let newState = [...this.state.friends];
    // let deleteIdx = newState.findIndex((x) => x.props.friend.id === deletedId);
    let editIdx = -1;
    for (let index = 0; index < newState.length; index++) {
      if (newState[index].id === id) {
        editIdx = index;
        break;
      }
    }

    if (editIdx >= 0) {
      console.log(response.data.item);
      newState[editIdx] = this.mapForState(response.data.item);

      const newMappedForDOM = newState.map(this.mapForDOM);
      this.setState(() => {
        return {
          friends: newState,
          mappedFriends: newMappedForDOM,
        };
      });
    }
  };

  onGetOneFriendError = (result) => {
    Swal.fire("error updating friend display");
  };

  onAddFriend = (e) => {
    e.preventDefault();
    this.props.history.push("/addfriend");
  };

  onEdit = (friend) => {
    this.props.history.push("/addfriend", {
      type: "EDIT_FRIEND",
      friend: friend,
    });
  };

  friendUpdated = (friend) => {};

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

    if (deleteIdx >= 0) {
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
    }
  };

  onDeleteError = (e) => {
    console.log("Could not delete friend");
  };

  // JTG:
  onMore = (e) => {
    e.preventDefault();
    this.getFriendList();
  };

  // get 20 at a time but to test pagination, take down to 2
  getFriendList = () => {
    getFriends(this.idxForPagination, this.pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
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

  // using this function gives me a warning: index.js:1 Warning: Each child in a list should have a unique "key" prop.
  // even though code almost identical to function above
  mapForDOM = (friend) => {
    return (
      <div className="card col-md-3" key={friend.id}>
        <ShowFriend
          friend={friend}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
        ></ShowFriend>
      </div>
    );
  };

  render() {
    // console.log("Friends");
    return (
      <React.Fragment>
        <nav className="navbar">
          <form className="form-inline my-2 my-lg-0">
            {/* <h1>Friends</h1> */}
            <span>Friends</span>
            <button
              style={{ color: "blue" }}
              className="btn btn-primary my-2 my-sm-0 ml-3"
              onClick={this.onAddFriend}
            >
              Friend+ &raquo;
            </button>
          </form>
        </nav>

        {/* <AddFriend path="/addfriend"></AddFriend> */}

        <div className="col-md-12 p-5">
          <h1>Friends</h1>
          <div className="row">{this.state.mappedFriends}</div>
          <hr />
        </div>
        {/* <footer className="container">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onMore}
            id="more"
          >
            More
          </button>
        </footer> */}
      </React.Fragment>
    );
  }
}

export default withRouter(Friends);
