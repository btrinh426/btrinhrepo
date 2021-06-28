import React from "react";

import FriendsService from "../services/FriendsService";

import SingleFriend from "./SingleFriend";

import { NavLink } from "react-router-dom";

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
      current: 0,
      totalNumber: 1,
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
        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };

  onGetAllFriendsError = (err) => {
    console.error(err);
  };

  // onFriendClick = (e) => {
  //   console.log(e.currentTarget.dataset);
  //   console.log(e.currentTarget.dataset.fSlug);
  // };

  //   onFriendClickEdit = (friend) => {
  //     console.log(friend);
  //   };

  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`Friends-${oneFriend.id}`}>
        <SingleFriend
          friendData={oneFriend}
          onEditRequested={this.onAFriendEditClicked}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  //-----Edit Click Handler----
  onAFriendEditClicked = (friend) => {
    console.log(friend);
    let inputId = friend.id;

    this.props.history.push("/Friends/" + inputId + "/edit/");
  };

  //-----Search input w/ handler-----
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onSearchClicked = (e) => {
    e.preventDefault();
    console.log(e);
    const searchResult = this.state.formData.id;
    if (!searchResult) {
      toast.warning("Invalid search term", {
        poistion: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      FriendsService.searchFriends(searchResult)
        .then(this.onSearchFriendSuccess)
        .catch(this.onSearchFriendError);
    }
    this.props.history.push("/friends/?q=" + searchResult);
  };
  onSearchFriendSuccess = (response) => {
    console.log({ SearchedTerm: response.data.items.pagedItems });
    toast["success"]("Here is your Freind");
    this.setState((prevState) => {
      return {
        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };

  onSearchFriendError = (err) => {
    console.error({ err });
    toast["error"]("Unable to find friend");
  };

  componentDidUpdate(prevProps) {
    console.log("Previous Props", prevProps);
    console.log("Current Props", this.props);
    const searchResult = this.state.searchTerm;
    if (
      this.props.location.search === "" &&
      this.props.location.search !== prevProps.location.search
    ) {
      FriendsService.getAllFriends(0, 3)
        .then(this.onGetAllFriendsSuccess)
        .catch(this.onGetAllFriendsError);
    } else if (this.props.location.search !== prevProps.location.search) {
      console.log("Request to Return Index");
      FriendsService.searchFriends(0, 3, searchResult)
        .then(this.onSearchFriendSuccess)
        .catch(this.onSearchFriendError);
    }
  }

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Friends</h1>
        <button className="link-button navbar-brand">
          <NavLink to="/AddFriends">Add Friends</NavLink>
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
          name="q"
          type="text"
          placeholder="search friends"
          aria-label="search friends"
          onChange={this.onFormFieldChanged}
          value={this.state.title}
        />
        <div>
          <button
            className="btn btn-outline-light btn-outline-secondary"
            type="button"
            onClick={this.onSearchClicked}
          >
            Search
          </button>
        </div>
        <hr />
        <div className="row">{this.state.mappedFriends}</div>
      </div>
    );
  }
}

export default Friends;
