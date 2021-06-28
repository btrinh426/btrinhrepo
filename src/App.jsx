import React, { Component } from "react";
import SiteNav from "./component/SiteNav"
import Jumbo from "./component/Jumbo"
import Content from "./component/Content"
import Footer from "./component/Footer"
import { BrowserRouter,NavLink,Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
        <SiteNav></SiteNav>     
        <Jumbo></Jumbo>
        <Content></Content>
        <Footer></Footer>
      
      </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
