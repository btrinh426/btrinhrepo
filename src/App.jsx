import React, { Component } from "react";
import Footer from "./Components/Footer";
import SiteNav from "./Components/SiteNav";
import HomePage from "./Components/HomePage";
import { Route } from "react-router-dom";
import RegisterForm from "./Components/RegisterForm";
import Content from "./Components/Content";
import * as userService from "./services/userServices";
import "./App.css";

class App extends Component {
  componentDidMount() {
    var payload = {
      email: "joe@example.com",
      password: "Testing1!@",
      tenantId: "U012YNYNGAW",
    };

    userService.logIn(payload);
  }

  render() {
    return (
      <React.Fragment>
        <SiteNav />
        <main role="main">
          <Route path="/home" exact>
            <HomePage />
            <Content />
          </Route>
          <Route path="/friends"></Route>
          <Route path="/blogs"></Route>
          <Route path="/companies"></Route>
          <Route path="/jobs"></Route>
          <Route path="/events"></Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/login"></Route>

          {/* <Route path="/content2">
            <Jumbo />
            <Content />
          </Route> */}
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
