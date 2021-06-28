import React from "react";
import * as usersService from "../services/usersService";
import { NavLink } from "react-router-dom";
import * as friendsService from "../services/friendsService";
import FriendCard from "./FriendCard";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class FriendsDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      userInfo: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        avatarUrl: "",
      },
      friends: [],
      mappedFriends: [],
      deleteSlug: "",
      search: "",
      pagination: {
        pageIndex: 0,
        pageSize: 5,
        totalCount: 0,
        query: "",
      },
    };
    this.setIsLoggedIn();
  }

  componentDidMount() {
    friendsService
      .getAll()
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  }

  onGetAllSuccess = (response) => {
    // Add Friends Array to State
    let friendsAr = response.data.item.pagedItems;
    this.setState({
      friends: friendsAr,
      mappedFriends: friendsAr.map(this.mapFriend),
    });
    //map friends to new Array
  };

  onGetAllError = (error) => {
    console.error(error);
  };

  setIsLoggedIn = () => {
    usersService
      .getCurrentUser()
      .then(this.getCurrentUserSuccess)
      .catch(this.getCurrentUserError);
  };

  getCurrentUserSuccess = (response) => {
    console.log(response);
    this.setState(() => ({ isLoggedIn: true }));
    console.log(this.state.isLoggedIn);
    this.setState(() => ({
      userInfo: {
        id: response.data.item.id,
      },
    }));
    // console.log(this.state.userInfo);

    this.setUserInfo(this.state.userInfo.id);
  };

  getCurrentUserError = (error) => {
    console.log(error);
    this.setState({ isLoggedIn: false });
  };

  setUserInfo = (id) => {
    usersService
      .getUserInfoById(id)
      .then(this.onGetUserInfoByIdSuccess)
      .catch(this.onGetUserInfoError);
  };

  onGetUserInfoByIdSuccess = (response) => {
    this.setState(() => ({
      userInfo: {
        firstName: response.data.item.firstName,
        lastName: response.data.item.lastName,
        email: response.data.item.email,
        avatarUrl: response.data.item.avatarUrl,
      },
    }));

    // console.log("User Info Set", response);
  };

  onGetUserInfoError = (error) => {
    console.log("User Info Not Set", error);
  };

  mapFriend = (friends) => {
    console.log("friend", friends);

    return (
      <FriendCard
        key={friends.id}
        friend={friends}
        onEditFriend={this.onEdit}
        onDeleteFriend={this.onDelete}
      ></FriendCard>
    );
  };

  onEdit = (propObj) => {
    //search state.friends for friend obj with matching ID

    this.props.history.push({
      pathname: `/friends/${propObj.friend.id}/edit`,
      state: {
        formData: {
          title: propObj.friend.title,
          bio: propObj.friend.bio,
          summary: propObj.friend.summary,
          headline: propObj.friend.headline,
          slug: propObj.friend.slug,
          statusId: propObj.friend.statusId,
          primaryImage: propObj.friend.primaryImage.imageUrl,
        },
        friendId: propObj.friend.id,
      },
    });

    console.log("obj", propObj);
  };

  onDelete = (propObj) => {
    console.log(propObj);

    this.setState((prevState) => {
      return { ...prevState, deleteSlug: propObj.friend.slug };
    });

    friendsService
      .deleteFriend(propObj.friend.id)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onDeleteFriendSuccess = (response) => {
    console.log(response);

    toast.success(<div>Delete Friend Success</div>);

    let friendsCopy = [...this.state.friends];
    let deleteSlugCopy = this.state.deleteSlug;

    console.log("friendsCopy", friendsCopy);
    console.log("deleteSlugCopy", deleteSlugCopy);

    const index = friendsCopy.findIndex((element) => {
      if (element.slug === deleteSlugCopy) {
        return true;
      }
    });

    console.log("index", index);

    //splice friendsCopy at index
    friendsCopy.splice(index, 1);

    //copy friendsCopy to state

    this.setState((prevState) => {
      return {
        ...prevState,
        friends: friendsCopy,
        mappedFriends: friendsCopy.map(this.mapFriend),
      };
    });
  };

  onDeleteFriendError = (error) => {
    console.error(error);
    toast.error(<div>Delete Friend Failed</div>);
  };

  onFormFieldChanged = (e) => {
    console.log(e.currentTarget);
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState((prevState) => {
      let search = newValue;
      return { ...prevState, search };
    });
  };

  onSearchBtnClicked = (e) => {
    console.log("search clicked", e);
    let searchCopy = this.state.search;
    let friendsCopy = [...this.state.friends];

    let newFriends = friendsCopy.filter(
      (friend) => friend.title === searchCopy
    );
    console.log(newFriends);

    if (searchCopy === "") {
      this.setState((prevState) => {
        return {
          ...prevState,
          mappedFriends: friendsCopy.map(this.mapFriend),
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          mappedFriends: newFriends.map(this.mapFriend),
        };
      });
    }
  };

  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
    });
  };

  render() {
    let isLoggedIn = this.state.isLoggedIn;

    let renderThis;

    if (!isLoggedIn) {
      renderThis = (
        <div className="card p-5">
          You must be logged in to do that.
          <br />
          Click Below to Login
          <NavLink to="/login">
            <button type="button" className="btn btn-primary">
              Login
            </button>
          </NavLink>
        </div>
      );
    } else {
      renderThis = (
        <nav className="friendbar navbar navbar-light bg-light">
          <div className="container-fluid">
            <nav className="navbar navbar-light bg-light">
              <form className="container-fluid justify-content-start">
                {/* At some point make this change when going to add/edit page */}
                <h2>Friends</h2>
                &nbsp; &nbsp;
                <NavLink to="/friends/add">
                  <button
                    id="addFriendBtn"
                    className="btn btn-outline-success me-2"
                    type="button"
                  >
                    +Friend
                  </button>
                </NavLink>
              </form>
            </nav>

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search Friends"
                name="searchFriends"
                value={this.state.search}
                onChange={this.onFormFieldChanged}
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={this.onSearchBtnClicked}
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      );
    }

    return (
      <React.Fragment>
        {renderThis}

        <div className="p-5">
          <strong>
            <h1> These are your friends!</h1>
          </strong>
        </div>
        <div className="card-container p-5">{this.state.mappedFriends}</div>
      </React.Fragment>
    );
  }
}

export default FriendsDashboard;
