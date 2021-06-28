import React, { Component } from "react";
import SiteNav from "./SiteNav";
import "./App.css";
import Jumbo from "./Jumbo";
import Content from "./Content";
import Footer from "./Footer";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "rc-pagination/assets/index.css";
// import "rc-pagination/assets/index.css";

import Cars from "./Cars";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav />

          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
