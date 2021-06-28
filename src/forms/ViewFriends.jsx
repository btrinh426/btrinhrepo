import React from "react";
import * as userService from "../services/userService";
import SingleFriend from "../forms/SingleFriend";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class ViewFriends extends React.Component {
  state = {
    current: 1,
    total: 0,
    pageSize: 3,
    pageIndex: 0,
    totalPages: 0,
    searchWord: { word: "" },
  };

  onSearchFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let searchWord = { ...prevState.searchWord };

      searchWord[inputName] = newValue;

      return { searchWord };
    });

    console.log(this.state.searchWord);
  };

  onSearchButtonClicked = (e) => {
    e.preventDefault();

    userService
      .searchFriends(
        this.state.pageIndex,
        this.state.pageSize,
        this.state.searchWord
      )
      .then(this.onSearchFriendsSuccess)
      .catch(this.onSearchFriendsError);
  };

  onSearchFriendsSuccess = (response) => {
    console.log(response);
  };

  onGetFronSearchFriendsErroriendsError = (response) => {
    console.warn({ error: response });
  };

  onChange = (page) => {
    console.log(page);
    this.setState(
      {
        current: page,
        pageIndex: page - 1,
      },
      () => this.getFriendsPage(this.state.pageIndex)
    );
  };

  componentDidMount() {
    this.getFriendsPage();
  }

  getFriendsPage = () => {
    userService
      .getFriends(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    this.setState(() => {
      return {
        mappedFriends: response.data.item.pagedItems.map(this.mapFriends),
        total: response.data.item.totalCount,
        pageSize: response.data.item.pageSize,
        pageIndex: response.data.item.pageIndex,
        totalPages: response.data.item.totalPages,
      };
    });

    console.log(response.data.item);
  };

  onGetFriendsError = (response) => {
    console.warn({ error: response });
  };

  deleteButtonClicked = (friendId) => {
    userService
      .deleteFriend(friendId)
      .then(this.onDeleteButtonClickedSuccess)
      .catch(this.onDeleteButtonClickedError);
  };

  onDeleteButtonClickedSuccess = () => {
    this.getFriendsPage();
  };

  onDeleteButtonClickedError = (response) => {
    console.warn({ error: response });
  };

  mapFriends = (oneFriend) => {
    return (
      <React.Fragment key={`Friend-${oneFriend.id}`}>
        <SingleFriend friend={oneFriend} onClick={this.deleteButtonClicked} />
      </React.Fragment>
    );
  };

  render() {
    let titleStyle = {
      marginRight: "1px",
      marginLeft: "630px",
      marginTop: "10px",
    };

    let styles = {
      marginRight: "520px",
      marginLeft: "100px",
    };
    return (
      <React.Fragment>
        <div style={titleStyle}>
          <h1 style={{ padding: 20 }}>Your Friends!</h1>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search for your Friends!"
              aria-label="Search"
              onChange={this.onSearchFieldChange}
            />
            <button className="btn btn-primary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <Pagination
            style={{ marginTop: 20 }}
            onChange={this.onChange}
            current={this.state.current}
            total={this.state.total}
            pageSize={this.state.pageSize}
          ></Pagination>
        </div>
        <div className="col-md-12 p-5" style={styles}>
          <div className="row">{this.state.mappedFriends}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewFriends;
