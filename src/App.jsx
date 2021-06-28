import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Products from "./components/Products";
import Friends from "./components/Friends";
import FriendForm from "./components/FriendForm";
import Cars from "./components/Cars";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar></Navbar>

        <Header></Header>

        <main role="content" style={{ marginTop: "80px" }}>
          <Route path="/register" exact={true} component={Register}></Route>

          <Route path="/login" exact={true} component={Login}></Route>

          <Route
            path="/homepage"
            exact={true}
            component={Homepage}
            {...this.props}
          ></Route>

          <Route path="/products" exact={true} component={Products}></Route>

          <Route path="/friends" exact={true} component={Friends}></Route>
          <Route
            path="/friends/:id/edit"
            exact={true}
            component={FriendForm}
          ></Route>

          <Route path="/cars" exact={true} component={Cars}></Route>
        </main>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
