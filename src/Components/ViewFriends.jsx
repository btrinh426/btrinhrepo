import React from "react";
import * as friendService from "../services/friendService";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Friend from "./Friend";
import { toast } from "react-toastify";

class ViewFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mappedFriends: [],
      pageInfo: { pageIndex: 0, pageSize: 3, totalCount: 0, totalPages: 0 },
      searchField: "",
    };
  }

  onSearchFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState(() => {
      let searchField = newValue;
      return { searchField };
    });
  };

  componentDidMount() {
    this.requestFriends(0);
  }

  onEditClick = (person, event) => {
    console.log(person);
    this.props.history.push(`/friends/${person.id}/edit`);
  };

  requestFriends = (idx) => {
    friendService
      .paginatedFriendList(idx, this.state.pageInfo.pageSize)
      .then(this.onSearchSuccess)
      .catch(this.onListError);
  };

  // onListSuccess = (response) => {
  //   console.log({ goodList: response });
  //   this.setState(() => {
  //     return {
  //       mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
  //       pageInfo: {
  //         pageIndex: response.data.item.pageIndex,
  //         pageSize: response.data.item.pageSize,
  //         totalCount: response.data.item.totalCount,
  //         totalPages: response.data.item.totalPages,
  //       },
  //     };
  //   }, console.log("it is done", this.state.listOfFriends));
  // };

  onDeleteRequest = (id) => {
    console.log("onDelete request", id);
    friendService
      .deleteRecordWithId(id)
      .then(this.onDeleteReqSuccess(id)) // this passes the id to the onSuccess function
      .catch(this.onDeleteReqError);
  };

  onDeleteReqSuccess = (idDelete) => {
    //this response is now the id that was passed from the onDelete function
    console.log({ deleteGood: idDelete });
    toast.success("Friend Deleted Successfully.");
    this.setState((prevState) => {
      // console.log(prevState.mappedFriends);
      //find index of person in array that matches the id passed to the success handler
      const indexOfPerson = prevState.mappedFriends.findIndex(
        (person) => person.props.friend.id === idDelete
      );

      let copyData = [...prevState.mappedFriends];

      if (indexOfPerson >= 0) {
        copyData.splice(indexOfPerson, 1); //removes the data at that index
      }

      return {
        mappedFriends: copyData,
      };
    });
  };

  onDeleteReqError = (response) => {
    console.log({ deleteError: response });
    toast.error("Something went wrong. Please try again.");
  };

  mapFriend = (friend) => (
    <Friend
      key={friend.id}
      friend={friend}
      selectFriend={this.onEditClick}
      delFriend={this.onDeleteRequest}
    />
  );

  onListError = (response) => {
    console.log({ badList: response });
  };

  onChange = (page) => {
    console.log(page);
    let idx = page - 1;

    if (this.state.searchField) {
      console.log("yes");
      friendService
        .searchForFriend(
          idx,
          this.state.pageInfo.pageSize,
          this.state.searchField
        )
        .then(this.onSearchSuccess)
        .catch(this.onSearchError);
    } else {
      this.requestFriends(idx);
    }
  };

  ///   /friends/     /friends/new     /friends/:id/edit

  addFriendClick = (e) => {
    this.props.history.push("/friends/new");
  };

  onSearchClick = (e) => {
    console.log("search was clicked", e.currentTarget);
    friendService
      .searchForFriend(0, this.state.pageInfo.pageSize, this.state.searchField)
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };

  onSearchSuccess = (response) => {
    console.log({ good: response.data.item.pagedItems });
    console.log({ good: response.data.item });
    let searchResults = response.data.item.pagedItems;
    let paginationResults = {
      pageIndex: response.data.item.pageIndex,
      pageSize: response.data.item.pageSize,
      totalCount: response.data.item.totalCount,
      totalPages: response.data.item.totalPages,
    };
    // let mappedSearch = searchResults.map(this.mapFriend)
    this.setState(() => {
      return {
        mappedFriends: searchResults.map(this.mapFriend),
        pageInfo: paginationResults,
      };
    });
  };

  onSearchError = (response) => {
    console.log({ error: response });
    toast.error("Something went wrong. Please try again.");
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-6">
            <button
              className="btn-secondary btn-lg"
              onClick={this.addFriendClick}
            >
              Add Friend
            </button>
          </div>
        </div>
        <div>
          <h1>Friends list</h1>
          <div className="col-sm-8">
            <input
              type="search"
              className="form-control ds-input"
              name="search-input"
              placeholder="Name..."
              value={this.state.searchField}
              onChange={this.onSearchFieldChange}
            ></input>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={this.onSearchClick}
            >
              Search
            </button>
          </div>
        </div>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-md-12">
            <div className="row">{this.state.mappedFriends}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            {" "}
            <Pagination
              current={this.state.pageInfo.pageIndex + 1}
              total={this.state.pageInfo.totalCount}
              pageSize={this.state.pageInfo.pageSize}
              onChange={this.onChange}
            />
          </div>
          <div className="col-md-3"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewFriends;
