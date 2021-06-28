import React from "react";
import { NavLink, withRouter } from "react-router-dom";

class SiteNav extends React.Component {
  onFriendsClicked = (e) => {
    console.log("I was clicked");
    this.props.history.push("/friends");
  };
  render() {
    return (
      <React.Fragment>
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
              <li className="nav-item">
                {/* <button className="nav-link link-button"> */}
                <NavLink
                  className="nav-link link-button"
                  to="/friends"
                  onClick={this.onFriendsClicked}
                >
                  Friends
                </NavLink>
                {/* </button> */}
              </li>

              <li className="nav-item">
                {/* <button className="nav-link link-button"> */}
                <NavLink className="nav-link link-button" to="/blogs">
                  Blogs
                </NavLink>
                {/* </button> */}
              </li>
              <li className="nav-item">
                {/* <button className="nav-link link-button"> */}
                <NavLink className="nav-link link-button" to="/techcos">
                  Tech Companies
                </NavLink>
                {/* </button> */}
              </li>
              <li className="nav-item">
                {/* <button className="nav-link link-button"> */}
                <NavLink className="nav-link link-button" to="/jobs">
                  Jobs
                </NavLink>
                {/* </button> */}
              </li>
              <li className="nav-item">
                {/* <button className="nav-link link-button"> */}
                <NavLink className="nav-link link-button" to="/events">
                  Events
                </NavLink>
                {/* </button> */}
              </li>

              {/* <li className="nav-item">
                <NavLink className="nav-link link-button" to="/form">
                  Code Challenge
                </NavLink>
              </li> */}
            </ul>

            <NavLink
              type="button"
              className="btn-toolbar btn-sm btn-danger mr-3"
              to="/login"
            >
              <b>Login</b>
            </NavLink>

            <NavLink
              style={{}}
              type="button"
              className="btn-toolbar btn-sm btn-danger"
              to="/register"
            >
              <b>Register</b>
            </NavLink>

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

export default withRouter(SiteNav);
