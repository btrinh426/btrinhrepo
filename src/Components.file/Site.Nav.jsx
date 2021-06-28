import React from "react";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import * as userService from "../services/userServices";
import "react-toastify/dist/ReactToastify.css";
import Friends from "./Friends";

class SiteNav extends React.Component {
  onLogOutClicked = (e) => {
    e.stopPropagation();

    userService.logOut().then(this.onLogOutSuccess).catch(this.onLogOutError);
  };

  onLogOutSuccess = (response) => {
    console.log({ user: response });
    toast("Logout Successful!");
    this.props.history.push("/login");
  };

  onLogOutError = (response) => {
    console.warn({ error: response });
    toast("Logout Unsuccessful!");
  };

  navToFriends = (e) => {
    this.props.history.push("/friends");
  };
  navToJobs = (e) => {
    this.props.history.push("/jobs");
  };
  navToTechCompanies = (e) => {
    this.props.history.push("/techcompanies");
  };
  navToEvents = (e) => {
    this.props.history.push("/events");
  };
  navToBlogs = (e) => {
    this.props.history.push("/blogs");
  };
  navToLogin = (e) => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark sabio">
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
                  onClick={this.onLogOutClicked}
                >
                  Logout <span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link link-button"
                  onClick={this.navToFriends}
                >
                  Friends
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link link-button"
                  onClick={this.navToJobs}
                >
                  Jobs
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link link-button"
                  onClick={this.navToEvents}
                >
                  Events
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link link-button"
                  onClick={this.navToTechCompanies}
                >
                  Tech Companies
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link link-button"
                  onClick={this.navToBlogs}
                >
                  Blogs
                </button>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default SiteNav;
