import React from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import * as userService from "../services/userService";

class Home extends React.Component {
  state = {
    user: {
      name: "user",
      id: 0,
      avatarUrl:
        "https://icon-library.com/images/smartphone-camera-icon/smartphone-camera-icon-16.jpg",
    },
  };

  componentDidMount() {
    console.log("login mounted");
    userService
      .currentUser()
      .then((response) => this.getUserById(response.data.item.id))
      .catch(() => this.props.history.push("/Login"));
  }

  getUserById = (id) => {
    userService
      .getUserById(id)
      .then(this.loggedInSuccess)
      .catch(this.loggedInError);
  };

  loggedInSuccess = (response) => {
    //console.log(response);
    toast.success("access granted.");
    this.setState({
      user: {
        name: response.data.item.firstName,
        id: response.data.item.id,
        avatarUrl: response.data.item.avatarUrl ?? this.state.user.avatarUrl,
      },
    });
  };

  loggedInError = (response) => {
    console.warn(response);
    toast.error("access denied.");
  };

  onLogoutButton = (e) => {
    e.preventDefault();
    userService
      .logout(this.state.user)
      .then(this.onLogoutSuccess)
      .catch(this.onLogoutError);
    this.props.history.push("/Login");
  };

  onLogoutSuccess = (response) => {
    console.log(response);
    toast.success("user successfully logged out.");
  };

  onLogoutError = (response) => {
    console.warn(response);
    toast.error("logout failed.");
  };

  toLoginPg = (e) => {
    e.preventDefault();
    this.props.history.push("/Login");
  };

  render() {
    return (
      <>
        <img
          src={this.state.user.avatarUrl}
          className="rounded mx-auto d-block"
          alt="rounded float-left"
        ></img>
        <main role="main">
          <div className="jumbotron">
            <div className="container">
              <h5>reel-life</h5>
              <h6>the digital disposable camera.</h6>
              <h1 className="display-3">hello, {this.state.user.name}.</h1>
              <h2>reel-life is developing,</h2>
              <h3> let's get back to reality.</h3>
              <div>
                <button
                  className="btn btn-outline-dark btn-lg"
                  onClick={this.onLogoutButton}
                >
                  logout &raquo;
                </button>
              </div>
            </div>
            <div>
              <NavLink
                to="/Login"
                className="dropdown-item link-button"
                onClick={this.toLoginPg}
              >
                don't see your name? log in.
              </NavLink>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Home;
