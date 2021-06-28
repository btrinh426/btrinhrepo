import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Home from "./components/Homepage";
import Login from "./components/Login";
import "./App.css";

class App extends Component {
  state = { currentUser: { isLoggedIn: false, UsersInfo: null } };

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

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let prevPath = prevProps.location.pathname;
    console.log("App", { currentPath, prevPath });
  }

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
        <Switch {...this.props} currentUser={this.state.currentUser}>
          <Route path="/home" component={Home} />
          <Route path="/register" exact component={Register} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
