import React, { Component } from "react";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import NewForm from "./components/NewForm";
import Register from "./components/Register";
import Assessment from "./components/Assessment";

import "./App.css";
import { withRouter, BrowserRouter, NavLink, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SiteNav></SiteNav>
          <main>
            <div className="row">
              <Route path="/" exact={true} component={NewForm}></Route>
              <Route
                path="/assessment"
                exact={true}
                component={Assessment}
              ></Route>

              <Route path="/register" exact={true} component={Register}></Route>
            </div>
          </main>
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
