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
// import Friends from "./components/Friends";
// import Jobs from "./components/Jobs";
// import Events from "./components/Events";

import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        avatarUrl: "",
      },
      show: false,
    };
  }

  componentDidMount = () => {
    console.log("Main App Class component mounted.");
    if (!this.state.currentUser.hasOwnProperty("firstName")) {
      // User is NOT logged in...re-direct to Login page
      // debugger;
      // For now, I do not know how to set the state of App.jsx from another component
      // so I will not re-route to the login page automatically
      // this.props.history.push("/login");
    } else {
      // User IS logged in
      // debugger;
      console.log(`Welcome ${this.state.currentUser.firstName}`);
    }
    // this.handleClickAjaxCall();
  };

  onUserLoginSuccess = () => {
    console.log(`User successfully logged in.`);

    userService
      .getCurrentUser()
      .then(this.onGetCurrentUserSuccess)
      .then(userService.getUserById)
      .then(this.onGetUserByIdSuccess)
      .catch(this.onGetCurrentUserError);
  };

  onGetCurrentUserSuccess = (response) => {
    const currentUserId = response.data.item.id;
    return currentUserId;
  };

  onGetUserByIdSuccess = (response) => {
    this.setState(
      (prevState) => {
        console.log("Setting state with newly logged-in user info...");
        const currentUser = { ...prevState.currentUser };
        currentUser.firstName = response.data.item.firstName;
        currentUser.lastName = response.data.item.lastName;
        currentUser.email = response.data.item.email;
        currentUser.avatarUrl = response.data.item.avatarUrl;
        // debugger;
        return { currentUser };
      },
      () => {
        toast.success(`Successful login.`);
        this.props.history.push("/");
        // location.replace("home.html");
      }
    );
  };

  onGetCurrentUserError = (error) => {
    console.error("Error getting current user.");
    debugger;
  };

  onUserLoginError = (error) => {
    console.error("Error logging in user.");
    let errorText = error.response.data.errors.join("\n");
    if (errorText.toLowerCase().includes("invalid credentials")) {
      errorText = "Invalid credentials.";
      console.error(errorText);
    }
    toast.error(`Error Loggin in user:  /n/n ${errorText}`);
    debugger;
  };

  render() {
    console.log("State:");
    console.log(this.state);
    return (
      <React.Fragment>
        <div id="myNavbarTop">
          <NavbarTop />
        </div>
        <main className="row pl-0 ml-0" id="mainWindow" style={{ marginTop: "60px" }} role="main">
          <div className="col ml-0 pl-3 pt-3 pr-3 text-light" id="myNavbarSide">
            <NavbarSide />
          </div>
          {this.state.show ? <h1>shown </h1> : <h1></h1>}

          <Route path="/register" exact render={() => <Register currentUser={this.state.currentUser} />} />
          <Route path="/login" exact component={Login} />
          {/* <Route path="/friends" exact component={Friends}></Route>
          <Route path="/jobs" exact component={Jobs}></Route>
          <Route path="/events" exact component={Events}></Route> */}
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
