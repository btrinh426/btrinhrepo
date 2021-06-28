import React from "react";
import { NavLink } from "react-router-dom";
import * as friendService from "../services/friendsService";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "../index.css";

class Friends extends React.Component {
  state = {
    searchTerm: "",
    current: 0,
    totalNumber: 1,
    // names: ["Sora", "Sakura", "Yoshi"],
  };

  // -----Get Friend Function First Call-----
  componentDidMount = (response) => {
    friendService
      .getFriends(0, 4)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    console.log({ response });

    this.setState((preState) => {
      return {
        totalNumber: response.data.item.totalCount,
        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };
  onGetFriendsError = (err) => {
    console.log(err);
  };

  // ----- Edit Button -----
  onEditClicked = (e) => {
    e.preventDefault();
    console.log(e);
    let currentTarget = e.currentTarget;
    let inputId = currentTarget.id;

    this.props.history.push("/friends/" + inputId + "/edit/");
  };

  // ----- Delete Button -----
  onDeleteClicked = (e) => {
    let currentTarget = e.currentTarget;
    let id = currentTarget.id;
    const aFxPointer = this.onDeleteSuccessCurry(id);
    friendService
      .deleteById(id)
      .then(aFxPointer)
      .catch(this.onDeleteFriendError);
  };

  onDeleteSuccessCurry = (id) => {
    return (data) => {
      console.log(data);
      console.log(id);
      this.setState((prevState) => {
        const indexOfFriends = prevState.mappedFriends.findIndex(
          (singleFriend) => singleFriend.id === data.id
        );
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
    console.log(response);
    toast["success"]("You Deleted A Friend", "Delete Friend");
  };
  onDeleteFriendError = (err) => {
    console.error(err);
    toast["error"]("You Haven't Deleted A Friend", "Delete Friend");
  };

  // ----- Map Friend -----
  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`FriendList-${oneFriend.id}`}>
        <div className="card-friends col-md-3">
          <img
            className="card-img-top"
            src={oneFriend.primaryImage.imageUrl}
            alt="Friend Avatar"
          />
          <div className="card-body">
            <h5 className="card-title">{oneFriend.headline}</h5>
            <p className="card-text">{oneFriend.summary}</p>
            <button
              className="btn btn-secondary btn-lg"
              id={oneFriend.id}
              onClick={(e) => this.onEditClicked(e)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-lg"
              id={oneFriend.id}
              onClick={(e) => this.onDeleteClicked(e)}
            >
              Delete
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  // ----- Search Field ----
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    // console.log({ currentTarget, newValue });

    this.setState(() => {
      let newState = {};
      newState.searchTerm = newValue;
      // console.log({ newState });
      return newState;
    });
  };

  onSearchClicked = (e) => {
    e.preventDefault();
    console.log(e);
    const searchResult = this.state.searchTerm;
    this.props.history.push("/friends/?q=" + searchResult);
    friendService
      .searchByText(0, 4, searchResult)
      .then(this.searchFriendSuccess)
      .catch(this.searchFriendError);
  };
  searchFriendSuccess = (response) => {
    console.log({ SearchedTerm: response.data.item.pagedItems });
    toast["success"]("You Found Your Friend(s)", "Search Friend");
    this.setState((preState) => {
      return {
        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };
  searchFriendError = (err) => {
    console.log({ err });
    toast["error"]("You Couldn't Find Your Friend(s)", "Search Friend");
  };

  componentDidUpdate(prevProps) {
    console.log("Previous Props", prevProps);
    console.log("Current Props", this.props);
    if (this.props.location.search !== prevProps.location.search) {
      // Why won't this console log but the ajax call works?
      // console.log("Request to Return Index");
      friendService
        .getFriends(0, 4)
        .then(this.onGetFriendsSuccess)
        .catch(this.onGetFriendsError);
    }
  }

  // componentDidUpdate = (prevProps, prevState, snapshot) => {
  //    console.log("Previous State", prevState);
  //    console.log("Current State", this.state);
  //    console.log("Previous Props", prevProps);
  //    console.log("Current Props", this.props);
  //   if (
  //      this.state.searchTerm
  //      &&
  //      this.props.location.search !== prevProps.location.search
  //   ) {
  //      console.log("Request to Return to friends pageIndex 0");
  //      this.getFriendAtIndex();
  //   }
  // };

  // ----- Pagination Change Handler -----
  onChange = (page) => {
    console.log(page);
    const searchResult = this.state.searchTerm;
    this.setState((prevState) => {
      if (searchResult) {
        console.log(page - 1);
        friendService
          .searchByText(page - 1, 4, searchResult)
          .then(this.searchFriendSuccess)
          .catch(this.searchFriendError);
        return {
          current: page,
        };
      } else {
        console.log(page - 1);
        friendService
          .getFriends(page - 1, 4)
          .then(this.onGetFriendsSuccess)
          .catch(this.onGetFriendsError);
        return {
          current: page,
        };
      }
    });
    console.log(this.state.current);
  };

  render() {
    return (
      <React.Fragment>
        <div className="card-people">
          <div className="card-body">
            Friends
            <NavLink to="/friends/add/" className="add-friend-link">
              Add New Friend
            </NavLink>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                name="q"
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={this.onFormFieldChanged}
                value={this.state.searchTerm}
              />
              <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
                onClick={this.onSearchClicked}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        {this.onSearchClicked && (
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={this.onCancelClicked}
          >
            Cancel
          </button>
        )}
        <div className="friend-container">
          <div className="row">{this.state.mappedFriends}</div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <Pagination
                className="pagination"
                currentPage={1}
                defaultPageSize={4}
                onChange={this.onChange}
                current={this.state.current}
                total={this.state.totalNumber}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Friends;
