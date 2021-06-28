import React from "react";
import * as usersService from "../services/usersService";
import { NavLink } from "react-router-dom";
import * as friendsService from "../services/friendsService";
import FriendCard from "./FriendCard";
import { toast } from "react-toastify";

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

    this.setState({ deleteSlug: propObj.friend.slug });

    friendsService
      .deleteFriend(propObj.friend.id)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onDeleteFriendSuccess = (response) => {
    console.log(response);

    toast.success(<div>Delete Friend Success</div>);

    // search state.mapped friends for propObj.friend.slug

    let searchByMappedFriend = (mappedFriends) => {
      let searchResult = [];

      let filterBySlug = (mappedFriends) => {
        let slugMatch = false;

        if (mappedFriends.slug === this.deleteSlug) {
          slugMatch = true;
        }
        return slugMatch;
      };

      searchResult = mappedFriends.filter(filterBySlug);

      return searchResult;
    };

    let slugInMappedFriends = searchByMappedFriend(this.state.mappedFriends);

    console.log("slug in mapped friends", slugInMappedFriends);
    // delete the item from array

    this.setState((prevState) => {
      let oldMappedFriends = { ...prevState.mappedFriends };
      console.log("old mapped friends", oldMappedFriends);
    });
  };

  onDeleteFriendError = (error) => {
    console.error(error);
    toast.error(<div>Delete Friend Failed</div>);
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
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
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
