import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as userService from "../services/userService";
import "../Nav.css";

const Nav = (props) => {
  const onLogOutClicked = () => {
    props.setCurrentUser(null);
    userService.logout();
    window.localStorage.clear();
    console.log(localStorage.getItem("user"));
    props.history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
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
            <Link to="/" className="nav-link link-button">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link link-button">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link link-button">
              Product
            </Link>
          </li>
          <li className="nav-item dropdown">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Our Services
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link className="dropdown-item" to="/blogs">
                  Blogs
                </Link>
                <Link className="dropdown-item" to="/events">
                  Events
                </Link>
                <Link className="dropdown-item" to="/addFriend">
                  Add Friend
                </Link>
                <Link className="dropdown-item" to="/friends">
                  Friends
                </Link>
                <Link className="dropdown-item" to="/jobs">
                  Jobs
                </Link>
                <Link className="dropdown-item" to="/techCompanies">
                  Tech Companies
                </Link>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link link-button">
              Signup
            </Link>
          </li>
          {props && props.user.email ? (
            <li className="nav-item">
              <button
                onClick={onLogOutClicked}
                className="nav-link link-button"
              >
                Log Out
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link link-button">
                Login
              </Link>
            </li>
          )}
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
};

export default withRouter(Nav);
