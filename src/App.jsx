import React, { Component } from "react";
import userService from "./services/userService";
import TopBar from "./Components/TopBar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import LeftMenu from "./Components/LeftMenu";
import TitleBar from "./Components/TitleBar";
import FriendsDisplay from "./Components/FriendsDisplay";
import AddEditFriends from "./Components/addEditFriend";
import JobsDisplay from "./Components/JobsDisplay";
import AddEditJob from "./Components/addEditJob";
import EventsMain from "./Components/EventsMain";
import { Route, withRouter } from "react-router-dom";
import "./App.css";

import Cars from "./Components/Cars";

import ProductForm from "./Components/ProductForm";

class App extends Component {
  state = {
    siteName: "Sabio Warmup",
    tenantId: "UU1TRGELU",
    userLoggedIn: false,
    currentUser: {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      avatarUrl: "",
    },
  };

  componentDidMount = () => {
    userService
      .getCurrentUser()
      .then(this.onGetCurrentuserSuccess)
      .catch(this.onGetCurrentUserFail);
  };

  onGetCurrentuserSuccess = (response) => {
    userService
      .getUserInfoById(response.data.item.id)
      .then(this.onGetUserInfoSuccess)
      .catch(this.onGetUserInfoFail);
  };

  onGetUserInfoSuccess = (response) => {
    let currentUserData = response.data.item;
    let newState = { ...this.state };
    this.setState(() => {
      newState.userLoggedIn = true;
      newState.currentUser.userId = currentUserData.id;
      newState.currentUser.firstName = currentUserData.firstName;
      newState.currentUser.lastName = currentUserData.lastName;
      newState.currentUser.email = currentUserData.email;
      newState.currentUser.avatarUrl = currentUserData.avatarUrl;
      return newState;
    });
    if (this.props.location.pathname === "/") {
      this.props.history.push("/main");
    }
  };

  onGetCurrentUserFail = (error) => {
    console.log(error.response);
    this.props.history.push("/login");
  };

  onGetUserInfoFail = (error) => {
    console.log(error.response);
  };

  logOutUser = () => {
    let newState = { ...this.state };
    this.setState(() => {
      newState.userLoggedIn = false;
      newState.currentUser.userId = "";
      newState.currentUser.firstName = "";
      newState.currentUser.lastName = "";
      newState.currentUser.email = "";
      newState.currentUser.avatarUrl = "";
      return newState;
    });
    this.props.history.push("/login");
  };

  updateStateOnLogin = () => {
    userService
      .getCurrentUser()
      .then(this.onGetCurrentuserSuccess)
      .catch(this.onGetCurrentUserFail);
    this.props.history.push("/main");
  };

  render() {
    return (
      <React.Fragment>
        <div className="continer-flex bg-light" style={{ minHeight: "800px" }}>
          <TopBar
            siteName={this.state.siteName}
            userStatus={this.state.userLoggedIn}
            userName={this.state.currentUser.firstName}
            logOutUser={this.logOutUser}
            {...this.props}
          ></TopBar>
          <Route path="/login">
            <Login
              siteName={this.state.siteName}
              tenantId={this.state.tenantId}
              updateStateOnLogin={this.updateStateOnLogin}
            ></Login>
          </Route>
          <Route path="/register">
            <Register
              siteName={this.state.siteName}
              tenantId={this.state.tenantId}
              {...this.props}
            ></Register>
          </Route>
          <Route path="/products" exact={true}>
            <ProductForm></ProductForm>
          </Route>
          <Route path="/main" exact={false}>
            <div className="row">
              <LeftMenu
                isUserLoggedIn={this.state.userLoggedIn}
                {...this.props}
              ></LeftMenu>
              {/*Friends start*/}
              <Route path="/main/friends" exact={false}>
                <div className="col m-0 p-0">
                  <TitleBar title="Friends"></TitleBar>
                  <Route path="/main/friends" exact={true}>
                    <FriendsDisplay {...this.props}></FriendsDisplay>
                  </Route>
                  <Route
                    path="/main/friends/edit/:friendId"
                    exact={false}
                    component={AddEditFriends}
                  ></Route>
                  <Route
                    path="/main/friends/add"
                    exact={true}
                    render={(routeProps) => (
                      <AddEditFriends {...this.props}></AddEditFriends>
                    )}
                  ></Route>
                </div>
              </Route>
              {/*Friends end*/}
              {/*Jobs start*/}
              <Route path="/main/jobs" exact={false}>
                <div className="col m-0 p-0">
                  <TitleBar title="Jobs"></TitleBar>
                  <Route path="/main/jobs" exact={true}>
                    <JobsDisplay {...this.props}></JobsDisplay>
                  </Route>
                  <Route path={["/main/jobs/add", "/main/jobs/edit"]}>
                    <AddEditJob {...this.props}></AddEditJob>
                  </Route>
                </div>
              </Route>
              {/*Friends end*/}
              {/*Events Start */}
              <Route path="/main/events" exact={true}>
                <div className="col m-0 p-0">
                  <TitleBar title="Events"></TitleBar>
                  <EventsMain></EventsMain>
                </div>
              </Route>
              {/*Events End */}
              {/*Cars Start */}
              <Route path="/main/cars">
                <Cars></Cars>
              </Route>
              {/*Cars End */}
            </div>
          </Route>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
