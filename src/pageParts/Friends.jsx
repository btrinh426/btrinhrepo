import React from "react";
import * as friendService from "../services/friendService";
//import AddFriend from "./AddFriend";
import SingleFriend from "./SingleFriend";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class Friends extends React.Component {
  state = {
    friends: [],
    searching: "Search your Frands",
    isAnEdit: false,
    searchResults: [],
    searchActive: false,
    isAddFriend: false,
    index: 0,
    size: 4,
    total: 6,
  };

  loadFriends = () => {
    console.log(this.state.index);
    friendService
      .getFriends(this.state.index, this.state.size)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  componentDidMount() {
    console.log("Friends mounted");

    this.loadFriends();
  }

  onChange = (page) => {
    console.log(page);

    const newPage = page - 1;
    this.setState({ index: newPage }, this.loadFriends);
  };

  onGetFriendsSuccess = (response) => {
    console.log(response.data.item.pagedItems);
    console.log(response.data.item);
    let myFriends = response.data.item.pagedItems;
    let totalCount = response.data.item.totalCount;

    this.setState((prevState) => {
      return {
        prevState,
        friends: myFriends.map(this.mapFriend),
        total: totalCount,
      };
    });
  };

  onGetFriendsError = (errResponse) => {
    console.log("no friends");
  };
  onFriendDeleteClick = (friend) => {
    friendService
      .deleteFriend(friend.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (response) => {
    console.log("An ally has been slain");
    //console.log(response);
    let badId = String(response);
    let currentFriends = this.state.friends;
    console.log(currentFriends);

    this.setState((prevState) => {
      let indexOfFriend = prevState.friends.findIndex(
        (friend) => friend.key === badId
      );
      let updatedFriends = [...prevState.friends];
      if (indexOfFriend >= 0) {
        updatedFriends.splice(indexOfFriend, 1);
      }
      return { friends: updatedFriends };
    });
  };
  onDeleteError = (response) => {
    console.log("that didnt work");
  };

  onEditClick = (friend) => {
    console.log("editing: " + friend.id);
    this.props.history.push("/friends/edit", friend);
    // this.setState({ isAddFriend: true, isAnEdit: true });
  };

  mapFriend = (friend) => {
    return (
      <React.Fragment key={friend.id}>
        <SingleFriend
          oneFriend={friend}
          onClick={this.onFriendDeleteClick}
          onEditClick={this.onEditClick}
        />
      </React.Fragment>
    );
  };

  onOpenAddFriend = (e) => {
    // e.preventDefault();
    console.log("addFriend clciekd!");
    this.props.history.push("/friends/add");
  };
  onSuccessfullAdd = (e) => {
    console.log("in on successfull add in main friends component");
    this.props.history.push("/friends");
  };

  onSearchFriend = (e) => {
    e.preventDefault();
    console.log("search friends pressed");
    let search = this.state.searching;

    friendService
      .searchFriends(search, 0, 4)
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };

  onSearchSuccess = (response) => {
    console.log("search completed");
    console.log(response.data.item.pagedItems);
    let myFriends = response.data.item.pagedItems;

    this.setState((prevState) => {
      return {
        prevState,
        friends: myFriends.map(this.mapFriend),
        searchActive: true,
      };
    });
  };

  onSearchError = (response) => {
    console.log("Search fail");
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    //let inputName = currentTarget.name;

    console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = { ...this.state.searching };
      newState = newValue;
      //newState.firstName = newValue;
      //console.log({ newState });
      return { searching: newState };
    });
  };

  onClearSearch = (e) => {
    e.preventDefault();
    console.log("clearing search");
    console.log(this.state.prevState.friends);
    let oldfriends = this.state.prevState.friends;

    this.setState((prevState) => {
      return { prevState, friends: oldfriends };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="bg-blk-box">
          <h1>FriendBook</h1>
          <form className="container d-flex">
            <button
              type="button"
              id="openAddFriend"
              className="btn btn-primary"
              onClick={this.onOpenAddFriend}
            >
              Add New Friend
            </button>
            <input
              className="form-control me-2"
              style={{ width: "50%" }}
              name="searching"
              type="search"
              placeholder="Search your friends"
              aria-label="Search"
              onChange={this.onFormFieldChanged}
              value={this.state.searching}
            />
            <button
              className="btn btn-secondary"
              name="searchFriends"
              type="submit"
              onClick={this.onSearchFriend}
            >
              Search
            </button>
            <button
              className="btn btn-outline-success"
              id="searchClear"
              type="submit"
              onClick={this.onClearSearch}
            >
              Clear Search
            </button>
          </form>
        </div>
        <div className="test4 col">
          <h1>Look at all your friends!</h1>
          <Pagination
            onChange={this.onChange}
            // current={this.state.current}
            pageSize={this.state.size}
            total={this.state.total}
          />
          <div className="row pb-5 col-md-12 friend-container">
            {this.state.friends}
          </div>
        </div>
        {/* </React.Fragment>
        )} */}
      </React.Fragment>
    );
  }
}

export default Friends;
