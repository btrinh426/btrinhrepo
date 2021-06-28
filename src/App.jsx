import React, { Component } from "react";
import Nav from "./SiteNav/SiteNav";
import Footer from "./footer/Footer";
import Jumbo from "./Jumbo/Jumbo";
import Content from "./Content/Content";
import * as userService from './services/userService';
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {

  componentDidMount() {
    const data = { email: "user@google.com", password: "Reactpassword123!", tenantId: "bootcamp2" };
    const payload = data;
    userService.userLogin(payload)
      .then(this.onLogInSuccess)
      .catch(this.onLogInError)
  };

  onLogInSuccess = (response) => {
    console.log('Login Success @', new Date());
  };

  onLogInError = (response) => {
    console.warn({ error: response })
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Nav />
          <Jumbo />
          <Content />
          <Footer />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
