import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faSignInAlt /*faSearch*/ } from "@fortawesome/free-solid-svg-icons";

// import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'

// import { NavbarToggler } from "reactstrap";
// import { Link } from "react-router-dom";

import { NavbarToggler, Button } from "reactstrap";
import * as userService from "../services/userService";

class NavbarTop extends Component {
  clickHamburger = (e) => {
    e.preventDefault();
    const { clickNavbarSideShowButton } = this.props;
    // This calls the below function (defined in the App.jsx file),
    // which then swaps the value of state.showNavbarSide (in App.jsx)
    clickNavbarSideShowButton();
  };

  clickHomeButton = (e) => {
    e.preventDefault();
    console.log("Clicked home button.");
    const currentPath = window.location.href.split("/").pop();
    const currentUser = this.props.currentUser;
    if (currentPath !== "" && currentUser.hasOwnProperty("firstName")) {
      this.props.history.push("/");
    }
  };

  clickLoginOutButton = (e) => {
    console.log("User clicked #loginOutButton");
    userService
      .getCurrentUser()
      .then(() => {
        console.log(`Current status is logged in. Loggin out...`);
        userService.userLogout().then(this.onUserLogoutSuccess).catch(this.onUserLogoutError);
      })
      .catch((error) => {
        console.log(`Current status is logged out.`);
        this.props.history.push("/login");
      });
  };

  onUserLogoutSuccess = () => {
    console.log("Logout success.");
    const userName = this.props.currentUser.firstName;
    const LogoutMsg = () => (
      <div>
        <p>Goodbye, {userName}</p>
        <p>You are now logged out.</p>
      </div>
    );
    toast.success(<LogoutMsg />);
    const { updateCurrentUser } = this.props;
    const currentUser = {};
    updateCurrentUser(currentUser);
    this.props.history.push("/login");
  };

  onUserLogoutError = (error) => {
    debugger;
    console.error("Error with logging out...this means the user was already logged out.");
    this.props.history.push("/login");
  };

  render() {
    const currentUser = this.props.currentUser;
    let loginButtonText;
    if (currentUser.hasOwnProperty("firstName")) {
      loginButtonText = (
        <div>
          Logout{" "}
          <span>
            {" "}
            <FontAwesomeIcon icon={faSignOutAlt} />
          </span>
        </div>
      );
    } else {
      loginButtonText = (
        <div>
          Login{" "}
          <span>
            {" "}
            <FontAwesomeIcon icon={faSignInAlt} />
          </span>
        </div>
      );
    }

    return (
      <React.Fragment>
        <nav className="navbar">
          <Button
            color="link"
            id="homeButton"
            className="navbar-brand"
            data-toggle="collapse"
            data-target="#myNavbarSide"
            aria-controls="myNavbarSide"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.clickHomeButton}
          >
            Starter Tasks
          </Button>
          <NavbarToggler onClick={this.clickHamburger} />
          <Button className="btn navbar-toggler" type="submit" id="loginOutButton" onClick={this.clickLoginOutButton}>
            {loginButtonText}
          </Button>

          {/* <form className="form-inline">
            <input className="form-control" id="searchInput" type="search" placeholder="" aria-label="Search" />
            <Button
              color="link"
              id="searchButton"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                console.log("Clicked search bar button.");
              }}
            >
              <span>
                {" "}
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </Button> 
           </form> */}
        </nav>
      </React.Fragment>
    );
  }
}

export default withRouter(NavbarTop);
