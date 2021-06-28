import React from "react";
import FriendsService from "../services/friendsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import FriendCard from "./FriendCards";
import { NavLink } from "react-router-dom";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class FriendsDisplay extends React.Component {
  state = {
    searchQuery: "",
    friendCardsGroup: "",
    currentPage: 1,
    totalRecords: "",
    pageSize: 6,
  };

  isSearch = false;

  componentDidMount() {
    this.getAllFriends();
  }

  getAllFriends = () => {
    FriendsService.getAllFriends(0, this.state.pageSize)
      .then(this.renderFriends)
      .catch(this.onGetAllFriendsFail);
  };

  renderFriends = (response) => {
    console.log(response.data);
    this.setState(() => {
      return {
        friendCardsGroup: response.data.item.pagedItems.map(this.mapFriends),
        totalRecords: response.data.item.totalCount,
        pageSize: response.data.item.pageSize,
        currentPage: response.data.item.pageIndex + 1,
      };
    });
  };

  onGetAllFriendsFail = (error) => {
    console.log(error.response);
  };

  mapFriends = (individualfriendObj) => {
    return (
      <div
        className="card m-3"
        style={{ width: "22rem" }}
        key={individualfriendObj.id}
      >
        <FriendCard
          friend={individualfriendObj}
          {...this.props}
          updateFriendsView={this.getAllFriends}
        ></FriendCard>
      </div>
    );
  };

  setSearchQuery = (e) => {
    let newVal = e.currentTarget.value;
    let newState = { ...this.state };
    this.setState(() => {
      newState.searchQuery = newVal;
      return newState;
    });
  };

  searchFriends = () => {
    if (this.state.searchQuery.length > 0) {
      this.isSearch = true;
      FriendsService.searchFriendsByName(
        0,
        this.state.pageSize,
        this.state.searchQuery
      )
        .then(this.renderFriends)
        .catch(this.searchError);
    } else {
      this.isSearch = false;
      this.getAllFriends();
    }
  };

  searchError = (error) => {
    //console.log("search error");
    let searchErrorMessage = (
      <div className="row d-flex bg-light ml-auto mr-auto mt-4 mb-4">
        <p className="m-auto mt-4 mb-4 text-center">No results found</p>
      </div>
    );
    let newState = { ...this.state };
    this.setState(() => {
      newState.friendCardsGroup = searchErrorMessage;
      newState.totalRecords = 0;
      return newState;
    });
  };

  onChange = (page) => {
    console.log(page);
    let indexPage = page - 1;
    if (!this.isSearch) {
      this.isSearch = false;
      FriendsService.getAllFriends(indexPage, this.state.pageSize).then(
        this.renderFriends
      );
    } else {
      this.isSearch = true;
      FriendsService.searchFriendsByName(
        indexPage,
        this.state.pageSize,
        this.state.searchQuery
      )
        .then(this.renderFriends)
        .catch(this.searchError);
    }
  };

  render() {
    return (
      <div className="row mt-3 ml-3">
        <div className="col-9 bg-white border pb-3">
          <div className="flex-row d-flex justify-content-end pt-3">
            <NavLink to="/main/friends/add" className="btn btn-primary">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Add Friend
            </NavLink>
          </div>
          <div className="flex-row d-flex justify-content-between pt-4 border-bottom">
            <h6 className="mb-3 mt-2 ml-3" id="friendCounter">
              {this.state.totalRecords} Friends Found
            </h6>

            <div
              className="input-group input-group-sm mb-3 mt-2"
              style={{ width: "250px" }}
            >
              <input
                type="text"
                className="form-control"
                value={this.state.searchQuery}
                onChange={this.setSearchQuery}
              />
              <div className="input-group-append" style={{ cursor: "pointer" }}>
                <span className="input-group-text" onClick={this.searchFriends}>
                  Search
                </span>
              </div>
            </div>
          </div>
          {/* Cards Section Start */}
          <div className="row d-flex bg-light mr-1 ml-1">
            {this.state.friendCardsGroup}
          </div>
          <div className="flex-row d-flex justify-content-center pt-4">
            {
              <Pagination
                onChange={this.onChange}
                current={this.state.currentPage}
                total={this.state.totalRecords}
                pageSize={this.state.pageSize}
              ></Pagination>
            }
          </div>
          {/* Cards Section End */}
        </div>
      </div>
    );
  }
}

export default FriendsDisplay;
