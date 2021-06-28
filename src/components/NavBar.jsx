import React from "react";
import { NavLink } from "react-router-dom";
import { logOutUser } from "../services/usersService";
import debug from "sabio-debug";
const _logger = debug.extend("App");

class NavBar extends React.Component {
  onLogOut = (e) => {
    e.preventDefault();
    logOutUser().then(this.onLogOutUserSuccess).catch(this.onLogOutUserError);
  };
  onLogOutUserSuccess = (response) => _logger("log out success", response);
  onLogOutUserError = (response) => _logger("log out error", response);

  render() {
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
              <NavLink to="/">
                <button className="nav-link link-button">
                  Home <span className="sr-only">(current)</span>
                </button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/jumbo">
                <button className="nav-link link-button">Jumbo</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/content">
                <button className="nav-link">Content</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/friends">
                <button className="nav-link">Friends</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/friends/createfriend">
                <button className="nav-link">CreateFriend</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register">
                <button className="nav-link">Register</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login">
                <button className="nav-link">Log in</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login">
                <button className="nav-link" onClick={this.onLogOut}>
                  Log Out
                </button>
              </NavLink>
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

export default NavBar;
