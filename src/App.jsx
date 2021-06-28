import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";
import HomePage from "./HomePage";
import SiteNav from "./SiteNav";
import Footer from "./Footer";
import Profile from "./friends/Profile";
import FriendsList from "./friends/FriendsList";
import CreateJob from "./Job/CreateJob";
import JobList from "./Job/JobList";
import { Route, withRouter } from "react-router-dom";
import Hola from "./Hola";
import "./App.css";

class App extends Component {
  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    console.log("App", { currentPath, previousPath });
  }

  render() {
    return (
      <div>
        <SiteNav />
        <Route path="/Hola" component={Hola} />
        <Route path="/JobList" component={JobList} />
        <Route path="/createJob" component={CreateJob} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/homePage" component={HomePage} />
        <Route path="/profile/new" exact={true} component={Profile} />
        <Route
          path="/profile/:friendId/edit"
          exact={true}
          component={Profile}
        />
        <Route path="/friendsList" component={FriendsList} />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
