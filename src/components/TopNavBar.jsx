import React from "react";
import { NavLink } from "react-router-dom";

class TopNavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-dark sabio">
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
            <NavLink className="nav-link link-button" to="/home">
              Home
            </NavLink>

            <li className="nav-item">
              <NavLink className="nav-link link-button" to="/addfriend">
                Add Friend
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link link-button" to="/register">
                Register
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link link-button" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link link-button" to="/addproduct">
                Product Form
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
          </form>
        </div>
      </nav>
    );
  }
}

export default TopNavBar;
