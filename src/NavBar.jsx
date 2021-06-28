import React from "react";

import "./App.css";
import { logout } from "./components/apiCalls.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
// import { NavLink, withRouter } from "react-router-dom";
import { withRouter } from "react-router-dom";

// import NavLinkButton from "./NavLinkButton";

// import { userLogin } from "./components/userService";
// import axios from "axios";

// const onLoginClicked = (e) => {
//   e.preventDefault();
//   userLogin();
// };

class NavBar extends React.Component {
  displayRegisterForm = (e) => {
    e.preventDefault();
    this.props.history.push("/register");
  };

  onDisplayHome = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  };

  // when user clicked logout button, call database to logout
  onLogout = (e) => {
    e.preventDefault();
    logout().then(this.onLogoutSuccess).catch(this.onLogoutError);
  };

  // when clicked login button, go to login page
  onLogin = (e) => {
    e.preventDefault();
    this.props.history.push("/login");
  };

  // when successfully logged out, jump to login page
  onLogoutSuccess = (e) => {
    this.clearLoggedIn();
    this.props.history.push("/login");
  };

  onLogoutError = (e) => {
    Swal.fire("Logout Error", "Error logging user out");
  };

  // callback function to tell parent that user has logged out
  clearLoggedIn = () => {
    this.props.parentSetLogin(false);
  };

  onDisplayFriends = () => {
    this.props.history.push("/people");
  };

  render = () => {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
        <button className="link-button navbar-brand">Navbar</button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <button
                className="nav-link link-button"
                onClick={this.onDisplayHome}
              >
                Home
              </button>
            </li>
            {/* <NavLinkButton
              title="People"
              onDisplayFriends={this.onDisplayFriends}
              isEnabled={this.props.isLoggedIn}
            /> */}
            <li className="nav-item active">
              <button
                className="nav-link link-button"
                onClick={this.onDisplayFriends}
              >
                People
              </button>
            </li>
            <li className="nav-item active">
              <button className="nav-link link-button">Blogs</button>
            </li>
            <li className="nav-item active">
              <button className="nav-link link-button">Tech Co.</button>
            </li>
            <li className="nav-item active">
              <button className="nav-link link-button">Jobs</button>
            </li>
            <li className="nav-item active">
              <button className="nav-link link-button">Events</button>
            </li>
          </ul>

          <form className="form-inline my-2 my-lg-0">
            {!this.props.isLoggedIn && (
              <button
                className="btn btn-secondary my-2 my-sm-0 ml-3"
                onClick={this.onLogin}
              >
                Login &raquo;
              </button>
            )}

            {this.props.isLoggedIn && (
              <button
                className="btn btn-secondary my-2 my-sm-0 ml-3"
                onClick={this.onLogout}
              >
                Logout &raquo;
              </button>
            )}

            <button
              className="btn btn-secondary my-2 my-sm-0 ml-3"
              onClick={this.displayRegisterForm}
            >
              Register &raquo;
            </button>
          </form>
        </div>
      </nav>
    );
  };
}

export default withRouter(NavBar);
