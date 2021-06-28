import React from "react";
import * as friendService from "../../services/friendsServices";
import FriendCard from "./FriendCard";
import Pagination from "rc-pagination";
import { toast } from "react-toastify";
import "rc-pagination/assets/index.css";
class Friends extends React.Component {
  state = {
    current: 1,
    pageIndex: 0,
    pageSize: 10,
    mappedFriends: [],
  };
  componentDidMount() {
    this.onLoadGetFriends();
  }
  onLoadGetFriends = () => {
    friendService
      .getAll(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    //map friends and set totalFriends in state
    let friendsArr = response.data.item.pagedItems;
    let totalCount = response.data.item.totalCount;
    this.setState(() => {
      return {
        totalCount,
        mappedFriends: friendsArr.map(this.mapFriends),
      };
    });
  };
  onGetFriendsError = (err) => {
    console.error(err);
  };

  onEditClicked = (friend) => {
    //plug friend id param in url and redirect, passing Friend
    this.props.history.push(`/friends/${friend.id}/edit`, friend);
  };

  onDeleteSuccess = (friend) => {
    this.setState((prevState) => {
      const findDeletedFriend = (
        mappedFriend //param to be passed to findIndex call. compare mappedFriend.oneFriend to passedFriend
      ) => mappedFriend.props.oneFriend === friend;
      let removedFriendIndex = prevState.mappedFriends.findIndex(
        //return index of deleted Friend in mappedFriends
        findDeletedFriend
      );
      let newState = { ...prevState };
      newState.mappedFriends.splice(removedFriendIndex, 1); //removes deletedFriend data from mappedFriends
      return newState; //return mappedFriends minus deleted friend
    });
  };
  onDeleteError = (err) => {
    console.error(err);
  };
  onAddClicked = () => {
    this.props.history.push(`/friends/add`);
  };
  onSearchClicked = () => {
    friendService
      .find(this.state.pageIndex, this.state.pageSize, this.state.searchString)
      .then(this.onGetFriendsSuccess)
      .catch(this.onSearchFail);
  };
  onSearchFail = () => {
    toast.error(`Search Returned No Results `, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  onSearchBarChanged = (e) => {
    const searchString = e.currentTarget.value;

    this.setState((prevState) => ({
      ...prevState,
      searchString,
    }));
  };
  mapFriends = (oneFriend) => {
    return (
      <FriendCard
        key={oneFriend.id}
        oneFriend={oneFriend}
        onEditClicked={this.onEditClicked}
        onDeleteClicked={this.onDeleteSuccess}
      />
    );
  };

  onPageChange = (page) => {
    //pagination controls
    friendService
      .getAll(page - 1, this.state.pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
    this.setState({
      current: page,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <nav className="navbar mt-2 ">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Find a friend..."
                    name="searchString"
                    onChange={this.onSearchBarChanged}
                  />
                  <button
                    type="button"
                    className="btn btn-success ml-2"
                    style={{ color: "#5f5f5f" }}
                    onClick={this.onSearchClicked}
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    className="btn btn-success ml-2"
                    style={{ color: "#5f5f5f" }}
                    onClick={this.onLoadGetFriends}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary ml-3"
                    style={{ color: "#5f5f5f" }}
                    onClick={this.onAddClicked}
                  >
                    Add A Friend
                  </button>
                </div>
              </nav>
            </div>
          </div>
          <div className="row">{this.state.mappedFriends}</div>
          <Pagination
            onChange={this.onPageChange}
            current={this.state.current}
            total={this.state.totalCount}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default Friends;
