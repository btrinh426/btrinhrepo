import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import SiteNav from "./SiteNav";
import Jumbo from "./Jumbo";
import Content from "./Content";
import Footer from "./Footer";
import axios from "axios";
import Register from "./Register";
import Widget from "./codingchallenge/widget";
import "./App.css";
import "rc-pagination/assets/index.css";

class App extends Component {
  componentDidMount() {
    // var payload = { email: "user@google.com", password: "password" };
    // const config = {
    //   method: "_PICK_A_HTPP_METHOD",
    //   url: "_A_URL_GOES_HERE",
    //   data: payload,
    //   withCredentials: true,
    //   crossdomain: true,
    //   headers: { "Content-Type": "application/json" },
    // };
    // return axios(config);
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav></SiteNav>
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <main role="main">
            <NavLink to="/widget">Create Widget</NavLink>
            <Route path="/widget" component={Widget}></Route>
            {/* <Widget></Widget> */}
            {/* <Register></Register> */}
            {/* <Jumbo></Jumbo>
            <Content></Content> */}
          </main>
          {/* <Footer></Footer> */}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
