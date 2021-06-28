import React from "react";

import { NavLink } from "react-router-dom";

class SiteNav extends React.Component {
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

          <button className="link-button navbar-brand">
            <NavLink to="/Friends">Friends</NavLink>
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
            <NavLink to="/techCompanies">Tech Companies</NavLink>
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

          {/* <div>
            <NavLink to="/Circles1-3"> circles 1-3 </NavLink>
          </div>
          <div>
            <NavLink to="/Circles4-6"> circles4-6 </NavLink>
          </div>
          <div>
            <NavLink to="/Circles7-9"> circles7-9 </NavLink>
          </div>
          <div>
            <NavLink to="/Cars"> Cars </NavLink>
          </div> */}
        </nav>
      </div>

      // and within your compoent you can now do something like
    );
  }
}

export default SiteNav;
