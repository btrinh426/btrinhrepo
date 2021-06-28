import React from "react";
import * as usersService from "../services/usersService";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      isLoggedIn: false,
      userInfo: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        avatarUrl: "",
      },
    };
    this.setIsLoggedIn();
  }

  setIsLoggedIn = () => {
    usersService
      .getCurrentUser()
      .then(this.getCurrentUserSuccess)
      .catch(this.getCurrentUserError);
  };

  getCurrentUserSuccess = (response) => {
    console.log(response);
    this.setState((prevstate) => ({ isLoggedIn: true }));
    console.log(this.state.isLoggedIn);
    this.setState((prevstate) => ({
      userInfo: {
        id: response.data.item.id,
      },
    }));
    console.log(this.state.userInfo);

    this.setUserInfo(this.state.userInfo.id);
  };

  getCurrentUserError = (error) => {
    console.log(error);
    this.setState((prevstate) => ({ isLoggedIn: false }));
  };

  setUserInfo = (id) => {
    usersService
      .getUserInfoById(id)
      .then(this.onGetUserInfoByIdSuccess)
      .catch(this.onGetUserInfoError);
  };

  onGetUserInfoByIdSuccess = (response) => {
    this.setState((prevstate) => ({
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
    if (!this.state.isLoggedIn) {
      return (
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
      return (
        <div className="card p-5">
          <img
            className="card-img-top"
            src={this.state.userInfo.avatarUrl}
            alt="Card cap"
          />
          <div className="card-body">
            <h5 className="card-title">Welcome Sabio Fellow</h5>
            <p className="card-text">
              You are currently logged in as {this.state.userInfo.firstName}{" "}
              {this.state.userInfo.lastName}.
            </p>
          </div>
        </div>
      );
    }
  }
}

export default Home;
