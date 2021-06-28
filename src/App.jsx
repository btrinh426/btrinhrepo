import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import SideNav from "./Components/NavSide";
import Jumbo from "./Components/Jumbo";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import Login from "./Components/Login";
import UserHome from "./Components/UserHome";
import Friends from "./Components/Friends";
import FriendAdd from "./Components/FriendAdd";
import * as usersService from "./services/userService";
import Jobs from "./Components/Jobs";
import JobAdd from "./Components/JobAdd";
import { withRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  state = {
    userData: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "email@gmail.com",
      password: "Password1!",
      passwordConfirm: "Password1!",
      avatarUrl:
        "https://i.pinimg.com/236x/52/90/26/529026138c2df5897e4f758082b5a3bd.jpg",
      tenantId: "TrelloUser",
      isLoggedIn: false,
    },
  };

  componentDidMount = () => {
    console.log(this.state);
    usersService
      .currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  };

  getCurrentUser = () => {
    usersService
      .currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Previous Props", prevProps);
    console.log("Current Props", this.props);
    if (
      this.props.location.state &&
      this.props.location.state.type === "LOGOUT" &&
      this.state.userData.isLoggedIn
    ) {
      console.log("Request to Logout");
      this.setState((prevState) => {
        let userData = { ...prevState.userData };

        userData.firstName = "";
        userData.lastName = "";
        userData.avatarUrl = "";
        userData.isLoggedIn = false;
        userData.id = 0;
        return { userData };
      });
    }
    // else if for login, similar to how we did the logout
    else if (
      this.props.location.state &&
      this.props.location.state.type === "LOGIN" &&
      !this.state.userData.isLoggedIn
    ) {
      console.log("Request to Login");
      this.getCurrentUser();
    }
  }

  // when get user is successful, change state
  onCurrentUserSuccess = (response) => {
    console.log({ response });
    var id = response.data.item.id;
    usersService
      .currentUserById(id)
      .then(this.onCurrentUserByIdSuccess)
      .catch(this.onCurrentUserByIdError);
  };
  onCurrentUserError = (error) => {
    console.error("App User not Logged In", error);
  };
  onCurrentUserByIdSuccess = (response) => {
    console.log({ response });

    this.setState((prevState) => {
      let userData = { ...prevState.userData };

      userData.firstName = response.data.item.firstName;
      userData.lastName = response.data.item.lastName;
      userData.avatarUrl = response.data.item.avatarUrl;
      userData.isLoggedIn = true;
      userData.id = response.data.item.id;
      return { userData };
    });
  };
  onCurrentUserByIdError = (error) => {
    console.error(error);
  };

  render() {
    console.log("App is rendering");
    return (
      <React.Fragment>
        <NavBar {...this.props} user={this.state.userData}></NavBar>
        <SideNav {...this.props} user={this.state.userData}></SideNav>

        <main role="main">
          <Route path="/home/" exact={true} component={Jumbo}></Route>
          <Route path="/home/" exact={true} component={Content}></Route>
          <Route path="/register/" exact={true} component={Register}></Route>
          <Route path="/login/" exact={true} component={Login}></Route>
          <Route path="/friends/" exact={true} component={Friends}></Route>
          <Route
            path="/home/TrelloUser"
            render={() => <UserHome user={this.state.userData} />}
          ></Route>
          <Route
            path={["/friends/:friendId(\\d+)/edit/", "/friends/add/"]}
            exact={false}
            component={FriendAdd}
          ></Route>
          <Route
            path={["/jobs/", "/jobs/:jobId(\\d+)/info/", "/jobs/?q="]}
            exact={true}
            component={Jobs}
          ></Route>
          <Route
            path={["/jobs/:jobId(\\d+)/edit/", "/jobs/add/"]}
            exact={false}
            component={JobAdd}
          ></Route>
        </main>
        {/* <Footer></Footer> */}
      </React.Fragment>
    );
  }
}

export default withRouter(App);
