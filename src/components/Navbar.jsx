import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import * as appService from "../services/appService";

class SiteNav extends React.Component {
  logOutUser = () => {
    appService.logOut().then(this.onLogOutSuccess).catch(this.onLogOutError);
  };

  onLogOutSuccess = (response) => {
    console.log(response);
    this.props.history.push("/login");
  };

  onLogOutError = (errResponse) => {
    console.log("logOut error");
  };

  render() {
    return (
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
            <li className="nav-item">
              <button className="nav-link link-button">
                <NavLink to="/home">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button"></button>
            </li>
            <button className="nav-link link-button">
              <NavLink to="/friends">Friends</NavLink>
            </button>
            <li className="nav-item">
              <button className="nav-link link-button">
                <NavLink to="/blogs">Blogs</NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">
                <NavLink to="/tech-companies">Tech Companies</NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">
                <NavLink to="/jobs">Jobs</NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">
                <NavLink to="/Events">Events</NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">
                <NavLink to="/register">Register</NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">
                <NavLink to="/login">Log In</NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link link-button"
                onClick={this.logOutUser}
              >
                Log Out
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
    );
  }
}

export default withRouter(SiteNav);
