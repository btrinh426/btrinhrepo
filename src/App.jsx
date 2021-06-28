import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Home from "./Components.file/Home";
import Register from "./Components.file/Register";
import Login from "./Components.file/Login";
import SiteNav from "./Components.file/Site.Nav";
import Footer from "./Components.file/Footer";
import ProductForm from "./Components.file/ProductForm";
import Events from "./Components.file/Events";
import Friends from "./Components.file/Friends";
import Blogs from "./Components.file/Blogs";
import Jobs from "./Components.file/Jobs";
import TechCompanies from "./Components.file/TechCompanies";
import FriendsForm from "./Components.file/FriendsForm";
import Cars from "./Components.file/Cars";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav />
          <main role="main">
            <div>
              <Route
                path="/techcompanies"
                exact={true}
                component={TechCompanies}
              ></Route>
              <Route
                path="/friendsform"
                exact={true}
                component={FriendsForm}
                example="title"
              ></Route>
              <Route path="/jobs" exact={true} component={Jobs}></Route>
              <Route path="/cars" exact={true} component={Cars}></Route>
              <Route path="/blogs" exact={true} component={Blogs}></Route>
              <Route path="/friends" exact={true} component={Friends}></Route>
              <Route path="/events" exact={true} component={Events}></Route>
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
