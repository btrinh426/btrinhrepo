import React, { Component } from "react";
import * as userService from "../services/userService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

class SiteNav extends Component {
  state = {
    isLoggedIn: true, //******Is it possible to NOT give it an initial value ????????????????
    currentUser: { id: null, name: null },
  };

  componentDidMount() {
    userService
      .current()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  }

  onCurrentUserSuccess = (response) => {
    let UserNameFromCall = response.data.item.name;
    console.log("From NavBar-onCurrentUserSucess(): ", { UserNameFromCall });

    //**** Do I need to always do this?????????????????????
    this.setState(() => {
      let newCurrentUser = { ...this.state.currentUser };

      newCurrentUser.name = UserNameFromCall;

      return { currentUser: newCurrentUser };
    });

    //**** Why this does not work?????????????????????

    //   this.setState({ currentUser: UserNameFromCall });

    //************************ ************************/
  };

  onCurrentUserError = (errResponse) => {
    this.setState({ isLoggedIn: false });
    console.log(errResponse);
  };

  onLogoutClicked = () => {
    console.log("Logout btn clicked");

    userService
      .logOut()
      .then(this.onUserLogoutSuccess)
      .catch(this.onUserLogoutError);
  };

  onUserLogoutSuccess = (response) => {
    Swal.fire("you're logged out!");
    this.props.history.push("/login");
    this.setState({ isLoggedIn: false });
  };

  onUserLogoutError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong!");
  };

  onRegisterClicked = () => {
    console.log("Register btn clicked");
    this.props.history.push("/register");
  };

  onLoginClicked = () => {
    console.log("Login btn clicked");
    this.props.history.push("/login");
    // **** after loginSucess (thru Login Compo, the btn wouldn't change any more//Solved it by forcing a "refresh" there)
  };

  //** just for training purposes!

  //** one of the reasons componentDidUpdate(prevProps)fires up is that the props change */
  //***????? or is it vice versa? */

  // componentDidUpdate() {
  //   let currentPath = this.props.location.pathname;
  //   console.log("From SiteNave- componentDidUpdate(): ", { currentPath });
  // }
  // componentDidMount() {
  //   let currentPath = this.props.location.pathname;
  //   console.log("From SiteNave- componentDidMount(): ", { currentPath });
  // }

  render() {
    console.log("SiteNave Rendering ...");
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link clickable" href="/">
                  HOME
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link clickable" href="/friends">
                  Friends
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link clickable"
                  href="https://api.remotebootcamp.dev/apihelp/index.html"
                >
                  Blogs
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link clickable"
                  href="https://api.remotebootcamp.dev/apihelp/index.html"
                >
                  Tech Co.
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link clickable" href="/jobs">
                  Jobs
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link clickable"
                  href="https://api.remotebootcamp.dev/apihelp/index.html"
                >
                  Events
                </a>
              </li>
            </ul>
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
        <hr />
        <hr />
        <nav className="navbar navbar-expand-md navbar-dark bg-dark sabio">
          <div className="float-right navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button
                  type="button"
                  className={
                    this.state.isLoggedIn
                      ? "btn btn-primary logout"
                      : "btn btn-primary logout d-none"
                  }
                  onClick={this.onLogoutClicked}
                >
                  Logout
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={
                    this.state.isLoggedIn
                      ? "btn btn-primary login d-none"
                      : "btn btn-primary login"
                  }
                  onClick={this.onLoginClicked}
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-primary register"
                  onClick={this.onRegisterClicked}
                >
                  Register
                </button>
              </li>
              <li className="nav-item user">
                <p>
                  <b>
                    {this.state.isLoggedIn ? (
                      <span style={{ color: "green" }}>
                        {" "}
                        {this.state.currentUser.name}
                      </span>
                    ) : (
                      <span style={{ color: "green" }}> Sabio Fellow</span>
                    )}
                  </b>
                </p>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default SiteNav;
