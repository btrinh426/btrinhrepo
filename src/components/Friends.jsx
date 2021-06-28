import React from "react";
import { withRouter } from "react-router-dom";
import ReactPaginate from "react-paginate";

import {
  getFriends,
  deleteFriend,
  searchFriends,
} from "../services/friendServices.js";
import ShowFriend from "./ShowFriend";

class Friends extends React.Component {
  state = {
    mappedFriends: [],
    pageSize: 2, // small so I can test pagination
    searchCondition: "",
    isSearching: false,
    pageCount: -1,
  };

  searchFriendsList(pageIndex, pageSize, searchCondition) {
    searchFriends(pageIndex, pageSize, searchCondition)
      .then(this.onSearchFriendsSuccess)
      .catch(this.onSearchFriendsError);
  }

  onSearch = (e) => {
    e.preventDefault();
    this.searchFriendsList(0, this.state.pageSize, this.state.searchCondition);
  };

  onSearchFriendsSuccess = (response) => {
    if (response.data.item.totalCount) {
      const newMappedForState = response.data.item.pagedItems.map(
        this.mapForState
      );
      const newMappedForDom = newMappedForState.map(this.mapForDOM);

      this.setState((prevState) => {
        return {
          mappedFriends: newMappedForDom,
          pageCount: response.data.item.totalPages,
          isSearching: true,
        };
      });
    }
  };

  onSearchFriendsError = (response) => {
    this.setState((prevState) => {
      return {
        mappedFriends: [],
        pageCount: 0,
      };
    });
  };

  componentDidMount() {
    this.getFriendList(0, this.state.pageSize);
  }

  onFormFieldChange = (e) => {
    e.preventDefault();
    e.persist();

    this.setState(() => {
      let newState = {};
      newState[e.target.name] = e.target.value;
      return newState;
    });
  };

  onAddFriend = (e) => {
    e.preventDefault();
    this.props.history.push("/friends/new");
  };

  onEdit = (friend) => {
    this.props.history.push(`/friends/${friend.id}/edit`);
  };

  getIdOfDeleted = (deleteUrl) => {
    let deleteArray = deleteUrl.split("/");
    return deleteArray[deleteArray.length - 1];
  };

  onDelete = (e) => {
    deleteFriend(e.currentTarget.dataset.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  getIndexFromConfigUrl = (url) => {
    let id = this.getIdOfDeleted(url);

    // const existingPersonIndex = this.state.mappedFriends.findIndex((item) => {
    //   return item.key === id;
    // });
    let existingPersonIndex = -1;
    for (let index = 0; index < this.state.mappedFriends.length; index++) {
      if (this.state.mappedFriends[index].key === id) {
        existingPersonIndex = index;
        break;
      }
    }
    return existingPersonIndex;
  };

  onDeleteSuccess = (response) => {
    this.setState((prevState) => {
      const existingPersonIndex = this.getIndexFromConfigUrl(
        response.config.url
      );

      let newMappedFriends = [...prevState.mappedFriends];
      if (existingPersonIndex >= 0) {
        newMappedFriends.splice(existingPersonIndex, 1);
      }

      return {
        mappedFriends: newMappedFriends,
      };
    });
  };

  onDeleteError = (e) => {
    console.log("Could not delete friend");
  };

  getFriendList = (pageIndex, pageSize) => {
    getFriends(pageIndex, pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    console.log(response.data.item.totalPages);
    if (response.data.item.totalCount) {
      const newMappedForState = response.data.item.pagedItems.map(
        this.mapForState
      );
      const newMappedForDom = newMappedForState.map(this.mapForDOM);

      this.setState(() => {
        return {
          mappedFriends: newMappedForDom,
          pageCount: response.data.item.totalPages,
        };
      });
    }
  };

  onGetFriendsError = (response) => {};

  mapForState = (friend) => {
    let stateFriend = {
      id: friend.id,
      title: friend.title,
      bio: friend.bio,
      summary: friend.summary,
      headline: friend.headline,
      slug: friend.slug,
      statusId: "Active",
    };

    // I don't know how I keep adding friends without an URL, but ... this fix
    if (friend.primaryImage !== null) {
      stateFriend.primaryImage = friend.primaryImage.imageUrl;
    } else {
      stateFriend.primaryImage =
        "https://www.publicdomainpictures.net/pictures/130000/nahled/clip-art-smiley-face.jpg";
    }
    return stateFriend;
  };

  mapForDOM = (friend) => {
    return (
      <div className="card col-md-3" key={friend.id}>
        <ShowFriend
          friend={friend}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
        ></ShowFriend>
      </div>
    );
  };

  // pagination
  handlePageClick = (data) => {
    if (this.state.isSearching) {
      this.searchFriendsList(
        data.selected,
        this.state.pageSize,
        this.state.searchCondition
      );
    } else {
      this.getFriendList(data.selected, this.state.pageSize);
    }
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar">
          <form className="form-inline my-2 my-lg-0">
            <span>Friends</span>
            <button
              style={{ color: "blue" }}
              className="btn btn-primary my-2 my-sm-0 ml-3"
              onClick={this.onAddFriend}
            >
              Friend+ &raquo;
            </button>
          </form>
          <form className="form-inline my-2 my-lg-0">
            <input
              id="search"
              className="edit-control"
              type="text"
              name="searchCondition"
              onChange={this.onFormFieldChange}
              value={this.state.searchCondition}
              placeholder="Search"
            />
            <button
              style={{ color: "blue" }}
              className="btn btn-primary my-2 my-sm-0 ml-3"
              onClick={this.onSearch}
            >
              Search
            </button>
          </form>
        </nav>

        <div className="col-md-12 p-5">
          <h1>Friends</h1>
          <div className="row">{this.state.mappedFriends}</div>
          <hr />
        </div>
        <footer className="container text-right">
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={this.state.pageCount}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </footer>
      </React.Fragment>
    );
  }
}

export default withRouter(Friends);

///////// EDIT state code not needed because onComponentDidMount makes API call to get list of friends
// from componentDidMount {
// if (
//   this.props.location.state &&
//   this.props.location.state.type === "EDITED_FRIEND"
// ) {
//   getFriend(this.props.location.state.id)
//     .then(this.onGetOneFriendSuccess)
//     .catch(this.onGetOneFriendError);
// }
// }

// onGetOneFriendSuccess = (response) => {
//   this.setState((prevState) => {
//     console.log("edit success", response.data.item);
//     const existingPersonIndex = this.getIndexFromConfigUrl(
//       response.config.url
//     );
//     console.log(existingPersonIndex);

//     if (existingPersonIndex >= 0) {
//       let newMappedFriends = [...prevState.mappedFriends];
//       console.log(newMappedFriends);
//       let updatedFriend = this.mapForState(response.data.item);
//       newMappedFriends[existingPersonIndex] = this.mapForDOM(updatedFriend);
//       console.log(newMappedFriends);

//       return {
//         mappedFriends: newMappedFriends,
//       };
//     }
//   });
// };

// onGetOneFriendError = (result) => {
//   Swal.fire("error updating friend display");
// };
