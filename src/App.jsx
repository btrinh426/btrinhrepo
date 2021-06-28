import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import SiteNav from "./components/SiteNav";
import Jumbo from "./components/Jumbo";
import Footer from "./components/Footer";
import axios from "axios";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Friends from "./components/Friends";
import FriendForm from "./components/FriendForm";
import JobForm from "./components/JobForm";
import Cars from "./codingchallenge/Cars";
import "./App.css";
import "rc-pagination/assets/index.css";

class App extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav></SiteNav>
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <main role="main">
            <Route path="/home" exact={true} component={Home}></Route>
            <Route path="/register" exact={true} component={Register}></Route>
            <Route path="/login" exact={true} component={Login}></Route>
            <Route path="/friends" exact={true} component={Friends}></Route>
            <Route
              path="/friends/friendform"
              exact={true}
              component={FriendForm}
            ></Route>
            <Route
              path="/friends/:id/edit"
              exact={true}
              component={FriendForm}
            ></Route>
            <Route
              path="/jobs/jobform"
              exact={true}
              component={JobForm}
            ></Route>
            <Route path="/cars" exact={true} component={Cars}></Route>

            {/* <Route path="/friends" exact={true} component={Friends}></Route>
            <Route path="/blog" exact={true} component={Blogs}></Route>
            <Route
              path="/techcompanies"
              exact={true}
              component={TechCompanies}
            ></Route>
            <Route path="/jobs" exact={true} component={Jobs}></Route>
            <Route path="/events" exact={true} component={Events}></Route>
            <Route path="/register" exact={true} component={Register}></Route> */}
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
