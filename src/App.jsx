import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Products from "./components/Products";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar></Navbar>

        <Header></Header>

        <main role="content">
          <Route path="/register" exact={true} component={Register}></Route>

          <Route path="/login" exact={true} component={Login}></Route>

          <Route
            path="/homepage"
            exact={true}
            component={Homepage}
            {...this.props}
          ></Route>

          <Route path="/products" exact={true} component={Products}></Route>
        </main>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
