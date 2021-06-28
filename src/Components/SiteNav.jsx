import React from "react";
import { NavLink } from "react-router-dom";

class SiteNav extends React.Component {
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
            <NavLink to="/home" exact>
              <li className="nav-item active">
                <button className="nav-link link-button">
                  Home <span className="sr-only">(current)</span>
                </button>
              </li>
            </NavLink>
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
            <NavLink to="/login" exact>
              <li className="nav-item ">
                <button className="nav-link link-button">Login</button>
              </li>
            </NavLink>
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

export default SiteNav;
