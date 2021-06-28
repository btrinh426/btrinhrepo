import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import SiteNav from "./components/SiteNav";
// import Jumbo from "./components/jumboComponent";
// import Content from "./components/contentComponent";
import Product from "./components/ProductForm";
import Cars from "./components/Cars";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Friend from "./components/FriendForm";
import FriendList from "./components/FriendList";
import Job from "./components/JobForm";
import JobList from "./components/JobList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <SiteNav />
        </div>
        <br />
        <br />
        <br />
        <div>
          <Route path="/register" exact={true} component={Register}></Route>
          <Route path="/login" exact={true} component={Login}></Route>
          <Route path="/homepage" exact={true} component={Homepage}></Route>
          <Route
            path="/friendform/:friendId(\d+)"
            exact={true}
            component={Friend}
          ></Route>
          <Route path="/friendform/new" exact={true} component={Friend}></Route>
          <Route path="/friendlist" exact={true} component={FriendList}></Route>
          <Route
            path="/jobform/:jobId(\d+)"
            exact={true}
            component={Job}
          ></Route>
          <Route path="/jobform/new" exact={true} component={Job}></Route>
          <Route path="/joblist" exact={true} component={JobList}></Route>
          {/* Assessment Routes */}
          <Route path="/productform" exact={true} component={Product}></Route>
          <Route path="/cars" exact={true} component={Cars}></Route>
        </div>
        <br />
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
