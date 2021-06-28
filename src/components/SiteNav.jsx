import React from "react";
import * as userServices from "../services/userServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";

class SiteNav extends React.Component {
  state = {
    isUserLoggedIn: "",
    activeUserInfo: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      avatarUrl: "",
    },
  };

  toastrOptions = {
    position: toast.POSITION.BOTTOM_RIGHT,
    showDuration: 500,
    timeOut: 1000,
  };

  onNewRouteClicked = (e) => {
    let newRoute = e.currentTarget.name;
    this.props.history.push(`/${newRoute}`);
  };

  onLogoutClicked = (e) => {
    swal({
      text: "Are you sure you want to log out?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        userServices
          .logOut()
          .then(this.onLogoutSuccess)
          .catch(this.onLogoutError);
      }
    });
  };

  onLogoutSuccess = (response) => {
    toast.success("Logout Successful!", this.toastrOptions);
    this.props.setCurrentUser();
  };

  onLogoutError = (response) => {
    console.warn(response);
    toast.error("Logout Unsuccessful.Please Try again", this.toastrOptions);
  };

  render() {
    return (
      <React.Fragment>
        <div className="universal-header">
          <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark sabio">
            <button
              className="link-button navbar-brand"
              onClick={this.onNewRouteClicked}
            >
              .site
            </button>
            {/* <button className="link-button navbar-brand">
                        navbar
                            <span className="sr-only">(current)</span>
                        </button> */}

            <div className="collapse navbar-collapse">
              <ul
                className="navbar-nav mr-auto justify-content-end"
                id="navbarsExampleDefault"
              >
                {this.props.userState ? (
                  <li className="nav-item ">
                    <button
                      className="nav-link logout-button "
                      onClick={this.onLogoutClicked}
                    >
                      Log Out
                    </button>
                  </li>
                ) : (
                  <React.Fragment>
                    <li className="nav-item">
                      <button
                        className="nav-link register-button"
                        name="register"
                        onClick={this.onNewRouteClicked}
                      >
                        Register
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link login-button"
                        name="login"
                        onClick={this.onNewRouteClicked}
                      >
                        Log In
                      </button>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </nav>

          <div className="side-nav-container page-nav bg-light">
            <nav className="navbar navbar-expand-md navbar-light bg-light sabio flex-column">
              <button className="link-button navbar-user user-profile">
                {this.props.currentUser.firstName === "" ? (
                  <p className="guest-profile">Welcome, Guest!</p>
                ) : (
                  <React.Fragment>
                    <img
                      className="user-profile-img"
                      src={this.props.currentUser.avatarUrl}
                      alt={this.props.currentUser.firstName}
                    />
                    <p className="">
                      Hello, {this.props.currentUser.firstName}{" "}
                      {this.props.currentUser.lastName}!
                    </p>
                  </React.Fragment>
                )}
              </button>
              {/* change from button to a user profile info div and format it!!! */}

              <div
                className="collapse navbar-collapse"
                id="navbarsExampleDefault"
              >
                <ul className="navbar-nav mr-auto flex-column nav-bar-ul ">
                  <li className="nav-item">
                    <button
                      className="nav-link home-button"
                      onClick={this.onNewRouteClicked}
                    >
                      {" "}
                      Home
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link people-button"
                      name="people"
                      onClick={this.onNewRouteClicked}
                    >
                      People
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link blogs-button"
                      name="blogs"
                      onClick={this.onNewRouteClicked}
                    >
                      Blogs
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link jobs-button"
                      name="jobs"
                      onClick={this.onNewRouteClicked}
                    >
                      Jobs
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link Events-button"
                      name="events"
                      onClick={this.onNewRouteClicked}
                    >
                      Events
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link Events-button"
                      name="cars"
                      onClick={this.onNewRouteClicked}
                    >
                      Cars
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SiteNav;
