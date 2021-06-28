import React from "react";

import { Link } from "react-router-dom";

class SiteNav extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary sabio">
          {/* <button className="link-button navbar-brand">Menu</button> */}
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
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link link-button">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/people" className="nav-link link-button">
                  People
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blogs" className="nav-link link-button">
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/companies" className="nav-link link-button">
                  Tech Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/jobs" className="nav-link link-button">
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/events" className="nav-link link-button">
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link link-button">
                  Register
                </Link>
              </li>

              {/* <li className="nav-item dropdown">
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
              </li> */}
            </ul>
            {/* <form className="form-inline my-2 my-lg-0">
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
            </form> */}
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default SiteNav;
