import React from "react";
import Form from "./RegisterUser";
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
                <NavLink to="/home" exact className="nav-link link-button">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/loginPage" exact className="nav-link link-button">
                  Login Page
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/form" exact className="nav-link link-button">
                  Register
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink
                  to="/people/new"
                  exact
                  className="nav-link link-button"
                >
                  Add People
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink
                  to="/listpeople"
                  exact
                  className="nav-link link-button"
                >
                  People
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/listjobs" className="nav-link link-button">
                  List Jobs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/techcompanies"
                  exact
                  className="nav-link link-button"
                >
                  Tech companies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/new/job" className="nav-link link-button">
                  Jobs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/events" exact className="nav-link link-button">
                  Test
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/people"
                  id="dropdown01"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  Show More
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdown01">
                  <button className="dropdown-item  link-button">
                    Show me
                  </button>
                  <button className="dropdown-item link-button">
                    Another action
                  </button>
                  <button className="dropdown-item  link-button">
                    Something else here
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default SiteNav;
