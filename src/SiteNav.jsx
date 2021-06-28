import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

class SiteNav extends React.Component {
  render() {
    return (
      <React.Fragment>
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
                <button className="nav-link link-button">
                  <NavLink to="/Home">Home</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Friends">Friends</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/CreateContact">Create Contact</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Blogs">Blogs</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/TechCompanies">Tech Companies</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Jobs">Jobs</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Events">Events</NavLink>
                </button>
              </li>
              <button className="nav-link link-button">
                <NavLink to="/LogInForm">Log In</NavLink>
              </button>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/RegisterForm">Register</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/ProductForm">Product Form</NavLink>
                </button>
              </li>
              <li className="nav-item"></li>
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
      </React.Fragment>
    );
  }
}

export default SiteNav;
