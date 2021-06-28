import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import RegisterForm from "./Components/Register-Form";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Friends from "./Components/Friends";
import AddFriends from "./Components/AddFriends";
import Jobs from "./Components/Jobs";
import AddJobs from "./Components/AddJobs";
// import ProductForm from "./Components/ProductForm";
import Events from "./Components/Events";
import Cars from "./Components/Cars";
import "./App.css";
import "./Map.css";
import { withRouter } from "react-router-dom";
require("dotenv").config();

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route path="/home" exact={true} component={Home}></Route>
          <Route path="/register" exact={true} component={RegisterForm}></Route>
          <Route path="/login" exact={true} component={Login}></Route>
          <Route path="/friends" exact={true} component={Friends}></Route>
          <Route
            path="/addfriends/:friendId?"
            exact={false}
            component={AddFriends}
          ></Route>
          <Route path="/jobs" exact={true} component={Jobs}></Route>
          <Route
            path="/jobs/:jobId/edit"
            exact={false}
            component={AddJobs}
          ></Route>
          <Route path="/jobs/new" exact={false} component={AddJobs}></Route>
          <Route path="/events" exact={true} component={Events}></Route>
          <Route path="/cars" exact={true} component={Cars}></Route>
        </Layout>
      </Router>
    );
  }
}

export default withRouter(App);
