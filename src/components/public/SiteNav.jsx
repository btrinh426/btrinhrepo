import React from "react";
// import { NavLink } from "react-router-dom";
// import { logout } from "../../services/userService";
// import { toast } from "react-toastify";
import Logout from "../auth/Logout";
import NameLabel from "../helpers/NameLabel";

class SiteNav extends React.Component {
  // componentDidUpdate(prevProps) {
  //   // console.log("... SiteNav > componentDidUpdate firing ...");
  //   if (this.props.isUserLoggedIn !== prevProps.isUserLoggedIn) {
  //     if (this.props.isUserLoggedIn) {
  //       this.enableNav();
  //     } else {
  //       this.disableNav();
  //     }
  //   } else {
  //     // console.log("... SiteNav > same same chicken beef ...");
  //   }
  // }

  onButtonClicked = (e) => {
    // console.log("... SiteNav > onButtonClicked firing ...");
    let buttonName = e.currentTarget.name;
    // console.log(e.currentTarget.name);
    this.props.history.push("/" + buttonName);
  };

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
            {/* original home button ------- <li className="nav-item active">
              <button className="nav-link link-button">
                Home <span className="sr-only">(current)</span>
              </button>
            </li> */}
            <NameLabel
              userName={this.props.userName}
              isUserLoggedIn={this.props.isUserLoggedIn}
            />
            {/* ----------------------------------------- */}
            <li className="nav-item">
              <button
                name="login"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
                disabled={this.props.isUserLoggedIn}
                hidden={this.props.isUserLoggedIn}
              >
                Login
              </button>
            </li>
            {/*   LOGGED IN NAV MENU ITEMS ------------ */}
            <li className="nav-item">
              <button
                className="nav-link link-button"
                name="home"
                onClick={this.onButtonClicked}
                disabled={!this.props.isUserLoggedIn}
              >
                Home
              </button>
            </li>
            {/* ----------------------------------------- */}
            <li className="nav-item">
              <button
                name="friends"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
                disabled={!this.props.isUserLoggedIn}
              >
                Friends
              </button>
            </li>
            {/* ----------------------------------------- */}
            <li className="nav-item">
              <button
                name="blogs"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
                disabled={!this.props.isUserLoggedIn}
              >
                Blogs
              </button>
            </li>
            {/* ----------------------------------------- */}
            <li className="nav-item">
              <button
                name="techcompanies"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
                disabled={!this.props.isUserLoggedIn}
              >
                Tech Companies
              </button>
            </li>
            {/* ----------------------------------------- */}
            <li className="nav-item">
              <button
                name="jobs"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
                disabled={!this.props.isUserLoggedIn}
              >
                Jobs
              </button>
            </li>
            {/* ----------------------------------------- */}
            <li className="nav-item">
              <button
                name="events"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
                disabled={!this.props.isUserLoggedIn}
              >
                Events
              </button>
            </li>
            {/* ----------------------------------------- */}
            <li className="nav-item">
              <button
                name="widget"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
                disabled={!this.props.isUserLoggedIn}
              >
                Widget
              </button>
            </li>
            {/* ----------------------------------------- */}
            <li className="nav-item">
              <button
                name="cars"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
                disabled={!this.props.isUserLoggedIn}
              >
                Cars
              </button>
            </li>
            {/* ----------------------------------------- */}
            <li className="nav-item">
              <button
                name="aircraft"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
                disabled={!this.props.isUserLoggedIn}
              >
                Aircraft
              </button>
            </li>
            {/* ----------------------------------------- */}
            <li className="nav-item">
              <button
                name="aircraftwizard"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
                disabled={!this.props.isUserLoggedIn}
              >
                Aircraft Wizard
              </button>
            </li>
            {/* ----------------------------------------- */}

            {/* <li className="nav-item">
              <button
                name="jumbo"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
                disabled={!this.props.isUserLoggedIn}
              >
                Jumbo
              </button>
            </li>
            <li className="nav-item">
              <button
                name="content"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
                disabled={!this.props.isUserLoggedIn}
              >
                Content
              </button>
            </li> */}
            {/* <li className="nav-item">
              <NavLink to="/formtest">
                <button className="nav-link link-button">Form Test</button>
              </NavLink>
            </li> */}

            <li className="nav-item">
              <button
                name="register"
                className="nav-link link-button"
                onClick={this.onButtonClicked}
              >
                Register
              </button>
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
          <Logout
            onLogout={this.props.onLogout}
            isUserLoggedIn={this.props.isUserLoggedIn}
          />
        </div>
      </nav>
    );
  }
}

export default SiteNav;
