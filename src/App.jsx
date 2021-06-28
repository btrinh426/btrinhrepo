import React, { Component } from "react";

import Footer from "./Components/Footer";
import SiteNav from "./Components/SiteNav";
import HomePage from "./Components/HomePage";
import { Route } from "react-router-dom";
import RegisterForm from "./Components/auth/RegisterForm";
import LoginFormV2 from "./Components/auth/LoginFormV2";
import { withRouter } from "react-router-dom";
import Friends from "./Components/friends/Friends";
import * as userService from "./services/userServices";
import Blogs from "./Components/blogs/Blogs";
import Companies from "./Components/companies/Companies";
import Events from "./Components/events/Events";
import FriendFormV2 from "./Components/friends/FriendFormV2";
import Jobs from "./Components/jobs/Jobs";
import JobForm from "./Components/jobs/JobForm";
import SabioForm from "./Components/formik/SabioForm";
import "./App.css";

class App extends Component {
  state = {
    currentUser: {
      isLoggedIn: false,
      firstName: "",
      lastName: "",
      email: "",
      avatarUrl: "",
      id: "",
    },
  };

  componentDidMount() {
    userService
      //Check if current user is logged in
      .getCurrent()
      //If so, return the id
      .then(this.onSuccessGetUserId)
      //GET user with Id and push info to state for use in all components
      .then(userService.getById) // axios
      .then(this.onGetUserSuccess)
      //If not logged in, push to login page
      .catch(this.onNotLoggedIn);
  }
  onSuccessGetUserId = (response) => {
    return response.data.item.id; // return id
  };
  //push user info to currentUser in state
  onGetUserSuccess = (response) => {
    let currentUser = response.data.item;

    this.setState((prevState) => {
      let newState = {
        currentUser,
      };
      newState.currentUser.isLoggedIn = true;
      return newState;
    });
  };
  onNotLoggedIn = (data) => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <React.Fragment>
        <SiteNav {...this.props} currentUser={this.state.currentUser} />
        <main role="main">
          <Route path="/" exact>
            <HomePage
              {...this.props}
              currentUser={this.state.currentUser}
            ></HomePage>
          </Route>
          <Route path="/home" exact>
            <HomePage
              {...this.props}
              currentUser={this.state.currentUser}
            ></HomePage>
          </Route>
          <Route
            path="/friends/:id/edit"
            exact={true}
            component={FriendFormV2}
            {...this.props}
          ></Route>
          {/* *Code breaks if I move this up. */}
          <Route path="/friends" exact>
            <Friends
              {...this.props}
              currentUser={this.state.currentUser}
            ></Friends>
          </Route>
          {/* <Route path="/friends/search/">
            <SearchResults {...this.props}></SearchResults>
          </Route> */}
          <Route
            path="/friends/add"
            exact
            component={FriendFormV2}
            {...this.props}
          ></Route>

          <Route path="/blogs">
            <Blogs />
          </Route>
          <Route path="/companies">
            <Companies />
          </Route>
          <Route path="/jobs" exact={true}>
            <Jobs {...this.props} />
          </Route>
          <Route
            path="/jobs/add"
            {...this.props}
            exact={true}
            component={JobForm}
          />
          <Route path="/events">
            <Events />
          </Route>
          <Route path="/register">
            <RegisterForm {...this.props} />
          </Route>
          <Route path="/practice" component={SabioForm} {...this.props} exact />
          <Route path="/login">
            <LoginFormV2 {...this.props} currentUser={this.state.currentUser} />
          </Route>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
