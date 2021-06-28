import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as userService from "./services/userService";

import NavbarTop from "./components/NavbarTop";
import NavbarSide from "./components/NavbarSide";
import Register from "./components/Register";
import Login from "./components/Login";
import Friends from "./components/Friends";
import FriendForm from "./components/FriendForm";
import Jobs from "./components/Jobs";
import JobForm from "./components/JobForm";
import Events from "./components/Events";

import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.clickNavbarSideShowButton = this.clickNavbarSideShowButton.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.state = {
      currentUser: {},
      showNavbarSide: false,
    };
  }

  componentDidMount = () => {
    // console.log("Main App Class component mounted.");
    if (!this.state.currentUser.hasOwnProperty("firstName")) {
      userService
        .getCurrentUser()
        .then(this.onGetCurrentUserSuccess)
        .then(userService.getUserById)
        .then(this.onGetUserByIdSuccess)
        .catch(this.onGetCurrentUserError);
    }
  };

  onGetCurrentUserSuccess = (response) => {
    const currentUserId = response.data.item.id;
    return currentUserId;
  };

  onGetUserByIdSuccess = (response) => {
    this.setState(
      (prevState) => {
        // console.log("Setting state with newly logged-in user info...");
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
      }
    );
  };

  onGetCurrentUserError = (error) => {
    console.error("Error getting current user.");
    this.props.history.push("/login");
  };

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
    let navbarSide;
    if (this.state.showNavbarSide) {
      navbarSide = (
        <div className="col ml-0 pl-3 pt-3 pr-3 text-light" id="myNavbarSide" style={{ height: "max-content" }}>
          <NavbarSide currentUser={this.state.currentUser} />
        </div>
      );
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
        <main className="row pl-0 ml-0" id="mainWindow" style={{ marginTop: "" }} role="main">
          {navbarSide}

          <Switch>
            <Route path="/register" exact render={() => <Register currentUser={this.state.currentUser} />} />
            <Route path="/login" exact render={() => <Login updateCurrentUser={this.updateCurrentUser} />} />
            <Route path="/friends" exact component={Friends}></Route>
            <Route path="/friends/new" exact component={FriendForm}></Route>
            <Route path="/friends/:friendId/edit" component={FriendForm}></Route>
            <Route path="/jobs" exact component={Jobs}></Route>
            <Route path="/jobs/new" exact component={JobForm}></Route>
            <Route path="/jobs/:jobId/edit" component={JobForm}></Route>
            <Route path="/events" exact component={Events}></Route>
          </Switch>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
