import React from "react";
import { NavLink } from "react-router-dom";
import LogButtonContainer from "./auth/LogButtonContainer";

class SiteNav extends React.Component {
  checkUser = () => {
    if (this.props.currentUser.isLoggedIn === false) {
      this.userNotLoggedIn();
    } else {
      this.userLoggedIn();
    }
  };

  //User is logged in, button goes to Home
  userLoggedIn = () => {
    this.props.history.push("/home");
  };
  //User is not logged in, button goes to Login
  userNotLoggedIn = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sabio">
        <button className="link-button navbar-brand"></button>
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
            <li className="nav-item" onClick={this.checkUser}>
              <button className="nav-link ">
                Home <span className="sr-only">(current)</span>
              </button>
            </li>
            <NavLink to="/friends" exact>
              <li className="nav-item ">
                <button className="nav-link link-button">Friends</button>
              </li>
            </NavLink>
            <NavLink to="/blogs" exact>
              <li className="nav-item ">
                <button className="nav-link link-button">Blogs</button>
              </li>
            </NavLink>
            <NavLink to="/companies" exact>
              <li className="nav-item ">
                <button className="nav-link link-button">Tech Companies</button>
              </li>
            </NavLink>
            <NavLink to="/jobs" exact>
              <li className="nav-item ">
                <button className="nav-link link-button">Jobs</button>
              </li>
            </NavLink>
            <NavLink to="/events" exact>
              <li className="nav-item ">
                <button className="nav-link link-button">Events</button>
              </li>
            </NavLink>
            <NavLink to="/register" exact>
              <li className="nav-item ">
                <button className="nav-link link-button">Register</button>
              </li>
            </NavLink>
            <NavLink to="/practice" exact>
              <li className="nav-item ">
                <button className="nav-link link-button">Practice</button>
              </li>
            </NavLink>
            <LogButtonContainer {...this.props}></LogButtonContainer>
          </ul>
        </div>
      </nav>
    );
  }
}

export default SiteNav;
