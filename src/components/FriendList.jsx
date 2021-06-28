import React from "react";
import * as friendService from "../services/friendService";
import SingleFriend from "./SingleFriend";
import Pagination from "rc-pagination";
import { toast } from "react-toastify";
import "rc-pagination/assets/index.css";

class FriendList extends React.Component {
  state = {
    friends: {
      id: "",
      // bio: "",
      // summary: "",
      // headline: "",
      // slug: "",
      // statusId: "",
      // primaryImage: ""
    },
    page: {
      currentPage: 1,
      total: null,
      pageSize: 10,
      searchQuery: "",
    },
  };

  componentDidMount() {
    friendService
      .getByPage(0, 10)
      .then(this.onGetByPageSuccess)
      .catch(this.onGetByPageError);
  }

  onPageChange = (page, pageSize) => {
    console.log("onPageChange", page);
    this.setState((prevState) => {
      friendService
        .getByPage(page - 1, pageSize)
        .then(this.onGetByPageSuccess)
        .catch(this.onGetByPageError);

      let updatedPage = { ...prevState.page };

      updatedPage.currentPage = page;
      updatedPage.pageSize = pageSize;

      console.log("Page state", updatedPage);

      return { page: updatedPage };
    });
  };

  onSearchChange = (e) => {
    let target = e.target;
    let newValue = target.value;

    this.setState((prevState) => {
      let updatedSearch = { ...prevState.page };

      updatedSearch.searchQuery = newValue;
      return { page: updatedSearch };
    });
  };

  onSearchClicked = (e) => {
    e.preventDefault();

    console.log("onSearchClicked", this.state.page);

    friendService
      .search(0, 10, this.state.page.searchQuery)
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };

  onEditClicked = (friend) => {
    console.log("Edit", friend);

    this.props.history.push(`/friendform/${friend.id}`);
  };

  onDeleteClicked = (friend) => {
    console.log("DeleteClicked", friend);

    friendService
      .deleteFriend(friend.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onSearchSuccess = (response) => {
    console.log("onSearchSuccess", response);

    let searchFriends = response.data.item.pagedItems;

    this.setState((prevState) => {
      let updatedPage = { ...prevState.page };

      updatedPage.total = response.data.item.totalCount;
      updatedPage.currentPage = 1;

      return {
        mappedFriends: searchFriends.map(this.mapFriend),
        page: updatedPage,
      };
    });
  };
  onSearchError = (err) => {
    console.log(err);
    toast.error("Error, couldn't find any match");
  };

  onDeleteSuccess = (myId) => {
    console.log("onDelete Success", myId);

    this.setState((prevState) => {
      console.log("Delete", prevState.mappedFriends);

      const indexOfFriend = prevState.mappedFriends.findIndex(
        (singleStoge) => singleStoge.props.children.props.friend.id === myId
      );

      const updatedFriends = [...prevState.mappedFriends];

      if (indexOfFriend >= 0) {
        updatedFriends.splice(indexOfFriend, 1);
      }

      return {
        idDeleted: myId,
        mappedFriends: updatedFriends,
      };
    });
  };
  onDeleteError = (err) => {
    console.error(err);
    toast.error("Error, couldn't delete friend");
  };

  onGetByPageSuccess = (response) => {
    console.log(response.data);

    let myFriends = response.data.item.pagedItems;

    this.setState((prevState) => {
      let updatedPage = { ...prevState.page };

      updatedPage.total = response.data.item.totalCount;

      return {
        mappedFriends: myFriends.map(this.mapFriend),
        page: updatedPage,
      };
    });
  };
  onGetByPageError = (errResponse) => {
    console.error(errResponse);
    toast.error("Error, couldn't get friends by page");
  };

  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`Friend-${oneFriend.id}`}>
        <SingleFriend
          friend={oneFriend}
          onEdit={this.onEditClicked}
          onDelete={this.onDeleteClicked}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Friends</h1>
        <hr />
        <div>
          <input
            type="text"
            className="form-control"
            id="inputSearch"
            placeholder="Search"
            onChange={this.onSearchChange}
            value={this.state.searchQuery}
          />
          <button
            type="button"
            className="btn btn-primary searchItem"
            style={{ marginTop: 5 }}
            onClick={this.onSearchClicked}
          >
            Search
          </button>
        </div>
        <div>
          <Pagination
            style={{ marginTop: 5 }}
            onChange={this.onPageChange}
            current={this.state.currentPage}
            total={this.state.page.total}
          />
        </div>
        <div className="row">{this.state.mappedFriends}</div>
      </div>
    );
  }
}

export default FriendList;
