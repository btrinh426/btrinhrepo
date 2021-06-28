import React from "react";
import { NavLink } from "react-router-dom";
import * as usersService from "../services/userService";
import { toast } from "react-toastify";

class Navbar extends React.Component {
  onLogoutClicked = (e) => {
    console.log("I was Clicked");
    e.preventDefault();
    console.log(e);
    console.log(this.state);
    // this.props.history.push("/home/", { type: "LOGOUT", payload: null });
    usersService.logout().then(this.onLogoutSuccess).catch(this.onLogoutError);
  };
  onLogoutSuccess = (response) => {
    console.log(response);
    this.props.history.push("/home/", { type: "LOGOUT", payload: null });
    toast["success"]("You logged Out!", "Logout");
  };
  onLogoutError = (error) => {
    console.error(error);
    toast["error"]("You haven't logged out", "Logout");
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
          <button className="link-button navbar-brand">
            <strong>Sabio</strong>
          </button>
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
            {/* <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <button className="nav-link link-button" onClick={this.onHomeClicked}>Home</button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">Link</button>
              </li>
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
            </ul>  */}

            <form className="form-inline my-2 my-lg-0">
              {this.props.user.isLoggedIn === false && (
                <NavLink to="/login/" className="login-link">
                  Login
                </NavLink>
              )}
              {this.props.user.isLoggedIn === true && (
                <NavLink
                  to="/home/"
                  className="logout-link"
                  onClick={this.onLogoutClicked}
                >
                  Logout
                </NavLink>
              )}

              {/* <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-secondary my-2 my-sm-0"
                type="submit"
              >
                Search
              </button> */}
            </form>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
