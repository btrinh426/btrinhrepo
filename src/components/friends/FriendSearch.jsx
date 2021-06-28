import React from "react";
import * as friendServices from "./../../services/friendServices";

class FriendSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchVal: "" };
  }

  searchHandler = (e) => {
    let currentTarget = e.currentTarget;
    let searchValue = currentTarget.value;

    this.setState((prevState) => {
      return { ...prevState, searchVal: searchValue };
    });
  };

  searchSubmitHandler = () => {
    let searchFor = this.state.searchVal;
    friendServices
      .search(searchFor)
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };

  onSearchSuccess = (res) => {
    console.log("Successful Search Call", res);
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

export default FriendSearch;
