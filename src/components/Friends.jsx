import React from "react";
import { getFriends, searchFriends } from "../services/friendsService";
import { NavLink } from "react-router-dom";
import SingleFriend from "./SingleFriend";
import debug from "sabio-debug";
const _logger = debug.extend("App");

class Friends extends React.Component {
  state = {
    friends: [
      {
        id: "",
        bio: "",
        title: "",
        headline: "",
        summary: "",
        slug: "",
        primaryImage: "",
        statusId: "",
      },
    ],
    searchData: { searchTerm: "" },
    searchButtonClicked: false,
  };

  componentDidMount() {
    getFriends().then(this.onGetFriendsSuccess).catch(this.onGetFriendsError);
  }
  onGetFriendsSuccess = (response) => {
    _logger("Get friends Success: ", response.data.item.pagedItems);
    let friends = response.data.item.pagedItems;
    this.setState((preState) => {
      return { mappedFriends: friends.map(this.mapFriend), friends };
    });
  };
  onGetFriendsError = (response) => {
    _logger("Get friends Error: ", response);
  };

  mapFriend = (friend) => {
    return (
      <React.Fragment key={`Friends-${friend.id}`}>
        <SingleFriend
          friend={friend}
          onClick={this.onFriendClick}
        ></SingleFriend>
      </React.Fragment>
    );
  };
  onSearchFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let searchData = { ...this.state.searchData };
      searchData[inputName] = newValue;
      return { searchData };
    });
  };

  onFriendClick = (frnd) => {
    _logger("Friend button clicked: ", frnd);
    _logger("friend.btn :", frnd.btn);
  };

  whichFriendButton = (fnd) => {
    _logger("friend.btn :", fnd.btn);
  };

  onSearchClick = (e) => {
    e.preventDefault();
    //const searchQuery = this.state.searchData.searchTerm;
    _logger("searchQuery:", this.state.searchData.searchTerm);
    searchFriends(this.state.searchData.searchTerm)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);

    this.setState(
      (prevState) => {
        let newState = {
          ...this.state.searchButtonClicked,
          searchButtonClicked: true,
        };
        _logger("searchButtonClicked :");
        return newState;
      },
      () => _logger("state", this.state)
    );
  };

  revealAll = (e) => {
    e.preventDefault();
    getFriends()
      .then(this.onGetFriendsSuccess)
      .then(this.resetSearch)
      .catch(this.onGetFriendsError);
  };

  //clears search input + sets searchButtonClicked to false.
  resetSearch = () => {
    this.setState((preState) => {
      let newState = { ...preState };
      newState.searchButtonClicked = false;
      newState.searchData.searchTerm = ""; //but does not reset search box?
      return newState;
    });
  };

  render() {
    //if (this.state.searchButtonClicked)
    return this.state.searchButtonClicked ? (
      <div className="col-md-12 p-5">
        <h1>Friends</h1>
        <div className="col-md-12 p-5">
          <div className="row">
            <NavLink to="/friends/createfriend">
              <button type="button" className="btn btn-primary mr-1">
                Add Friend
              </button>
            </NavLink>
            <div className="row">
              <div className="col-lg-12">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search for..."
                    id="searchTerm"
                    name="searchTerm"
                    onChange={this.onSearchFieldChange}
                    value={this.state.searchTerm}
                  />
                  <span className="input-group-btn btn-primary">
                    <button
                      className="btn btn-default border"
                      type="button"
                      onClick={this.onSearchClick}
                    >
                      Go!
                    </button>
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary revealAll mr-1"
                name="revealAll"
                onClick={this.revealAll}
              >
                Reveal All
              </button>

              {/*<RevealAll />*/}
              {/*this should change on state.searchButtonClicked*/}
            </div>
          </div>
          <hr />
          <div className="row">{this.state.mappedFriends}</div>
        </div>
      </div>
    ) : (
      <div className="col-md-12 p-5">
        <h1>Friends</h1>
        <div className="col-md-12 p-5">
          <div className="row">
            <NavLink to="/friends/createfriend">
              <button type="button" className="btn btn-primary mr-1">
                Add Friend
              </button>
            </NavLink>
            <div className="row">
              <div className="col-lg-12">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search for..."
                    id="searchTerm"
                    name="searchTerm"
                    onChange={this.onSearchFieldChange}
                    value={this.state.searchTerm}
                  />
                  <span className="input-group-btn btn-primary">
                    <button
                      className="btn btn-default border"
                      type="button"
                      onClick={this.onSearchClick}
                    >
                      Go!
                    </button>
                  </span>
                </div>
              </div>
              {/*<RevealAll />*/}
              {/*this should change on state.searchButtonClicked*/}
            </div>
          </div>
          <hr />
          <div className="row">{this.state.mappedFriends}</div>
        </div>
      </div>
    );
  }
}

export default Friends;
