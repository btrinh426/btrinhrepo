import React from "react";
import * as userService from "../services/userService";
import SingleFriend from "./SingleFriend";
import AddFriend from "./AddFriend";

import { BrowserRouter, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Friends extends React.Component {
  state = {
    friends: [],
  };
  componentDidMount() {
    console.log("Friends mounted");

    userService
      .getFriends()
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  }

  onGetFriendsSuccess = (response) => {
    console.log("gotcah' friends");
    console.log(response.data.item.pagedItems);
    let myFriends = response.data.item.pagedItems;

    this.setState((preState) => {
      return { mappedFriends: myFriends.map(this.mapFriend) };
    });
  };

  onGetFriendsError = (errResponse) => {
    console.log("no friends");
  };
  onFriendDeleteClick = (friend) => {
    console.log(friend);
  };
  onEditClick = (friend) => {
    console.log("edit" + friend.title);
  };

  mapFriend = (friend) => {
    return (
      <React.Fragment key={friend.id}>
        <SingleFriend
          oneFriend={friend}
          onClick={this.onFriendDeleteClick}
          onEditClick={this.onEditClick}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  onOpenAddFriend = (e) => {
    e.preventDefault();
    console.log("addFriend clciekd!");
    this.props.history.push("/friends/addFriend");
  };

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div className="bg-blk-box">
            <h1>FriendBook</h1>
            <form className="container d-flex">
              <button
                type="submit"
                id="openAddFriend"
                className="btn btn-primary"
                onClick={this.onOpenAddFriend}
              >
                Add New Friend
              </button>
              <input
                className="form-control me-2"
                style={{ width: "50%" }}
                id="searchInput"
                type="search"
                placeholder="Search your friends"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                id="searchFriends"
                type="submit"
              >
                Search
              </button>
              <button
                className="btn btn-outline-success"
                id="searchClear"
                type="submit"
              >
                Clear Search
              </button>
            </form>
            <div className="container col-md-6">
              <Route
                path="/friends/addFriend"
                exact={true}
                component={AddFriend}
              />
            </div>
          </div>
          <div className="test4 col">
            <h1>Look at all your friends!</h1>

            <div className="row pb-5 col-md-12 friend-container">
              {this.state.mappedFriends}
            </div>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default withRouter(Friends);
