import React from "react";
import * as friendService from "./friendService";
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom";
import SingleFriend from "./SingleFriend";
import * as FriendService from "./friendService";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
//import PaginationItem from "rc-pagination";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        primaryImage: "",
      },
      current: 1,
      totalCount: "",
      pageSize: 2,
      pageIndex: "",
      totalPages: "",
    };
  }

  componentDidMount = () => {
    friendService
      .getFriends(0, this.state.pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);

    // if (this.props.history.location.state) {
    //   this.setState({
    //     formData: {
    //       title: this.props.history.location.state.title,
    //       bio: this.props.history.location.state.bio,
    //       summary: this.props.history.location.state.summary,
    //       headline: this.props.history.location.state.headline,
    //       slug: this.props.history.location.state.slug,
    //       statusId: this.props.history.location.state.entityTypeId,
    //       primaryImage: this.props.history.location.state.primaryImage.imageUrl,
    //     },
    //   });
    // }
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    let friendTitle = this.state.formData.title;

    friendService
      .searchFriend(friendTitle, this.state.pageIndex, this.state.pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onSearchFriendError);
  };

  onGetFriendsSuccess = (response) => {
    let friends = response.data.item.pagedItems;
    console.log(friends);
    console.log(
      response.data.item.pageIndex,
      response.data.item.pageSize,
      response.data.item.totalCount,
      response.data.item.totalPages
    );

    this.setState((prevState) => {
      return {
        mappedFriends: friends.map(this.mapFriend),
        totalCount: response.data.item.totalCount,
        pageSize: response.data.item.pageSize,
        pageIndex: response.data.item.pageIndex,
        totalPages: response.data.item.totalPages,
      };
    });
  };

  onGetFriendsError = () => {
    console.log("could not retrieve friends");
  };

  // onSearchFriendSuccess = (response) => {
  //   console.log(response.data.item.pagedItems);
  //   let friend = response.data.item.pagedItems;
  //   let friendTitle = this.state.formData.title;

  //   this.props.history.push(
  //     "/friends/api/friends/search?pageIndex=0&pageSize=10&q=" + friendTitle,
  //     friend
  //   );
  // };

  onSearchFriendError = () => {
    toast.error("Sorry, no friends matched the search criteria");
  };

  onFriendClicked = (friend) => {
    let id = friend.id;
    console.log(friend);

    this.props.history.push("/friends/" + friend.id + "/edit", friend);
  };

  onFriendClickedFull = (friend) => {
    let id = friend.id;
    console.log(friend);

    friendService
      .deleteFriend(id)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onDeleteFriendSuccess = (id) => {
    toast.success("Successfully deleted friend from contacts");
    console.log("success in deletion of: ", id);
    // this.props.history.push("/friends/new");
    // this.props.history.push("/friends");

    this.setState((prevState) => {
      console.log("Mapped friends", prevState.mappedFriends);

      const indexOfFriend = prevState.mappedFriends.findIndex(
        (friend) => friend.key === id
      );

      const oldFriends = [...prevState.mappedFriends];

      if (indexOfFriend) {
        const updatedFriends = oldFriends.splice(indexOfFriend, 1);

        return {
          mappedFriends: updatedFriends,
        };
      }
    });
  };

  onDeleteFriendError = () => {
    toast.error(" Sorry, couldn't delete friend this way ");
  };

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    console.log("Friends", { currentPath, previousPath });
  }

  mapFriend = (oneFriend) => {
    return (
      <SingleFriend
        key={oneFriend.id}
        friend={oneFriend}
        edit={this.onFriendClicked}
        delete={this.onFriendClickedFull}
      />
    );
  };

  getPaginatedFriends = (pageIndex, pageSize) => {
    friendService
      .getFriends(pageIndex, pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onChange = (page) => {
    console.log(page);
    this.setState(
      () => {
        return {
          current: page,
        };
      },
      () =>
        this.getPaginatedFriends(this.state.current - 1, this.state.pageSize)
    );
  };

  render() {
    return (
      <>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.title}
            name="title"
            id="title"
          />
          <button
            onClick={this.submitForm}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Search
            {/* <NavLink to="/friends/api/friends/search?pageIndex=0&pageSize=10&q=">
              Search
            </NavLink> */}
          </button>
        </form>

        <div className="col-md-12 p-5">
          <h1>Friends List</h1>
          <hr />
          <div className="row">{this.state.mappedFriends}</div>
          <div className="form-inline my-2 my-lg-0">
            <Pagination
              pageSize={this.state.pageSize}
              onChange={this.onChange}
              current={this.state.current}
              total={this.state.totalCount}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Friends;
