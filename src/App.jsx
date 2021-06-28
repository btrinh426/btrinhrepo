import React, { Component } from "react";
import Footer from "./Components/Footer";
import SiteNav from "./Components/SiteNav";
import HomePage from "./Components/HomePage";
import { Route } from "react-router-dom";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import { withRouter } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {
    currentUser: {
      isLoggedIn: false,
    },
  };
  render() {
    return (
      <React.Fragment>
        <SiteNav {...this.props} />
        <main role="main">
          <Route path="/home" exact>
            <HomePage {...this.props}></HomePage>
          </Route>
          <Route path="/friends"></Route>
          <Route path="/blogs"></Route>
          <Route path="/companies"></Route>
          <Route path="/jobs"></Route>
          <Route path="/events"></Route>
          <Route path="/register">
            <RegisterForm {...this.props} />
          </Route>
          <Route path="/login">
            <LoginForm {...this.props} />
          </Route>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
