import React from "react";
import * as friendServices from "./../../services/friendServices";

export default class FriendsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: "",
    };
  }

  searchHandler = (e) => {
    let currentTarget = e.currentTarget;
    let searchQuery = currentTarget.value;

    this.setState((prevState) => {
      return { ...prevState, searchVal: searchQuery };
    });
  };

  searchSubmitHandler = (e) => {
    let searchTerm = this.state.searchVal;
    friendServices
      .search(searchTerm)
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };

  onSearchSuccess = (response) => {
    console.log("On Search Success!", response);
    let foundFriends = response.data.item.pagedItems;
    this.props.query(foundFriends);
  };

  onSearchError = (response) => {
    console.error(response);
  };

  render() {
    return (
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="search"
          value={this.state.searchVal}
          onChange={this.searchHandler}
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.searchSubmitHandler}
        >
          Search
        </button>
      </form>
    );
  }
}
