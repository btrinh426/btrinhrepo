import React, { Component } from "react";
import { Route } from "react-router-dom"
import { withRouter } from "react-router-dom";
import "./App.css";

import Cars from "./components/Cars";
import Footer from "./components/Footer";
import FriendForm from "./components/FriendForm";
import Friends from "./components/Friends";
import SiteNav from "./components/SiteNav";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import ProductForm from "./components/ProductForm";
import Register from "./components/Register";

class App extends Component {

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    console.log({ currentPath, previousPath })
  }
  render() {
    return (
      <React.Fragment>
        <SiteNav></SiteNav>
        <Cars></Cars>
        <Route
          path="/home"
          exact={true}
          component={HomePage}
        />

        <Route
          path="/login"
          exact={true}
          component={Login}
        />

        <Route
          path="/register"
          exact={true}
          component={Register}
        />

        <Route
          path="/pForm"
          exact={true}
          component={ProductForm}
        />

        <Route
          path="/friendForm"
          exact={true}
          component={FriendForm}
        />

        <Route
          path="/friends"
          exact={true}
          component={Friends}
        />

        <Footer></Footer>
      </React.Fragment >
    );
  }
}

export default withRouter(App);
