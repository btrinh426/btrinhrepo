import React from "react";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// import HomePage from "../starterTasks/homePage";
import Logout from "../starterTasks/Logout";

class TopNav extends React.Component {
  // goToHome = (e) => {
  //   e.preventDefault();
  //   console.log("Oh Yea!");
  //   this.props.history.push("/homePage");
  // };
  // goToLogin = (e) => {
  //   e.preventDefault();
  //   console.log("Oh Yea!");
  //   this.props.history.push("/userLogin");
  // };
  // goToFriends = (e) => {
  //   e.preventDefault();
  //   console.log("Oh Yea!");
  //   this.props.history.push("/Friends");
  // };

  render() {
    return (
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
              <NavLink to="/homePage" className="nav-link link-button">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/userlogin" className="nav-link link-button">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/friends" className="nav-link">
                Friends
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/techCompanies" className="nav-link">
                Tech Companies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/jobs" className="nav-link">
                Jobs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/events" className="nav-link">
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blogs" className="nav-link">
                Blogs
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href=" /"
                id="dropdown01"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdown01">
                <button className="dropdown-item">Tech Companies</button>
                <button className="dropdown-item">Jobs</button>
                <button className="dropdown-item">Events</button>
                <button className="dropdown-itemn">Blogs</button>
              </div>
            </li>
          </ul>
          <li className="nav-item">
            <Logout {...this.props} />
          </li>
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
export default TopNav;
