import React from "react";
import { Link } from "react-router-dom";
import * as friendService from "../services/friendService";
import SingleFriend from "./SingleFriend";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Friends extends React.Component {
  state = { currentPage: 1, searchFriendName: "", idsToBeDelelted: [] };
  componentDidMount() {
    friendService
      .friendList(this.state.currentPage)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Previous State", prevState);
    console.log("Current State", this.state);
    let currentQry = this.props.location.search;
    let prevQry = prevProps.location.search;
    console.log({ prevQry, currentQry });

    if (prevQry !== currentQry && currentQry == "") {
      friendService
        .friendList(this.state.currentPage)
        .then(this.onActionSuccess)
        .catch(this.onActionError);
    }
  }

  onActionSuccess = (response) => {
    console.log(response.data.item.pagedItems);
    this.setState(() => {
      return {
        mappedfriends: response.data.item.pagedItems.map(this.mapFriend),
        totalCount: response.data.item.totalCount,
        friends: response.data.item.pagedItems,
      };
    });
  };
  onActionError = (errResponse) => {
    console.log(errResponse);
  };

  onEditClicked = (friend) => {
    console.log(friend.id);

    this.props.history.push(`/friends/${friend.id}/edit`, {
      type: "friendData",
      payload: friend,
    });
  };

  onDeleteClicked = (friend) => {
    console.log("This ID is deleted", friend.id);
    toast.success(`${friend.title} is deleted`, {
      position: toast.POSITION.TOP_CENTER,
    });

    const aFxPointer = this.onDeleteSafe(friend.id);
    friendService
      .deleteFriend(friend.id)
      .then(aFxPointer)
      .catch(this.onDeleteError);
  };

  onDeleteSafe = (deletedPersonId) => {
    this.setState((prevState) => {
      const indexOfPerson = prevState.friends.findIndex(
        (friend) => friend.id === deletedPersonId
      );

      const updatedPeople = [...prevState.friends];

      if (indexOfPerson >= 0) {
        //do not slice or otherwise mutate the objects in array
        updatedPeople.splice(indexOfPerson, 1);
      }

      return {
        mappedfriends: updatedPeople.map(this.mapFriend),
      };
    }, this.stateChanged);
  };

  onSearchButtonClicked = (e) => {
    e.preventDefault();
    this.props.history.push(
      `/friends?friendName-${this.state.searchFriendName}`
    );

    friendService
      .searchFriend(this.state.searchFriendName)
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };

  onSearchSuccess = (res) => {
    console.log(res.data.item.pagedItems);

    this.setState(() => {
      return {
        mappedfriends: res.data.item.pagedItems.map(this.mapFriend),
        totalCount: res.data.item.totalCount,
      };
    });
  };
  onSearchError = (errResponse) => {
    console.error(errResponse);
    this.setState(() => {
      return { mappedfriends: "", totalCount: 1 };
    });
    toast.error("Not found");
  };

  onDeleteSuccess = (res) => {
    console.log(res);

    friendService
      .friendList(this.state.currentPage)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };
  onDeleteError = (res) => {
    console.log(res);
  };

  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`Friends-${oneFriend.id}`}>
        <SingleFriend
          {...this.props}
          friend={oneFriend}
          onclick={this.onEditClicked}
          onClick={this.onDeleteClicked}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  onChange = (page) => {
    console.log(page);
    this.setState(() => {
      return {
        currentPage: page,
      };
    });
    friendService
      .friendList(page)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };
  onSearchFieldChanged = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState({ searchFriendName: newValue });
    console.log(newValue);
  };

  render() {
    return (
      <React.Fragment>
        <form className="form-inline my-2 my-lg-0">
          <Link to="/AddFriend">
            <button
              type="button"
              id="AddFriend"
              className="btn btn-primary m-3"
            >
              Add a Friend
            </button>
          </Link>
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Name"
            aria-label="Search"
            onChange={this.onSearchFieldChanged}
            value={this.state.searchFriendName}
          />

          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={this.onSearchButtonClicked}
          >
            Search a Friend
          </button>
        </form>

        <h1 className="friendlist pb-0 pl-3">My Friends List</h1>
        <hr />
        <div className="container my-5">
          <div className="card-columns">{this.state.mappedfriends}</div>
        </div>
        <Pagination
          className="pagination"
          onChange={this.onChange}
          total={this.state.totalCount}
          pageSize={6}
          style={{
            margin: "auto",
            width: "10%",
            padding: "10px",
            fontsize: "large",
            textalign: "center",
          }}
        />
      </React.Fragment>
    );
  }
}

export default Friends;
