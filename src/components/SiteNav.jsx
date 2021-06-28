import React from "react";
import { NavLink } from "react-router-dom";
//import Register from ".Register";

class SiteNav extends React.Component {
  // onRegLinkClicked = (e) => {
  //   e;

  // };

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
                <a className="nav-link" href="#">
                  home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/Register.jsx"
                  className="nav-link"
                  // onClick={this.onRegLinkClicked}
                >
                  sign-up
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  log in
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  products
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
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
