import React, { Component } from "react";
import SiteNav from "./SiteNav/SiteNav";
import Jumbo from "./Jumbo/Jumbo";
import Content from "./Content/Content";
import Footer from "./Footer/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SiteNav></SiteNav>
        <Jumbo></Jumbo>
        <Content></Content>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default App;
