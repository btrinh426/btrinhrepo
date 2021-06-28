import React from "react";
import { getFriends } from "../services/friendsService";
import { deleteFriend } from "../services/friendsService";
import SingleFriend from "./SingleFriend";

class Friends extends React.Component {
  state = {
    mappedFriends: [],
    searchTerm: "",
    pageCount: 5,
  };

  componentDidMount = () => {
    getFriends(0, 10).then(this.onGetSuccess).catch(this.onGetError);
    console.log(this.state.mappedFriends);
    var friends = this.state.mappedFriends;
  };
  onGetSuccess = (response) => {
    console.log(response);

    var myFriends = response.data.item.pagedItems;
    console.log(myFriends);
    this.setState(() => {
      return { mappedFriends: myFriends.map(this.mapFriend) };
    });
  };
  onGetError = (response) => {
    console.error(response);
  };

  onEditClick = (friend) => {
    console.log(friend);
    this.props.history.push(`/friends/${friend.id}/edit`, friend);
  };
  onDeleteClick = (friend) => {
    console.log(friend);
    deleteFriend(friend.id)
      .then(() => friend.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };
  onDeleteSuccess = (id) => {
    // use findIndex check to see where id === mappedFriend.key
    // use the index and remove from the array and then setState again to replace mappedFriends
    //NOT WORKING YET
    var stringId = id.toString();
    this.setState((prevState) => {
      const indexOfFriend = prevState.mappedFriends.findIndex(
        (mappedFriend) => mappedFriend.key === stringId
      );
      const mappedFriends = [...prevState.mappedFriends];

      if (indexOfFriend >= 0) {
        mappedFriends.splice(indexOfFriend, 1);
      }
      console.log(indexOfFriend);
      return { mappedFriends };
    }, this.stateChanged);
  };

  onDeleteError = (response) => {
    console.error(response);
  };

  mapFriend = (oneFriend) => {
    return (
      <SingleFriend
        key={oneFriend.id}
        friend={oneFriend}
        edit={this.onEditClick}
        delete={this.onDeleteClick}
      ></SingleFriend>
    );
  };

  routeChange = () => {
    let path = `/friends/friendform`;
    this.props.history.push(path);
  };

  onSearchFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState((prevState) => {
      let searchTerm = { ...prevState.searchTerm };

      searchTerm = newValue;

      return { searchTerm };
    });
  };
  onSearchClick = () => {
    this.setState((prevState) => {
      let mappedFriends = [...prevState.mappedFriends];

      mappedFriends = mappedFriends.filter(this.searchFilter);

      return { mappedFriends };
    });
  };
  searchFilter = (mappedFriend) => {
    let searchTerm = this.state.searchTerm;
    if (searchTerm === "") {
      return mappedFriend;
    } else if (
      mappedFriend.props.friend.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      return mappedFriend;
    }
  };

  //Pagination
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  // within return
  // <Posts posts={currentPosts}/>

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-info sabio">
          <h2 className="text-white">Friends</h2>
          <button
            className="btn btn-outline-dark ml-3 mr-3"
            onClick={this.routeChange}
          >
            + Friend
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search Friends"
                aria-label="Search"
                onChange={this.onSearchFieldChange}
              />
              <button
                className="btn btn-outline-warning my-2 my-sm-0"
                type="button"
                onClick={this.onSearchClick}
              >
                Search
              </button>
            </form>
          </div>
        </nav>
        <div className="row">{this.state.mappedFriends}</div>
      </React.Fragment>
    );
  }
}

export default Friends;
