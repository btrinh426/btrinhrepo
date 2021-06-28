import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        //Update state.currentUser prop here!!
        this.props.history.push("/login");

        // const newIcon = `<span class="fas fa-sign-out-alt"></span>`;
        // $("#loginOutButton")[0].innerHTML = newIcon;
        // location.assign("login.html");
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

    // debugger;

    // const newIcon = `<span class="fas fa-sign-in-alt"></span>`;
    // $("#loginOutButton")[0].innerHTML = newIcon;
    // location.replace("Login.html");
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
      loginButtonText = "Logout";
    } else {
      loginButtonText = "Login";
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
            <span className="fas fa-sign-in-alt"></span>
          </Button>

          <form className="form-inline">
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
              Go
            </Button>
            {/* <a className="btn navbar-toggler" id="searchButton" type="submit" href="#">
            Go<span className="fas fa-search"></span>
          </a> */}
          </form>
        </nav>
      </React.Fragment>
    );
  }
}

export default withRouter(NavbarTop);
