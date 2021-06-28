import React from "react";
import { withRouter } from "react-router-dom";
import * as userService from "./services/userService";

class SiteNav extends React.Component {
  onClickLogout = () => {
    userService.logout().then(this.onLogOutSuccess).catch(this.onLogOutError);

    console.log("log out");
    this.props.history.push("/Login");
  };
  onLogOutSuccess(response) {
    console.log({ logOut: response.data });
  }

  onLogOutError(response) {
    console.log({ error: response.data });
  }

  onClickRegister = () => {
    console.log("Register");
    this.props.history.push("/Register");
  };

  onClickHome = () => {
    console.log("HomePage");
    this.props.history.push("/HomePage");
  };

  onClickLogin = () => {
    console.log("login");
    this.props.history.push("/Login");
  };

  onClickFriends = () => {
    console.log("FriendsList");
    this.props.history.push("/FriendsList");
  };

  onClickNewProfile = () => {
    console.log("New Profile");
    this.props.history.push("/profile/new");
  };

  onClickJob = () => {
    console.log("Job");
    this.props.history.push("/CreateJob");
  };

  onClickJobList = () => {
    console.log("Job");
    this.props.history.push("/JobList");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sabio">
        {/* <button className="link-button navbar-brand">Navbar</button>
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
        </button> */}

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <button
                onClick={this.onClickHome}
                className="nav-link link-button"
              >
                Home <span className="sr-only">(current)</span>
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={this.onClickLogin}
                className="nav-link link-button"
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={this.onClickNewProfile}
                className="nav-link link-button"
              >
                New Profile
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={this.onClickRegister}
                className="nav-link link-button"
              >
                Register
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={this.onClickFriends}
                className="nav-link link-button"
              >
                Friends
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">Blogs</button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">Tech Companies</button>
            </li>
            <li className="nav-item">
              <button
                onClick={this.onClickJob}
                className="nav-link link-button"
              >
                Job
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={this.onClickJobList}
                className="nav-link link-button"
              >
                JobList
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link link-button">Events</button>
            </li>
            <li className="nav-item">
              <button className="nav-link disabled">Disabled</button>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="http://example.com"
                id="dropdown01"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdown01">
                <button className="dropdown-item  link-button">Action</button>
                <button className="dropdown-item link-button">
                  Another action
                </button>
                <button className="dropdown-item  link-button">
                  Something else here
                </button>
              </div>
            </li>

            <img
              onClick={this.onClickLogout}
              className="nav-link link-button"
              src={""}
              alt="LogOut"
            ></img>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(SiteNav);
