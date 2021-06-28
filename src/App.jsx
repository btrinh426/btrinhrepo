import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";

import FooterComponent from "./FooterComponent";
import SiteNavComponent from "./SiteNavComponent";

import Cars from "./Cars";

class App extends Component {
  // state = {
  //   currentUser: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: "",
  //     passwordConfirm: "",
  //     avatarURL: "",
  //   },
  // };
  // componentDidUpdate(prevProps) {
  //   let currentPath = this.props.location.pathname;
  //   let previousPath = prevProps.location.pathname;

  //   console.log("App", { currentPath, previousPath });
  // }

  // componentDidMount() {
  //   console.log("componentDidMount");

  //   // gettingCurrentUsers = ()=>{
  //   userService
  //     .getCurrentUsers()
  //     .then(this.getUserSuccess)
  //     .catch(this.getUserFail);
  // }

  // getUserSuccess = (response) => {
  //   console.log("Current user found", response);
  //   userService
  //     .getUsersById(response.data.item.id)
  //     .then(this.getIdSuccess)
  //     .catch(this.getIdFail);
  // };

  // getUserFail = (err) => {
  //   console.warn(err);
  //   return "No users found";
  // };

  // getIdSuccess = (resp) => {
  //   console.log("user found by ID");
  //   // let fName = resp.data.item.firstName;
  //   let stateTwo = { ...resp.data.item };
  //   // stateTwo.firstName = fName;
  //   this.setState({ currentUser: stateTwo });
  // };

  // getIdFail = (data) => {
  //   console.log("no user found", data);
  // };

  render() {
    console.log("rendering");
    return (
      <React.Fragment>
        <SiteNavComponent {...this.props}></SiteNavComponent>

        <main role="main">
          <Route
            path="/"
            exact={true}
            render={(routeProps) => <Cars {...routeProps}></Cars>}
          ></Route>
        </main>

        <FooterComponent></FooterComponent>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
