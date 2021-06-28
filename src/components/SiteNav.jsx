import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as userService from "../services/userService";

import "./SiteNav.css";

class SiteNav extends React.Component {
  //   onLoginClick = () => {
  //     const data = {
  //       email: "shantahuja4@gmail.com",
  //       password: "Bootcamp123!",
  //       tenantId: "bootcamp456",
  //     };

  //... code omitted.

  // userService
  //   .logIn(data)
  //   .then(this.onActionSuccess)
  //   .catch(this.onActionError);
  //   };

  componentDidMount() {
    const data = {
      email: "shantahuja4@gmail.com",
      password: "Bootcamp123!",
      tenantId: "bootcamp456",
    };

    userService
      .logIn(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }

  onActionSuccess = (response) => {
    console.log({ user: response.data });
  };

  onActionError = (errResponse) => {
    console.warn({ error: errResponse.config });
  };

  render() {
    return (
      <React.Fragment>
        <div id="wrapper" className="toggled">
          <div className="overlay"></div>
          {/* Sidebar */}
          <nav
            className="navbar navbar-inverse fixed-top"
            id="sidebar-wrapper"
            role="navigation"
          >
            <ul className="nav sidebar-nav mr-auto">
              <div className="sidebar-header">
                <div className="sidebar-brand">
                  <a href="#">Sabio Warmup</a>
                </div>
              </div>
              {/* <li>
                <a href="">
                  <FontAwesomeIcon icon="stroopwafel" />
                  &nbsp;&nbsp;Home
                </a>
              </li> */}
              {/* <li className="nav-item active">
                <button className="nav-link link-button">
                  <FontAwesomeIcon icon="stroopwafel" />
                  Home
                </button>
              </li>
              <li className="nav-item active">
                <button className="nav-link link-button">
                  Home <span className="sr-only">(current)</span>
                </button>
              </li> */}
              <li id="homeButton" className="nav-item">
                <NavLink className="nav-link link-button" to="/home">
                  Home
                </NavLink>
              </li>
              {/* <li id="registerButton" className="nav-item">
                <NavLink className="nav-link link-button" to="/register">
                  Register
                </NavLink>
              </li>
              <li id="loginButton">
                <NavLink className="nav-link link-button" to="/login">
                  Login
                </NavLink>
              </li> */}
              <li id="friendsButton" className="nav-item">
                <NavLink className="nav-link link-button" to="/friends">
                  Friends
                </NavLink>
              </li>
              {/* <li id="jobsButton" className="nav-item">
                <NavLink className="nav-link link-button" to="/jobs">
                  Jobs
                </NavLink>
              </li> */}
              {/* <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#events">Events</a>
              </li>
              <li>
                <a href="#team">Team</a>
              </li> */}
              {/* <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#followme">Follow me</a>
              </li> */}
            </ul>
          </nav>
          {/* /#sidebar-wrapper */}

          {/* Page Content */}
          <div id="page-content-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                  {/* <a href="Login.html" id="logoutUser">
                    Log out
                  </a>
                  . */}
                </div>
              </div>
            </div>
            <footer className="do-not-remove container-fluid footer mx-auto  fb-targert sabio d-none">
              <p className="text-center">© Sabio.la 2019</p>
            </footer>
          </div>
          {/* /#page-content-wrapper */}
        </div>
        {/* /#wrapper */}
      </React.Fragment>
    );
  }
}

export default SiteNav;
