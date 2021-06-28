import React, { Component } from "react";
import Footer from "./components/Footer";
import SiteNav from "./components/SiteNav";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route } from "react-router-dom"
import "./App.css";

import { withRouter } from "react-router-dom";
import ProductForm from "./components/ProductForm";


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

        <Route
          path="/home/:id"
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

        <Route path="/pForm"
          exact={true}
          component={ProductForm}
        />

        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
