import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as userService from "./services/userService";

import NavbarTop from "./components/NavbarTop";
import NavbarSide from "./components/NavbarSide";
import Register from "./components/Register";
import Login from "./components/Login";
import Friends from "./components/Friends";
// import Jobs from "./components/Jobs";
// import Events from "./components/Events";

import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.clickNavbarSideShowButton = this.clickNavbarSideShowButton.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.state = {
      currentUser: {
        // id: "",
        // firstName: "",
        // lastName: "",
        // email: "",
        // avatarUrl: "",
      },
      showNavbarSide: false,
    };
  }

  componentDidMount = () => {
    console.log("Main App Class component mounted.");
    if (!this.state.currentUser.hasOwnProperty("firstName")) {
      userService
        .getCurrentUser()
        .then(this.onGetCurrentUserSuccess)
        .then(userService.getUserById)
        .then(this.onGetUserByIdSuccess)
        .catch(this.onGetCurrentUserError);
    }

    // if (!this.state.currentUser.hasOwnProperty("firstName")) {
    // User is NOT logged in...re-direct to Login page
    // debugger;
    // For now, I do not know how to set the state of App.jsx from another component
    // so I will not re-route to the login page automatically
    // this.props.history.push("/login");
    // } else {
    // User IS logged in
    // debugger;
    //   console.log(`Welcome ${this.state.currentUser.firstName}`);
    // }
    // this.handleClickAjaxCall();
  };

  // onUserLoginSuccess = () => {
  //   console.log(`User successfully logged in.`);
  // userService
  //   .getCurrentUser()
  //   .then(this.onGetCurrentUserSuccess)
  //   .then(userService.getUserById)
  //   .then(this.onGetUserByIdSuccess)
  //   .catch(this.onGetCurrentUserError);
  // };

  onGetCurrentUserSuccess = (response) => {
    const currentUserId = response.data.item.id;
    return currentUserId;
  };

  onGetUserByIdSuccess = (response) => {
    this.setState(
      (prevState) => {
        console.log("Setting state with newly logged-in user info...");
        const newState = { ...prevState };
        newState.currentUser.id = response.data.item.id;
        newState.currentUser.firstName = response.data.item.firstName;
        newState.currentUser.lastName = response.data.item.lastName;
        newState.currentUser.email = response.data.item.email;
        newState.currentUser.avatarUrl = response.data.item.avatarUrl;
        newState.showNavbarSide = true;
        return newState;
      },
      () => {
        toast.success(`Welcome, ${this.state.currentUser.firstName}`);
        // this.props.history.push("/");
      }
    );
  };

  onGetCurrentUserError = (error) => {
    console.error("Error getting current user.");
    // toast.error("Not logged in. Please go to login page.");
    this.props.history.push("/login");
  };

  // onUserLoginError = (error) => {
  //   console.error("Error logging in user.");
  //   let errorText = error.response.data.errors.join("\n");
  //   if (errorText.toLowerCase().includes("invalid credentials")) {
  //     errorText = "Invalid credentials.";
  //     console.error(errorText);
  //   }
  //   toast.error(`Error Loggin in user:  /n/n ${errorText}`);
  //   debugger;
  // };

  clickNavbarSideShowButton = () => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      if (newState.showNavbarSide) {
        newState.showNavbarSide = false;
      } else if (newState.currentUser.hasOwnProperty("firstName")) {
        newState.showNavbarSide = true;
      }
      return newState;
    });
  };

  updateCurrentUser = (userData) => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      if (userData.hasOwnProperty("firstName")) {
        newState.currentUser = {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          avatarUrl: userData.avatarUrl,
        };
        newState.showNavbarSide = true;
      } else {
        newState.currentUser = {};
        newState.showNavbarSide = false;
      }
      return newState;
    });
  };

  render() {
    console.log("Rendering App.jsx, State:");
    console.log(this.state);

    let navbarSide;
    if (this.state.showNavbarSide) {
      navbarSide = (
        <div className="col ml-0 pl-3 pt-3 pr-3 text-light" id="myNavbarSide">
          <NavbarSide currentUser={this.state.currentUser} />
        </div>
      );
      // navbarSide = <Route path="/" render={() => <NavbarSide currentUser={this.state.currentUser} />} />;
    }

    return (
      <React.Fragment>
        <div id="myNavbarTop">
          <NavbarTop
            clickNavbarSideShowButton={this.clickNavbarSideShowButton}
            updateCurrentUser={this.updateCurrentUser}
            currentUser={this.state.currentUser}
          />
        </div>
        <main className="row pl-0 ml-0" id="mainWindow" style={{ marginTop: "60px" }} role="main">
          {/* {this.state.showNavbarSide ? <h1>shown </h1> : <h1></h1>} */}
          {navbarSide}
          {/* <Route path="/" render={() => <NavbarSide currentUser={this.state.currentUser} />} /> */}
          <Route path="/register" exact render={() => <Register currentUser={this.state.currentUser} />} />
          {/* <Login updateCurrentUser={this.updateCurrentUser} /> */}
          <Route path="/login" exact render={() => <Login updateCurrentUser={this.updateCurrentUser} />} />
          <Route path="/friends" exact component={Friends}></Route>

          {/* <Route path="/jobs" exact component={Jobs}></Route> */}
          {/* <Route path="/events" exact component={Events}></Route> */}

          {/* <div>
            <button className="btn btn-secondary m-2 btn-lg" id="button_learnMore" onClick={this.handleClickJumbo}>
                Show Jumbo
            </button>
            <button className="btn btn-secondary m-2 btn-lg" id="button_learnMore" onClick={this.handleClickContent}>
              Show Content
            </button>
            <button className="btn btn-secondary m-2 btn-lg" id="button_ajaxCall" onClick={this.handleClickAjaxCall}>
                Make Ajax Call
            </button>
          </div>   */}
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
