import React from "react";
import { NavLink, BrowserRouter } from "react-router-dom";
//import Register from ".Register";

class SiteNav extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-custom navbar-dark">
          <a className="navbar-brand" href="/">
            reel-life
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink to="/Home" className="nav-link link-button">
                  home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              {/* <li className="nav-item">
                  <NavLink to="/Friends" className="nav-link link-button">
                    friends
                  </NavLink>
                </li> */}
              <li className="nav-item">
                <NavLink to="/Blogs" className="nav-link link-button">
                  blogs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/TechCos" className="nav-link link-button">
                  tech co.
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Jobs" className="nav-link link-button">
                  jobs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Events" className="nav-link link-button">
                  events
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to="/FriendCard" className="nav-link link-button">
                  FRIENDCARD
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink to="/Register" className="nav-link link-button">
                  sign up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/LogIn" className="nav-link link-button">
                  log in
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to="/ProductForm" className="nav-link link-button">
                  products
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink to="/Cars" className="nav-link link-button">
                  cars
                </NavLink>
              </li>
              {/* <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    model years
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <button className="dropdown-item" href="#">
                      Action
                    </button>
                    <button className="dropdown-item" href="#">
                      Another action
                    </button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" href="#">
                      Something else here
                    </button>
                  </div>
                </li> */}
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="search"
                aria-label="Search"
              ></input>
              <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                search
              </button>
            </form>
          </div>
        </nav>
      </>
    );
  }
}

export default SiteNav;
