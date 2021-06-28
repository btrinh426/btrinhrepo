import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PersonForm from "./components/PersonForm";
import Register from "./components/Register";
import Home from "./components/Homepage";
import Login from "./components/Login";
import People from "./components/People";
import Cars from "./components/Cars";
import "./App.css";

class App extends Component {
  state = {
    currentUser: {
      isLoggedIn: false,
      UsersInfo: { firstName: "", lastName: "", avatarUrl: "" },
    },
  };

  static getDerivedStateFromProps(props, state) {
    let newState = null;

    let { state: propState } = props.location;
    if (propState) {
      if (propState.type === "LOGIN") {
        let currentUser = {
          UsersInfo: { ...propState.payload },
          isLoggedIn: true,
        };
        newState = { currentUser };
      } else if (propState.type === "LOGOUT" && state.currentUser.isLoggedIn) {
        let currentUser = { isLoggedIn: false };
        newState = { currentUser };
      }
    }
    return newState;
  }

  // componentDidUpdate(prevProps) {
  //   let currentPath = this.props.location.pathname;
  //   let prevPath = prevProps.location.pathname;
  //   console.log("App", { currentPath, prevPath });
  // }

  render() {
    return (
      <>
        <NavBar
          {...this.props}
          currentUser={this.state.currentUser}
          // usersInfo={this.state.currentUser.UsersInfo}
        />
        <Route
          path="/login"
          exact
          render={(props) => (
            <Login {...props} currentUser={this.state.currentUser} />
          )}
        />
        <Route
          path="/home"
          render={(_props) => (
            <Home {...this._props} currentUser={this.state.currentUser} />
          )}
        />

        <Route path="/people" exact component={People} />
        <Route path="/people/:id/edit" exact component={PersonForm} />
        <Route path="/people/new" exact component={PersonForm} />
        <Route path="/register" exact component={Register} />
        <Route path="/cars" exact component={Cars} />
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
