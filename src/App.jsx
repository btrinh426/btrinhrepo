import React, { Component } from "react";
import Footer from "./components/footer";
import Homepage from "./components/Homepage";
import { withRouter, Route } from "react-router-dom";
import Form from "./components/RegisterForm";
import Login from "./components/Login";
import FriendsRegister from "./components/friends/FriendsRegister";
import FriendsAll from "./components/friends/FriendsAll";
import UserHome from "./components/UserHome";
import Widget from "./components/codingAssessment/Widget";
import Cars from "./components/codingAssessment/Cars";
import Jobs from "./components/jobs/Jobs";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Homepage />
        <Cars />
        <Route path="/widget" exact={true} component={Widget} />
        <Route path="/" exact={true} />
        <Route path="/userhome" exact={true} component={UserHome} />

        <Route path="/friends" exact={true} component={FriendsAll} />
        <Route
          path="/friends/edit/:friendId"
          exact={true}
          component={FriendsRegister}
        />
        <Route path="/friends/new" exact={true} component={FriendsRegister} />

        <Route path="/jobs" exact={true} component={Jobs} />

        <Route path="/form" exact={true} component={Form} />
        <Route path="/login" exact={true} component={Login} />
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
