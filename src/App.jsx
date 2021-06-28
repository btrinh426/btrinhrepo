import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer";
import SiteNav from "./Components/SiteNav";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div className="main" />
          <SiteNav></SiteNav>
          <Footer></Footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
