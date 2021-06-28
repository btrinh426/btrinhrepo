import React from "react";

import "rc-pagination/assets/index.css";

import FriendsService from "../services/FriendsService";

import SingleFriend from "./SingleFriend";

import { toast } from "react-toastify";

import Pagination from "rc-pagination";

/*
friends list in same component as search box & button
concant to url + Id for Put url incorporate page index and page count as parameters for GET by pagination request (string concatenation or string interpolationin)
for pagination you are basically incrementing page with a certain amount of search results per pay () dont forget about the zero-based index
*/

class Friends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      current: 1,
      totalCount: 0,
      pageCount: "",
      cardId: "",
      formData: {
        name: "",
      },
    };
  }
  // -----Get Friends Call-----
  componentDidMount() {
    FriendsService.getAllFriends(0, 3)
      .then(this.onGetAllFriendsSuccess)
      .catch(this.onGetAllFriendsError);
  }

  onGetAllFriendsSuccess = (response) => {
    console.log(response);
    this.setState((prevState) => {
      return {
        totalCount: response.data.item.totalCount,
        current: response.data.item.pageIndex + 1,
        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
    console.log(this.state);
  };

  onGetAllFriendsError = (err) => {
    console.error(err);
  };
  //-----Single Friend-----
  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`Friends-${oneFriend.id}`}>
        <SingleFriend
          {...this.props}
          friendData={oneFriend}
          onEditRequested={this.onAFriendEditClicked}
          onDeleteRequested={this.onAFriendDeleteClicked}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  //-----Edit Click Handler----
  onAFriendEditClicked = (friend) => {
    console.log("Edit clicked friend", friend.id);
    this.props.history.push(`/AddFriends/${friend.id}/edit/`, {
      type: "FriendData",
      payload: friend,
    });
  };

  //-----Delete Click Handler-----
  onAFriendDeleteClicked = (friend) => {
    console.log(friend);
    FriendsService.deleteFriend(friend.id)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onDeleteSuccessCur = (id) => {
    return (data) => {
      console.log(data);
      console.log(id);
      this.setState((prevState) => {
        const indexOfFriends = prevState.mappedFriends.findIndex(
          (oneFriend) => oneFriend.id === data.id
        );
        debugger;
        const updatedFriends = [...prevState.mappedFriends];
        if (indexOfFriends >= 0) {
          updatedFriends.splice(indexOfFriends, 1);
        }
        return { idDeleted: id, mappedFriends: updatedFriends, formData: null };
      }, this.stateChanged);
      console.log("Successful Delete", data);
    };
  };

  onDeleteFriendSuccess = (response) => {
    window.location.reload();
    console.log(response);
    toast.success("You have deleted a friend", {
      position: toast.POSITION_TOP_RIGHT,
    });
  };

  onDeleteFriendError = (err) => {
    console.error(err);
    toast.warning("Unable to delete friend", {
      poistion: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //-----Search input w/ handler-----
  onFormFieldChanged = (e) => {
    let inputName = e.currentTarget;
    let newValue = e.currentTarget.value;
    console.log("inputName", inputName, "inputValue", newValue);

    this.setState(() => {
      let newState = {};
      newState.searchTerm = newValue;

      return newState;
    });
  };

  onSearchClicked = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const searchResult = this.state.searchTerm;
    this.props.history.push("/friends?q=" + searchResult);
    FriendsService.searchFriends(0, 3, searchResult)
      .then(this.onSearchFriendSuccess)
      .catch(this.onSearchFriendError);
  };

  onSearchFriendSuccess = (response) => {
    console.log({ SearchedFriend: response.data.item.pagedItems });
    toast["success"]("Found your Friend");

    this.setState((prevState) => {
      return {
        totalCount: response.data.item.totalCount,
        current: response.data.item.pageIndex + 1,
        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };

  onSearchFriendError = (err) => {
    console.error({ err });
    toast["error"]("Unable to find friend");
  };

  //-----Pagination-----
  onChange = (page) => {
    console.log(page);
    const searchResult = this.state.searchTerm;
    this.setState((prevState) => {
      if (searchResult) {
        console.log(page - 1);
        FriendsService.searchFriends(page - 1, 3, searchResult)
          .then(this.onSearchFriendSuccess)
          .catch(this.onSearchFriendError);
        return {
          current: page,
        };
      } else {
        console.log(page);
        FriendsService.getAllFriends(page - 1, 3)
          .then(this.onGetAllFriendsSuccess)
          .catch(this.onGetAllFriendsError);
        return {
          current: page,
        };
      }
    });
    console.log(this.state.current);
  };

  //-----Add Friend Click Handler-----
  onAddFriendClicked = (e) => {
    this.props.history.push("/addFriends");
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 p-5">
          <h1>Friends</h1>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={this.onAddFriendClicked}
          >
            Add Friend
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="search friends"
            aria-label="search friends"
            onChange={this.onFormFieldChanged}
            value={this.state.searchTerm}
          />
          <div>
            <button
              className="btn btn-outline-secondary"
              type="submit"
              onClick={this.onSearchClicked}
            >
              Search
            </button>
          </div>
          <hr />
          <div className="row">{this.state.mappedFriends}</div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <Pagination
                className="pagination"
                defaultPageSize={3}
                onChange={this.onChange}
                current={this.state.current}
                total={this.state.totalCount}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
