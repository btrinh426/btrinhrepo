import React from "react";
import { withRouter } from "react-router-dom";

// JTG: for pagination https://www.w3schools.com/Jsref/jsref_concat_array.asp

import {
  getFriends,
  deleteFriend,
  searchFriends,
} from "../services/friendServices.js";
import ShowFriend from "./ShowFriend";

class Friends extends React.Component {
  pageIndex = 0;

  state = {
    mappedFriends: [],
    pageIndex: -1,
    pageSize: 2, // small so I can test pagination
    isNextEnabled: true,
    isGettingNextPage: true,
    searchCondition: "",
  };

  onSearch = (e) => {
    e.preventDefault();
    searchFriends(
      this.state.pageIndex,
      this.state.pageSize,
      this.state.searchCondition
    )
      .then(this.onSearchFriendsSuccess)
      .catch(this.onSearchFriendsError);
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
        };
      });
    }
  };

  onSearchFriendsError = (response) => {
    this.setState((prevState) => {
      return {
        mappedFriends: [],
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
    // , {
    //   type: "EDIT_FRIEND",
    //   friend: friend,
    // });
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
    if (response.data.item.totalCount) {
      const newMappedForState = response.data.item.pagedItems.map(
        this.mapForState
      );
      const newMappedForDom = newMappedForState.map(this.mapForDOM);

      this.setState((prevState) => {
        let newPageIndex = prevState.pageIndex;
        if (prevState.isGettingNextPage) {
          newPageIndex++;
        } else {
          newPageIndex--;
        }
        return {
          pageIndex: newPageIndex,
          mappedFriends: newMappedForDom,
        };
      });
    }
  };

  onGetFriendsError = (response) => {
    if (response.response.status === 404) {
      this.setState(() => {
        return { isNextEnabled: false };
      });
    }
  };

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

  // using this function gives me a warning: index.js:1 Warning: Each child in a list should have a unique "key" prop.
  // even though code almost identical to function above
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

  onPreviousButtonClick = (e) => {
    e.preventDefault();

    // should never be the case but safety test
    if (this.state.pageIndex === 0) {
      return;
    }

    this.getFriendList(this.state.pageIndex - 1, this.state.pageSize);

    this.setState((prevState) => {
      return { isGettingNextPage: false, isNextEnabled: true };
    });
  };

  // try to get next page of data,
  // if successful,
  //  change state of displayed elments to new
  //  and change state -> update state.pageIndex
  // if fail, change state of isNextEnabled to false
  onNextButtonClick = (e) => {
    e.preventDefault();

    // should never be the case but safety test
    if (!this.state.isNextEnabled) {
      return;
    }

    this.getFriendList(this.state.pageIndex + 1, this.state.pageSize);

    this.setState((prevState) => {
      return { isGettingNextPage: true };
    });
  };

  renderPreviousButton = () => {
    if (this.state.pageIndex <= 0) {
      return (
        <button
          type="button"
          className="btn btn-light"
          onClick={this.onPreviousButtonClick}
          id="prev"
          disabled
          aria-disabled="true"
        >
          Previous
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-light"
          onClick={this.onPreviousButtonClick}
          id="prev"
        >
          Previous
        </button>
      );
    }
  };

  renderNextButton = () => {
    if (this.state.isNextEnabled) {
      return (
        <button
          type="button"
          className="btn btn-light ml-2"
          onClick={this.onNextButtonClick}
        >
          Next
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-light ml-2"
          onClick={this.onNextButtonClick}
          disabled
          aria-disabled="true"
        >
          Next
        </button>
      );
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

        {/* <AddFriend path="/addfriend"></AddFriend> */}

        <div className="col-md-12 p-5">
          <h1>Friends</h1>
          <div className="row">{this.state.mappedFriends}</div>
          <hr />
        </div>
        <footer className="container text-right">
          {this.renderPreviousButton()}
          {this.renderNextButton()}
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
