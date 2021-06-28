import React from "react";
import axios from "axios";
import * as userServices from "./services/userServices";

import SingleFriend from "./SingleFriend";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import { render } from "react-dom";

class Friends extends React.Component {
  state = {
    mappedFriends: [],
    current: 0,
    pageIndex: 0,
    pageSize: 4,
    total: 0,
    // sortValue: "",
    // inputValue: "",
  };
  componentDidMount = () => {
    this.onPageNumber(this.state.pageIndex, this.state.pageSize);

    // let id = this.props.match.params.id;

    // console.log({ id });
  };
  onPageNumber = (pageIndex, pageSize) => {
    userServices
      .getFriends(pageIndex, pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };
  onChange = (page) => {
    console.log(page);

    this.setState(
      () => {
        return {
          current: page - 1,
        };
      },
      () => {
        this.onPageNumber(this.state.current, this.state.pageSize);
      }
    );

    // userServices
    //   .getFriends(pageIndex, pageSize)
    //   .then(this.onGetFriendsSuccess)
    //   .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    let friends = response.data.item.pagedItems;
    // let pageSize = response.data.item.pageSize;
    // let pageIndex = response.data.item.pageIndex;

    this.setState(() => {
      return {
        mappedFriends: friends.map(this.mapSingleFriend),
        current: this.state.pageIndex,
        total: response.data.item.totalCount,
      };
    });
  };
  mapSingleFriend = (aFriend) => {
    // console.log(aFriend);
    return (
      <SingleFriend
        friend={aFriend}
        key={`Friends-${aFriend.id}`}
        editFriend={this.onEditClick}
        deleteFriend={this.onDeleteClick}
        friends={this.searchFriends}
      />
    );
  };

  onGetFriendsError = () => {};

  onEditClick = (response) => {
    console.log(response);
    let currentFriend = response;

    this.props.history.push(`/friends/${currentFriend.id}/edit`, {
      type: "Edit_Friend",
      payload: currentFriend,
    });
  };

  onDeleteClick = (aFriend) => {
    // e.preventDefault();

    userServices
      .deleteFriend(aFriend)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onDeleteFriendSuccess = (aFriend) => {
    console.log(aFriend);
    this.setState((prevState) => {
      const indexOfFriends = prevState.mappedFriends.findIndex(
        (singleStoge) => singleStoge.id === aFriend.id
      );
      const updatedFriends = [...prevState.mappedFriends];

      if (indexOfFriends >= 0) {
        updatedFriends.splice(indexOfFriends, 1);
      }

      return {
        mappedFriends: updatedFriends,
      };
    }, this.stateChanged);
  };
  onDeleteFriendError = () => {};

  onSearchFriends = (e) => {
    console.log(e.currentTarget);
    let currentTarget = e.currentTarget;
    let inputValue = currentTarget.value;
    let inputSort = currentTarget.name;

    this.setState(() => {
      let searchedFriends = { ...this.state.mappedFriends };

      searchedFriends[inputSort] = inputValue;

      return { searchedFriends };
    });
  };
  onSearchClick = (pageIndex, pageSize, title) => {
    userServices
      .searchFriends(pageIndex, pageSize, title)
      .then(this.onSearchFriendSuccess)
      .catch(this.onSearchFriendError);
  };
  onSearchFriendSuccess = (response) => {
    console.log(response);

    this.setState(() => {
      return {
        filteredFriends: response.filter(),
      };
    });
  };

  onSearchFriendError = () => {};

  render() {
    // const filteredFriends =
    // this.state.mappedFriends.filter(afriend => {
    //   return afriend.title.
    // })

    return (
      <React.Fragment>
        <Pagination
          onChange={this.onChange}
          current={this.state.current}
          total={this.state.total}
          pageSize={this.state.pageSize}
          locale={localeInfo}
        />
        <div>
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  name="title"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.onSearchFriends}
                  value={this.state.mappedFriends.title}
                />
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={this.onSearchClick}
                >
                  Search
                </button>
              </form>
            </div>
          </nav>
        </div>
        <div>
          <h1>Friends</h1>
        </div>
        <div>
          {/* //ReactDOM.render(<Pagination />, container); */}

          <div>{this.state.mappedFriends}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
