import React from "react";

import "./App.css";
import { logout } from "./components/apiCalls.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { withRouter } from "react-router-dom";
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

  displayHome = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  };

  onLogout = (e) => {
    e.preventDefault();
    logout().then(this.onLogoutSuccess).catch(this.onLogoutError);
  };

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
                onClick={this.displayHome}
              >
                Home
              </button>
            </li>
            <li className="nav-item active">
              <button className="nav-link link-button">People</button>
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
            <button
              className="btn btn-secondary my-2 my-sm-0 ml-3"
              onClick={this.onLogout}
            >
              Logout &raquo;
            </button>
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
