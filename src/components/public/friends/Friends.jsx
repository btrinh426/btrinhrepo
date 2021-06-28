import React from "react";
import { NavLink } from "react-router-dom"; // NavLink
import * as friendsService from "../../../services/friendsService";
import Pagination from "rc-pagination";
import AFriend from "./AFriend";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1, // PAGINATION
      pageSize: 9, // PAGINATION
      totalCount: 0, // PAGINATION

      isSearching: false,
      // friendList: [], // XXX  stored in App
      // mappedFriendsList: [], // generated and stored here
      searchFormData: {
        searchValue: "Search Names",
      },
      searchMsg: "Nothing Found",
      noPictureReference:
        "https://cdn.pixabay.com/photo/2015/03/01/16/53/puzzle-654963_960_720.jpg",
    };
  }

  componentDidMount() {
    console.log("... Friends > componentDidMount firing ...");

    this.getFriendsByPage(this.state.current);
  }

  onPageChange = (page) => {
    console.log("Getting this page: ", page);

    // call API, on success
    if (this.state.isSearching) {
      this.searchFriends(page);
    } else {
      this.getFriendsByPage(page);
    }

    this.setState((prevState) => {
      return { ...prevState, current: page };
    });
  };

  getFriendsByPage = (newPage) => {
    friendsService
      .getByPage(newPage - 1, this.state.pageSize)
      .then(this.onGetSuccess)
      .catch(this.onGetError);
  };

  onGetSuccess = (data) => {
    console.log("... Friends > onGetSuccess firing ...", data);

    let friendList = data.item.pagedItems;
    this.props.onFriendListChange(friendList);

    this.setState((prevState) => {
      return {
        ...prevState,
        mappedFriendsList: friendList.map(this.mapFriend),
        totalCount: data.item.totalCount,
      };
    });
  };
  onGetError = (err) => {
    console.log("... Friends > onGetSuccess firing ...", { err });
    toast.error("Unable to load friends at this time");
  };

  onFrndDeleteClick = (friend) => {
    console.log("... Friends > onFrndDeleteClick firing ...", friend);

    Swal.fire({
      title: "Are you sure?",
      text: "Friend will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.value) {
        console.log(" >>>  deleting friend");
        friendsService
          .deleteFriend(friend.id)
          .then(this.onFrndDeleteSuccess)
          .catch(this.onFrndDeleteError);
        // this.removeFriend(friend.id); // TEMP XXX Bypassing to test removing friend from list
      }
    });
  };

  onFrndDeleteSuccess = (data) => {
    // XXX
    console.log("... Friends > onFrnDeleteSuccess firing ...", data);
    debugger;
    this.removeFriend(data);
    toast.success("Friend Deleted", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  onFrndDeleteError = (friend) => {
    // XXX
    console.log("... Friends > onFrndDeleteError firing ...", friend);

    toast.error("Unable to Delete Friend", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  removeFriend = (friendId) => {
    this.setState((prevState) => {
      // console.log({ prevState });

      const indexOfFrnd = this.props.friendList.findIndex(
        (aPerson) => aPerson.id === friendId
      );
      const updatedFriendList = [...this.props.friendList];

      if (indexOfFrnd >= 0) {
        updatedFriendList.splice(indexOfFrnd, 1);
      }

      this.props.onFriendListChange(updatedFriendList);

      // debugger;
      // debugger triggers
      //Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.
      return {
        ...prevState,
        // friendList: updatedFriendList,
        mappedFriendsList: updatedFriendList.map(this.mapFriend),
      };
    }, this.stateChanged);

    console.log(this.state);
    // debugger;
  };

  onFrndEditClick = (singleFriend) => {
    console.log("... Friends > onFrndEditClick firing ...", singleFriend);
    this.props.history.push(`/friends/${singleFriend.id}/edit`, singleFriend);
  };

  mapFriend = (oneFriend) => {
    if (
      oneFriend.primaryImage !== null &&
      oneFriend.primaryImage.imageUrl !== null
    ) {
      oneFriend.primaryImage = oneFriend.primaryImage.imageUrl;
    } else {
      oneFriend.primaryImage = this.state.noPictureReference;
    }
    if (oneFriend.skills) {
      oneFriend.skillsStrg = this.convertSkillsToOneString(oneFriend.skills);
    }

    return (
      <React.Fragment key={`frnd-${oneFriend.id}`}>
        <AFriend
          friend={oneFriend}
          onDelClick={this.onFrndDeleteClick}
          onEditClick={this.onFrndEditClick}
        />
      </React.Fragment>
    );
  };

  skillRemapper = (skillObj) => {
    let skillsList = [];

    skillObj.forEach((item) => {
      skillsList.push(item.name);
    });
    return skillsList;
  };

  convertSkillsToOneString = (skills) => {
    let result = "";

    for (let index = 0; index < skills.length; index++) {
      const currentSkill = skills[index].name;
      result += currentSkill + ", ";
    }
    result = result.slice(0, -2);
    return result;
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log(newValue, currentTarget);

    this.setState(() => {
      let searchFormData = { ...this.state.searchFormData };
      searchFormData[inputName] = newValue;

      // console.log("newState ", currentFriend);
      return { searchFormData };
    });
  };

  // --------------------------- SEARCH ------------------------------------------

  onSearchClicked = (e) => {
    // XXX FIX THIS FOR PAGINATION
    let searchText = this.state.searchFormData.searchValue;
    console.log("... Friends > onSearchClicked firing ...", searchText);

    if (!this.state.isSearching) {
      this.setState((prevState) => {
        return { isSearching: true };
      });
    }

    this.searchFriends(1);
  };

  searchFriends = (page) => {
    friendsService
      .searchNames(
        page - 1,
        this.state.pageSize,
        this.state.searchFormData.searchValue
      )
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };

  onSearchSuccess = (data) => {
    console.log("... Friends > onSearchSuccess firing ...", data);
    const isFound = true;
    // debugger;
    const foundItems = data.item;
    this.displaySearchResults(isFound, foundItems);
  };
  onSearchError = (err) => {
    console.error("... Friends > onSearchError firing ...", err);
    // debugger;
    if (err.response && err.response.status) {
      const status = err.response.status;
      if (status === 404) {
        const statusText = err.response.statusText;
        const errorResult = { status, statusText };
        this.displaySearchResults(false, errorResult);
      } else {
        toast.error("You search request did not process correctly");
      }
    }
  };

  displaySearchResults = (isFound, pagedData) => {
    console.log(
      "... Friends > displaySearchResults firing ...",
      pagedData,
      isFound
    );
    const searchValue = this.state.searchValue;
    let totalCount = 0;

    let searchMsg = `Displaying results for: "${searchValue}" `;
    let friendList = [];

    if (!isFound) {
      searchMsg = searchMsg + " No results found. ";
    } else {
      friendList = pagedData.pagedItems;
      totalCount = pagedData.totalCount;

      searchMsg = searchMsg + ` ${totalCount} results found.`;
    }

    this.props.onFriendListChange(friendList);

    this.setState((prevState) => {
      return {
        ...prevState,
        searchMsg,
        totalCount,
        mappedFriendsList: friendList.map(this.mapFriend),
      };
    });
  };

  onCancelClicked = (e) => {
    console.log("... Friends > onCancelClicked firing ...", e);
    this.setState((prevState) => {
      const searchFormData = prevState.searchFormData;
      searchFormData.searchValue = "";
      return { ...prevState, current: 1, isSearching: false, searchFormData };
    });
    this.getFriendsByPage(1);
  };
  // ------------------------------------- RENDER ---------------------------------
  render() {
    return (
      <>
        <div className="container mb-3">
          <div className="card mt-4 col-12 " id="cardFriends">
            <div className="card-body">
              <div className="row">
                <div className="col-3">
                  <strong>Friends</strong>
                </div>
                <div className="col-3">
                  <NavLink to="/friends/0/add">
                    <button
                      type="button"
                      className="btn btn-dark"
                      id="btnShowAddFriendForm"
                    >
                      Add Friend
                    </button>
                  </NavLink>
                </div>

                <div className="col-6 ">
                  <form id="formFrndSearch" className="form-inline">
                    <label className="sr-only" htmlFor="inputFrndSearch">
                      Search
                    </label>
                    <input
                      type="input"
                      className="form-control"
                      id="inputFrndSearch"
                      name="searchValue"
                      value={this.state.searchFormData.searchValue}
                      onChange={this.onFormFieldChanged}
                      placeholder="Search Names"
                    />
                    <button
                      type="button"
                      className="btn btn-dark"
                      id="btnFrndSearch"
                      onClick={this.onSearchClicked}
                    >
                      Go
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      id="btnFrndSearchClose"
                      onClick={this.onCancelClicked}
                      hidden={!this.state.isSearching}
                    >
                      X
                    </button>
                  </form>
                </div>
              </div>
              <div className="row" hidden={!this.state.isSearching}>
                <div className="col-12 mt-3">
                  <h3 value={this.state.searchMsg}>Search message result</h3>
                </div>
              </div>
              {/* ------------------------------- PAGINATION */}
              <div className="row">
                <div className="col-12 mt-3">
                  <Pagination
                    pageSize={this.state.pageSize}
                    onChange={this.onPageChange}
                    current={this.state.current}
                    total={this.state.totalCount}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ---------------------------------- MAPPED FRIENDS */}
        <div className="container">
          <div className="row" name="friendtarget">
            {this.state.mappedFriendsList}
          </div>
        </div>
      </>
    );
  }
}

export default Friends;

// use the id feature to hide or show the edit form
// conditional render the add friend button and search bar
// always render all current friends
// Remove searchbar from sabio navbar
