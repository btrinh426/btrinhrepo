import React from "react";
import { toast } from "react-toastify";
import * as usersService from "../services/usersService";
import { NavLink } from "react-router-dom";
import * as friendsService from "../services/friendsService";
import FriendCard from "./FriendCard";

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
      mappedFriends: <FriendCard></FriendCard>,
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
    let friends = response.data.item.pagedItems;
    console.log("friends", friends);

    this.setState((preState) => {
      console.log("preState", preState);

      return friends.map(this.mapFriends);
    });

    console.log("mapped friends", this.mappedFriends);
  };

  mapFriends = (friendsAr) => {
    console.log("FriendAR", friendsAr);
    let results = 1;

    return results;
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
    this.setState((preState) => ({ isLoggedIn: true }));
    console.log(this.state.isLoggedIn);
    this.setState((preState) => ({
      userInfo: {
        id: response.data.item.id,
      },
    }));
    console.log(this.state.userInfo);

    this.setUserInfo(this.state.userInfo.id);
  };

  getCurrentUserError = (error) => {
    console.log(error);
    this.setState((preState) => ({ isLoggedIn: false }));
  };

  setUserInfo = (id) => {
    usersService
      .getUserInfoById(id)
      .then(this.onGetUserInfoByIdSuccess)
      .catch(this.onGetUserInfoError);
  };

  onGetUserInfoByIdSuccess = (response) => {
    this.setState((preState) => ({
      userInfo: {
        firstName: response.data.item.firstName,
        lastName: response.data.item.lastName,
        email: response.data.item.email,
        avatarUrl: response.data.item.avatarUrl,
      },
    }));

    console.log("User Info Set", response);
  };

  onGetUserInfoError = (error) => {
    console.log("User Info Not Set", error);
  };

  render() {
    const listItems = this.state.friends.map((friend) => {
      return <div>{friend.id}</div>;
    });

    let isLoggedIn = this.state.isLoggedIn;
    console.log("render", isLoggedIn);
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
        {this.listItems}
      </React.Fragment>
    );
  }
}

export default FriendsDashboard;
