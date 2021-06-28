import React from "react";
import * as friendService from "../services/friendServices";
import { toast } from "react-toastify";

class SearchFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onFriendSearchSubmit = (e) => {
    e.preventDefault();
    //console.log("search query: ", this.state.searchFriend.q);
    friendService
      .searchFriends(this.state.searchFriend.q)
      .then(this.onFriendSearchSuccess)
      .catch(this.onFriendSearchError);
  };

  onFriendSearchSuccess = (response) => {
    this.searchResults(response.data.item);
  };

  onFriendSearchError = (response) => {
    console.warn(response);
    toast.error(`Sorry, no friend found with that name.`, { autoClose: 2000 });
  };

  handleFriendSearchForm = (e) => {
    let currentTarget = e.currentTarget;
    let currentValue = currentTarget.value;

    this.setState(() => {
      return { ...this.state, searchFriend: { q: currentValue } };
    });
  };

  searchResults = (results) => {
    this.props.query(results);
  };

  render() {
    return (
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="text"
          name="searchFriend"
          placeholder="Search Friends"
          onChange={this.handleFriendSearchForm}
        />
        <button
          className="btn btn-outline-info my-2 my-sm-0"
          type="submit"
          onClick={this.onFriendSearchSubmit}
        >
          Search
        </button>
      </form>
    );
  }
}

export default SearchFriends;
