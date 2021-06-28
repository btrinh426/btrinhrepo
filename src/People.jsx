import React from "react";
import peopleService from "./services/peopleService";
import SingleFriend from "./SingleFriend";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import "./page.css";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

class People extends React.Component {
  state = { friends: [], friendComponents: [] };

  showFriend = () => {
    peopleService
      .getFriend(0)
      .then(this.onShowFriendsSuccess)
      .catch(this.onShowFriendsError);
  };

  onShowFriendsSuccess = (response) => {
    // console.log(response.data.item.pagedItems); //my array
    console.log(response);
    let newData = response.data.item.pagedItems;
    let totalItem = response.data.item.totalCount;
    let current = response.data.item.pageIndex;
    this.setState(() => {
      let newState = {};
      newState.current = current + 1;
      newState.friends = newData;
      newState.total = totalItem;
      newState.friendComponents = newData.map(this.mapFriend);
      return newState;
    });
  };

  onShowFriendsError = (response) => {
    console.error(response);
  };

  onDelPeople = (friend) => {
    peopleService
      .deleteFriendById(friend.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (response) => {
    console.log(response);
    toast.success("Delete Friend Successful");

    this.setState((prevState) => {
      const indexOfFriend = this.state.friends.findIndex(
        (aFriend) => aFriend.id === response
      );

      console.log(indexOfFriend);

      const updatedFriend = [...prevState.friendComponents];

      if (indexOfFriend >= 0) {
        updatedFriend.splice(indexOfFriend, 1);
      }
      updatedFriend.map(this.mapFriend);
      return {
        friendComponents: updatedFriend,
      };
    }, this.stateChanged);
  };

  onDeleteError = (response) => {
    console.log(response);
    toast.error("Delete Friend error");
  };

  editFriend = (friend) => {
    this.props.history.push("/people/edit/" + friend.id, {
      type: "EDIT_FRIEND",
      payload: { ...friend },
    });
  };

  componentDidMount() {
    this.showFriend();
  }

  searchAndGetFriendFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      return newState;
    });
  };

  searchAndGetFriend = () => {
    console.log(this.state.searchName);
    var data = this.state.searchName;
    var pageIndex = 0;
    if (data) {
      peopleService
        .searchFriend(data, pageIndex)
        .then(this.onSearchAndGetFriendSuccess)
        .catch(this.OnSearchAndGetFriendError);
    } else {
      this.showFriend();
    }
  };

  onSearchAndGetFriendSuccess = (response) => {
    console.log(response);
    let newData = response.data.item.pagedItems;
    let totalItem = response.data.item.totalCount;
    this.setState(() => {
      let newState = {};
      newState.friendComponents = newData.map(this.mapFriend);
      newState.total = totalItem;
      return newState;
    });
  };

  OnSearchAndGetFriendError = (response) => {
    console.log(response);

    toast.error("No result found");
    this.setState(() => {
      let newState = { friendComponents: [], total: 0 };

      return newState;
    });
  };
  mapFriend = (oneFriend) => {
    return (
      <SingleFriend
        key={oneFriend.id}
        friends={oneFriend}
        onDelete={this.onDelPeople}
        onEdit={this.editFriend}
      ></SingleFriend>
    );
  };
  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState.friendComponents);
  //   console.log(this.state.friendComponents);

  //   if (prevState.friendComponents !== this.state.friendComponents) {
  //     this.setState(() => {
  //       this.prevState.primaryImage = this.state.primaryImage.imageUrl;
  //       return {
  //         friendComponents: this.state.friendComponents.map(this.mapFriend),
  //       };
  //     });
  //   }
  // }

  onChange = (page) => {
    var searchInput = this.state.searchName;

    if (searchInput) {
      this.setState((prevState) => {
        var pageIndex = prevState.current;
        pageIndex = page - 1;
        peopleService
          .searchFriend(searchInput, pageIndex)
          .then(this.onSearchAndGetFriendSuccess)
          .catch(this.OnSearchAndGetFriendError);
        return { current: page };
      });
    } else {
      this.setState((prevState) => {
        var pageIndex = prevState.current;
        pageIndex = page - 1;
        peopleService
          .getFriend(pageIndex, 3)
          .then(this.onShowFriendsSuccess)
          .catch(this.onShowFriendsError);
        return { current: page };
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <h1>Friends</h1>
          <form
            className="form-inline my-2 my-lg-0"
            style={{ padding: "10px" }}
          >
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search Friend"
              aria-label="Search"
              name="searchName"
              // value={this.state.searchName}
              onChange={this.searchAndGetFriendFieldChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              value={this.state.searchName}
              onClick={this.searchAndGetFriend}

              // onChange={this.searchAndGetFriend}
            >
              Search
            </button>
            <div className="col float-right">
              <button
                className="btn btn-outline-success my-2 my-sm-0 "
                style={{ float: "right" }}
                type="button"
              >
                <NavLink to="/people/new" exact>
                  Add People
                </NavLink>
              </button>
            </div>
          </form>
        </div>
        <hr />
        <div className="container">
          <div className="row">{this.state.friendComponents}</div>
        </div>
        <div>
          <Pagination
            onChange={this.onChange}
            current={this.state.current}
            total={this.state.total}
            // pageSize={this.state.pageSize}
            pageSize={4}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default People;
