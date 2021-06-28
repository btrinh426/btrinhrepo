import React from "react";
import { NavLink } from "react-router-dom";

class SideNavBar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
          <button className="link-button navbar-brand">Home</button>
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
              <NavLink className="nav-link link-button" to="/friends">
                Friends
              </NavLink>

              <li className="nav-item">
                <NavLink className="nav-link link-button" to="/login">
                  Blogs
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link link-button" to="/login">
                  Tech Companies
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link link-button" to="/login">
                  Jobs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link link-button" to="/login">
                  Events
                </NavLink>
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
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={this.onLogOutClicked}
              >
                Log Out
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default SideNavBar;
