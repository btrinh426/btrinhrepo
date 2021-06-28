import React from "react";
import * as friendsSerivce from "../services/friendsService";
import SingleFriend from "./SingleFriend2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
const queryString = require("query-string");
class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      currentPage: 1,
    };
  }

  componentDidMount() {
    console.log("componentDidMount");

    friendsSerivce
      .getAll(this.state.currentPage - 1, 10)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  }

  componentDidUpdate(prevProps, prevState) {
    let currentQry = this.props.location.search;
    let prevQry = prevProps.location.search;
    console.log("componentDidUpdate", { prevQry, currentQry });

    let prevFriendName = queryString.parse(prevQry).friendName;
    let currentFriendName = queryString.parse(currentQry).friendName;
    console.log("currentFriendName", currentFriendName);
    if (!currentQry && prevQry) {
      friendsSerivce
        .getAll(this.state.currentPage - 1, 10)
        .then(this.onGetAllSuccess)
        .catch(this.onGetAllError);
    } else if (
      prevFriendName !== currentFriendName &&
      currentFriendName !== undefined
    ) {
      friendsSerivce
        .getByName(this.state.currentPage - 1, 10, currentFriendName)
        .then(this.onGetByNameSuccess)
        .catch(this.onGetByNameError);
    } else if (currentQry === "?friendName=") {
      this.searchErrorNotify();
    }

    console.log("end of componentDidUpdate");
  }

  onGetByNameSuccess = (res) => {
    console.log("Ajax call GetByName Success", res);
    let friend = res.data.item.pagedItems;
    this.setState((prevState) => {
      let newFriend = { ...prevState.friends };
      newFriend = friend;
      let friendCompoents = newFriend.map(this.mapFriends);
      console.log("newSate after getByName", newFriend, friendCompoents);
      return { friends: newFriend, friendCompoents };
    });
  };

  onGetByNameError = (res) => {
    console.error(res);
  };
  onGetAllSuccess = (res) => {
    console.log(
      "DidMount GetAll Success before setState",
      res.data.item.pagedItems
    );
    this.setState((prevState) => {
      let newFriends = { ...prevState.friends };
      newFriends = res.data.item.pagedItems;
      let friendCompoents = newFriends.map(this.mapFriends);
      return { friends: newFriends, friendCompoents };
    });
    console.log("DidMount GetAll Success after setState", this.state);
  };

  onGetAllError = (res) => {
    console.error(res);
    this.noMoreFriendNotify();
  };

  onEditClick = (friend) => {
    console.log("update Clicked", friend.id);
    this.props.history.push(`/friends/${friend.id}/edit`, {
      type: "FriendData",
      payload: friend,
    });
  };

  onDeleteClick = (friend) => {
    console.log(friend);
    friendsSerivce
      .remove(friend.id)
      .then(this.onRemoveSuccess)
      .catch(this.onRemoveError);
  };

  noMoreFriendNotify = () => toast("No More Friends!");
  successNotify = () => toast("Deleted!");
  searchErrorNotify = () => toast("Put Name on Search Box!");
  noFriendNotify = () => toast("We don't have the friend on the list");

  onRemoveSuccess = (id) => {
    console.log(id);
    this.successNotify();
    if (id) {
      this.setState((prevState) => {
        const deletedFriendIndex = prevState.friends.findIndex((friend) => {
          return friend.id === id;
        });

        let newState = { ...prevState.friends };
        newState.splice(deletedFriendIndex, 1);
        let friendCompoents = newState.map(this.mapFriends);
        console.log(newState);
        return { friends: newState, friendCompoents };
      });
    }
  };

  onRemoveError = (res) => {
    console.error(res);
  };

  onAddFriendClick = (e) => {
    this.props.history.push("/addfriend");
  };

  onPageChange = (page) => {
    console.log(page);
    this.setState((prevState) => {
      let newPage = { ...prevState.currentPage };
      newPage = page;
      console.log(newPage);
      friendsSerivce
        .getAll(newPage - 1, 10)
        .then(this.onGetAllSuccess)
        .catch(this.onGetAllError);
      return { currentPage: newPage };
    });
  };

  mapFriends = (singleFriend) => {
    return (
      <SingleFriend
        {...this.props}
        key={`Friend-${singleFriend.id}`}
        friend={singleFriend}
        onUpdateClick={this.onEditClick}
        onDeleteClick={this.onDeleteClick}
      />
    );
  };

  render() {
    console.log("rendered");
    return (
      <div className="jumbotron">
        <div className="container">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={this.onAddFriendClick}
          >
            Add Friend
          </button>
          <div className="row">{this.state.friendCompoents}</div>
          <Pagination
            onChange={this.onPageChange}
            current={this.state.currentPage}
            total={25}
            style={{ margin: "100px" }}
          />
        </div>
      </div>
    );
  }
}

export default Friends;
