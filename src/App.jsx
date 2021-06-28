import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Home from "./Components.file/Home";
import Register from "./Components.file/Register";
import Login from "./Components.file/Login";
import SiteNav from "./Components.file/Site.Nav";
import Footer from "./Components.file/Footer";
import ProductForm from "./Components.file/ProductForm";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div>
            <SiteNav></SiteNav>
          </div>

          <main role="main">
            <div>
              <Route path="/home" exact={true} component={Home}></Route>
              <Route path="/register" exact={true} component={Register}></Route>
              <Route path="/login" exact={true} component={Login}></Route>
              <Route
                path="/productform"
                exact={true}
                component={ProductForm}
              ></Route>
            </div>
          </main>

          <div>
            <Footer margin="350px"></Footer>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
