import React from "react";

import { NavLink } from "react-router-dom";

// import userService from "../services/UserService"

class SiteNav extends React.Component {
  // onFirstClickHandler = () => {
  //     const data = {
  //             "email": "mandinoluciano@gmail.com",
  //             "password": "Sabiopassword1!",
  //             "tenantId": "AND1"}
  // }

  // onLoginSuccess = (response) => {
  //     console.log(response)
  // }

  // onLoginError = (errResponse) => {
  //     console.error(errResponse)
  // }

  // componentDidMount() {
  //     const data = {
  //         "email": "mandinoluciano@gmail.com",
  //         "password": "Sabiopassword1!",
  //         "tenantId": "AND1"
  //     }

  //  userService.logIn(data)
  //     .then(this.onLoginSuccess)
  //     .catch(this.onLoginError);

  // }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
          <button className="link-button navbar-brand">
            <NavLink to="/Login">Login</NavLink>
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

          <button className="link-button navbar-brand">
            <NavLink to="/Register">Register</NavLink>
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

          <div>
            <NavLink to="/Circles1-3">
              {" "}
              Journey to the first three circles{" "}
            </NavLink>
          </div>
          <div>
            <NavLink to="/Circles4-6">
              {" "}
              Journey to the Next three circles{" "}
            </NavLink>
          </div>
          <div>
            <NavLink to="/Circles7-9">
              {" "}
              Journey to the Last three circles{" "}
            </NavLink>
          </div>
        </nav>
      </div>

      // and within your compoent you can now do something like
    );
  }
}

export default SiteNav;
