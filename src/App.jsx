import React, { Component, Fragment } from "react";
//import SiteNav from "./components/SiteNav"
//import Jumbo from "./components/Jumbo"
//import Content from "./components/Content"
import Footer from "./components/Footer"
//import Register from "./components/Register"
import Products from "./components/Products"
//import userService from "./Service/userService"

import "./App.css";


class App extends Component {

  render() {
    return (
      <Fragment>

        {/* <Register></Register> */}
        <Products></Products>
        {/* <userService></userService> */}
        {/* <SiteNav></SiteNav> */}
        {/* <Jumbo></Jumbo> */}
        {/* <Content></Content> */}
        <Footer></Footer>
      </Fragment>
    );
  }
}

export default App;
