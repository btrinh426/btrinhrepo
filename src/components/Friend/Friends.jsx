import React from "react";
import SingleFriend from "./SingleFriend";
import Pagination from "rc-pagination";
import debug from "sabio-debug";

import * as friendService from "../../services/friendService";
import { NavLink } from "react-router-dom";
import "rc-pagination/assets/index.css";

import { ToastContainer, toast } from "react-toastify";
const _logger = debug.extend("FriendsPage");

class Friends extends React.Component {
  state = {
    isModalOpen: false,
    hasMadeAjax: true,
    arrayOfComp: [],
    search: "",
    currentPage: 1,
    totalFriends: 10,
    pageSize: 12,
  };

  componentDidMount() {
    // friendsService.getFriends(0, 100)
    // .then(onGetFriendsSuccess)
    // .catch(onGetFriendsError);
    friendService
      .getAll(this.state.currentPage - 1, this.state.pageSize)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  }

  onGetAllSuccess = (response) => {
    const friends = response.data.item.pagedItems;
    const totalFriends = response.data.item.totalCount;

    console.log(friends);
    _logger("called friends successfully from API!", this.state);
    this.setState((prevState) => {
      return { mappedFriends: friends.map(this.mapFriend), totalFriends };
    });
  };

  onGetAllError = (errResponse) => {
    console.warn({ error: errResponse.config });
  };

  // onFriendClick = (e) => {
  //   console.log(e.currentTarget.dataset);
  //   console.log(e.currentTarget.dataset.friendId);

  //   //data-friend-id
  //   //friendId
  // };

  // onFriendClickFull = (friend) => {
  //   console.log(friend);
  // };

  onEdit = (friend) => {
    this.props.history.push(`/friends/${friend.id}/edit`, {
      friendFormData: friend,
    });
  };

  mapFriend = (oneFriend) => {
    // var result = oneFriend.name;
    // return result;

    return (
      <React.Fragment key={`FriendId-${oneFriend.id}`}>
        <SingleFriend
          friend={oneFriend}
          onClick={this.onFriendClickFull}
          onEdit={this.onEdit}
        />
      </React.Fragment>
    );
  };

  onSearchFormFieldChanged = (e) => {
    let newValue = e.currentTarget.value;
    this.setState((prevState) => {
      return { ...prevState, search: newValue };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // axios call with this.state
    if (this.state.search === "") {
      friendService
        .getAll(this.state.currentPage - 1, this.state.pageSize)
        .then(this.onGetAllSuccess)
        .catch(this.onGetAllError);
    } else {
      friendService
        .search(
          this.state.currentPage - 1,
          this.state.pageSize,
          this.state.search
        )
        .then(this.onSearchSuccess)
        .catch(this.onSearchError);
    }
  };

  onSearchSuccess = (response) => {
    // const dataPage = response.data.item.pagedItems;

    // console.log(dataPage);

    // this.setState((prevState) => {
    //   return { mappedFriends: dataPage.map(this.mapFriend) };
    // });

    console.log({ friendsFound: response });

    // $("#targetContainer").empty();

    // renderFriends(response);

    this.setState((prevState) => {
      return {
        mappedFriends: response.map(this.mapFriend),
        totalFriends: response.length,
      };
    });
  };

  onSearchError(errResponse) {
    console.warn({ error: errResponse.config });
    toast.error("didn't find any matches, try another query", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  onPageChange = (page) => {
    console.log(page);
    this.setState(
      {
        currentPage: page,
      },
      () =>
        this.paginateFriends(this.state.currentPage - 1, this.state.pageSize)
    );
  };

  paginateFriends = (pageIndex, pageSize) => {
    friendService
      .getAll(pageIndex, pageSize)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content container">
          <div id="friends" className="mb-5">
            <div className="example ml-auto mr-auto">
              <div className="row">
                <div className="col"></div>
              </div>
              <br />
            </div>
            <div className="col-md-12 p-5">
              <div className="row">
                <div className="col">
                  <h1>Friends</h1>
                </div>
                <div className="col">
                  <NavLink style={{ marginLeft: "500px" }} to="/friends/new">
                    Add
                  </NavLink>
                </div>
              </div>
              <hr />
              {/* Search form */}
              <div className="container row">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                  <i className="fas fa-search" aria-hidden="true"></i>
                  <input
                    type="text"
                    className="form-control"
                    id="searchField"
                    placeholder="Search query"
                    name="search"
                    onChange={this.onSearchFormFieldChanged}
                    value={this.state.search}
                  />
                  <br />
                  <br />
                  {/* <button
                    type="submit"
                    className="btn btn-primary"
                    id="searchFriend"
                  >
                    Search
                  </button> */}
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Search"
                    id="searchFriend"
                  />
                </form>
              </div>
              <div style={{ marginLeft: "0px" }} className="row">
                {/* {this.state.presidents.map(this.mapFriend)} */}
                {this.state.mappedFriends}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Pagination
            onChange={this.onPageChange}
            current={this.state.currentPage}
            total={this.state.totalFriends}
            pageSize={this.state.pageSize}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
