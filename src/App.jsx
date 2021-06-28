import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom"; // NavLink
import * as userService from "./services/userService";
import SiteNav from "./components/public/SiteNav";
import Home from "./components/public/Home";
import Jumbo from "./components/public/Jumbo";
import Content from "./components/public/Content";
import Footer from "./components/public/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Blogs from "./components/public/Blogs";
import Friends from "./components/public/friends/Friends";
import FriendForm from "./components/public//friends/FriendForm";
import WidgetForm from "./widget/Widget";
import JobsForm from "./components/public/jobs/JobsForm";
import Jobs from "./components/public/jobs/Jobs";
import TechCo from "./components/public/techcompanies/TechCo";
// import Events from "./components/public/Events";
import EventMain from "./components/public/events/EventMain";
import Cars from "./components/public/cars/Cars";
// import Aircraft from "./components/public/aircraft/Aircraft";
import EventForm from "./components/public/events/EventForm";
// import DogForm from "./components/public/test/DogForm";
import AircraftWizard from "./components/public/aircraft/wizard/AircraftWizard";

// import FormTest from "./ztest/FormTest";

import "./App.css";
import "rc-pagination/assets/index.css";
// import { update } from "./services/friendsService";

class App extends Component {
  state = {
    isUserLoggedIn: false,
    friendList: [],
    currentUser: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "",
    },
    fullName: "",
  };

  componentDidMount() {
    // console.log("... App > componentDidMount firing ...");
    this.checkUser();
  }

  checkUser = () => {
    if (!this.state.isUserLoggedIn) {
      userService
        .current()
        .then(this.onGetCurrentUserSuccess)
        .then(userService.getById)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetCurrentUserFail);
    }
  };

  onGetCurrentUserSuccess = (data) => {
    console.log("... App > onGetCurrentUserSuccess firing ...", { data });
    return data.item.id;
  };

  onGetByIdSuccess = (data) => {
    console.log("... App > onGetByIdSuccess firing ...", { data });
    let currentUser = data.item;
    let fullName = currentUser.firstName + " " + currentUser.lastName;
    this.setState((prevState) => {
      return {
        ...prevState,
        isUserLoggedIn: true,
        currentUser: {
          currentUser,
        },
        fullName,
      };
    });

    this.props.history.push("/");
  };
  onGetCurrentUserFail = (err) => {
    console.log("... App > onGetCurrentUserFail firing ...", { err });
    this.props.history.push("/login");
  };

  // componentDidUpdate(prevProps) {
  //   console.log("... App > componentDidUpdate firing ...");
  //   let currentPath = this.props.location.pathname;
  //   let previousPath = prevProps.location.pathname;
  //   console.log("app", { currentPath, previousPath });
  // }

  onLogoutEvent = () => {
    // to tie Logout Component to App state
    console.log("... App > onLogoutEvent firing ...");

    this.setState((prevState) => {
      return {
        ...prevState,
        isUserLoggedIn: false,
      };
    });

    this.props.history.push("/login");
  };

  onLoginEvent = () => {
    // to tie Logout Component to App state
    console.log("... App > onLogoutEvent firing ...");
    this.checkUser();
  };

  onFriendListChange = (newFriendList) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        friendList: newFriendList,
      };
    });
  };

  onFriendUpdate = (index, updatedFriend) => {
    this.setState((prevState) => {
      const updatedList = prevState.friendList;
      updatedList[index] = updatedFriend;
      console.log("inside onFriendUpdate", index, updatedFriend);
      return {
        ...prevState,
        friendList: updatedList,
      };
    });
  };

  render() {
    return (
      <>
        {/* send logoutUpdate function to SiteNav and get Logout class to use it to fire logout */}
        {/* <SiteNav /> */}
        <SiteNav
          onLogout={this.onLogoutEvent}
          userName={this.state.isUserLoggedIn ? this.state.fullName : "ERROR"}
          isUserLoggedIn={this.state.isUserLoggedIn}
          {...this.props}
        />
        <main role="main" className="row mt-5 pt-5">
          {/* Link user to home and jumbo page display */}
          <Route
            path="/"
            exact={true}
            render={() => (
              <Home currentUser={this.state.currentUser} {...this.props}></Home>
            )}
          ></Route>
          <Route
            path="/aircraftwizard"
            exact={true}
            render={() => (
              <AircraftWizard
                currentUser={this.state.currentUser}
                {...this.props}
              ></AircraftWizard>
            )}
          ></Route>
          <Route
            path="/home"
            exact={true}
            render={() => (
              <Home currentUser={this.state.currentUser} {...this.props}></Home>
            )}
          ></Route>
          <Route path="/blogs" exact={true} component={Blogs}></Route>

          <Route
            path="/friends"
            exact={true}
            render={() => (
              <Friends
                onFriendListChange={this.onFriendListChange}
                friendList={this.state.friendList}
                {...this.props}
              ></Friends>
            )}
          ></Route>
          {/* onFriendListChange */}

          <Route
            path="/friends/:friendId(\d+)/add"
            exact={true}
            render={() => (
              <FriendForm
                onFriendListChange={this.onFriendListChange}
                friendList={this.state.friendList}
                {...this.props}
              ></FriendForm>
            )}
          ></Route>
          <Route
            path="/friends/:friendId(\d+)/edit"
            exact={true}
            render={() => (
              <FriendForm
                onFriendUpdate={this.onFriendUpdate}
                friendList={this.state.friendList}
                {...this.props}
              ></FriendForm>
            )}
          ></Route>
          {/* <Route path="/aircraft" exact={true} component={Aircraft}></Route> */}
          <Route path="/jobs" exact={true} component={Jobs}></Route>
          <Route path="/jobs/add" exact={true} component={JobsForm}></Route>
          <Route
            path="/jobs/:jobid(\d+)/edit"
            exact={true}
            component={JobsForm}
          ></Route>

          <Route path="/techcompanies" exact={true} component={TechCo}></Route>
          <Route path="/events" exact={true} component={EventMain}></Route>
          <Route path="/events/add" exact={true} component={EventForm}></Route>
          <Route
            path="/events/:eventid(\d+)/edit"
            exact={true}
            component={EventMain}
          ></Route>
          <Route path="/widget" exact={true} component={WidgetForm}></Route>
          <Route path="/cars" exact={true} component={Cars}></Route>

          <Route
            path="/login"
            exact={true}
            render={() => (
              <Login onLogin={this.onLoginEvent} {...this.props}></Login>
            )}
          ></Route>
          <Route path="/register" exact={true} component={Register}></Route>
          {/* <Route path="/formtest" exact={true} component={FormTest}></Route> */}
          {/* /jumbo/:id   route parameter  shows up downstream in props.match.params */}
          {/* with match parameters of one or more than one digits */}
          {/* in component   this.props.match.params.productId */}
          {/* path="/jumbo/:productId(\d+)" */}
          <Route path="/jumbo" exact={true} component={Jumbo}></Route>
          <Route path="/content" exact={true} component={Content}></Route>
        </main>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
