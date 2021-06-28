import React, { Component } from "react";
import Footer from "./Components/Footer";
import SiteNav from "./Components/SiteNav";
import Jumbo from "./Components/Jumbo";
import Content from "./Components/Content";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import * as userService from "./services/userService";

import "./App.css";

class App extends Component {
  componentDidMount() {
    const data = { email: "user@google.com", password: "Reactpassword123!", tenantId: "bootcamp2" };
    const payload = data;

    //... code omitted.

    userService.logIn(payload)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }

  onActionSuccess = (response) => {
    console.log("I was clicked on", response, new Date());
    // do something
  }

  onActionError = (errResponse) => {
    console.log("There was an error on", errResponse, new Date());
    // do something
  }

  render() {
    return (
      <BrowserRouter>

        <SiteNav></SiteNav>
        <main role="main">
          <Jumbo></Jumbo>
          <Content></Content>
        </main>
        <Footer></Footer>


        <center>
          <NavLink to="/SiteNav">Render SiteNav </NavLink>

          <NavLink to="/Jumbo">Render Jumbo </NavLink>

          <NavLink to="/Content">Render Content </NavLink>

          <NavLink to="/Footer">Render Footer </NavLink>
        </center>


        <Route path="/SiteNav" exact={true} component={SiteNav}></Route>
        <Route path="/Jumbo" exact={true} component={Jumbo}></Route>
        <Route path="/Content" exact={true} component={Content}></Route>
        <Route path="/Footer" exact={true} component={Footer}></Route>
      </BrowserRouter >
    );
  }
}

export default App;

