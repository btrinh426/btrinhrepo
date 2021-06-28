import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, withRouter } from "react-router-dom";
import "./App.css";

import FooterComponent from "./FooterComponent";
import SiteNavComponent from "./SiteNavComponent";
import JumboComponent from "./JumboComponent";
import ContentComponent from "./ContentComponent";
import * as userService from "./services/userService";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Friends from "./Friends";
import FriendsAdd from "./FriendsAdd";
import Jobs from "./Jobs";
import JobsAdd from "./JobsAdd";
import Cars from "./Cars";

class App extends Component {
  state = {
    currentUser: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarURL: "",
    },
  };
  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    console.log("App", { currentPath, previousPath });
  }

  componentDidMount() {
    console.log("componentDidMount");

    // gettingCurrentUsers = ()=>{
    userService
      .getCurrentUsers()
      .then(this.getUserSuccess)
      .catch(this.getUserFail);
  }

  getUserSuccess = (response) => {
    console.log("Current user found", response);
    userService
      .getUsersById(response.data.item.id)
      .then(this.getIdSuccess)
      .catch(this.getIdFail);
  };

  getUserFail = (err) => {
    console.warn(err);
    return "No users found";
  };

  getIdSuccess = (resp) => {
    console.log("user found by ID");
    // let fName = resp.data.item.firstName;
    let stateTwo = { ...resp.data.item };
    // stateTwo.firstName = fName;
    this.setState({ currentUser: stateTwo });
  };

  getIdFail = (data) => {
    console.log("no user found", data);
  };

  render() {
    console.log("rendering");
    return (
      <React.Fragment>
        <SiteNavComponent {...this.props}></SiteNavComponent>

        <main role="main">
          <Route
            path="/"
            exact={true}
            render={() => <Home fName={this.state.currentUser}></Home>}
            // component={Cars}
          ></Route>

          <Route path="/about" exact={true} component={JumboComponent}></Route>

          <Route
            path="/about"
            exact={true}
            component={ContentComponent}
          ></Route>

          {/* <Route path="/friends" exact={true} component={Friends}></Route> */}

          <Route
            path="/register"
            exact={true}
            render={() => <Register></Register>}
          ></Route>
          <Route
            path="/login"
            exact={true}
            render={() => <Login {...this.props}></Login>}
          ></Route>

          <Route
            path="/friends"
            exact={true}
            render={(routeProps) => (
              <Friends {...routeProps} {...this.props}></Friends>
            )}
          ></Route>

          <Route
            path={["/friends/new"]}
            exact={true}
            render={(routeProps) => (
              <FriendsAdd {...routeProps} {...this.props}></FriendsAdd>
            )}
          ></Route>

          <Route
            path={"/friends/:friendId(\\d+)/edit"}
            exact={true}
            render={(routeProps) => <FriendsAdd {...routeProps}></FriendsAdd>}
          ></Route>

          <Route path={"/jobs"} exact={true} component={Jobs}></Route>

          <Route
            path={"/jobs/new"}
            exact={true}
            render={(routeProps) => <JobsAdd {...routeProps}></JobsAdd>}
          ></Route>

          <Route
            path={"/jobs/:jobId(\\d+)/edit"}
            exact={true}
            render={(routeProps) => <JobsAdd {...routeProps}></JobsAdd>}
          ></Route>
        </main>

        <FooterComponent></FooterComponent>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
