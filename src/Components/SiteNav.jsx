import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class SiteNav extends Component {
  render() {
    return (
      // .bg-dark for a dark nav bar
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary sabio">
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
            <NavLink to="/">
              <li className="nav-item active">
                <button className="nav-link link-button">
                  Empty <span className="sr-only">(current)</span>
                </button>
              </li>
            </NavLink>
            <NavLink to="/Jumbo">
              <li className="nav-item">
                <button className="nav-link link-button">Jumbo</button>
              </li>
            </NavLink>
            <NavLink to="/Content">
              <li className="nav-item">
                <button className="nav-link link-button">Content</button>
              </li>
            </NavLink>
            <NavLink to="/Registration">
              <li className="nav-item">
                <button className="nav-link link-button">Register User</button>
              </li>
            </NavLink>
            <NavLink to="/Test">
              <li className="nav-item">
                <button className="nav-link link-button">Test</button>
              </li>
            </NavLink>
            <NavLink to="/Login">
              <li className="nav-item">
                <button className="nav-link link-button">Login</button>
              </li>
            </NavLink>
            <NavLink to="/Home">
              <li className="nav-item">
                <button className="nav-link link-button">Home</button>
              </li>
            </NavLink>
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