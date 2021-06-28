import React, { Component } from "react";
import SiteNav from "./components/SiteNav.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import People from "./components/People.jsx";
import PersForm from "./components/PersForm.jsx";
import Jobs from "./components/Jobs.jsx";
//assesments
import Cars from "./assesments/Cars.jsx";
import { Route, withRouter } from "react-router-dom";
import * as userServices from "./services/userServices";
import "rc-pagination/assets/index.css";
import JobForm from "./components/JobForm.jsx";
import "./App.css";

class App extends Component {
  state = {
    userInfo: {
      isUserLoggedIn: "",
      activeUserInfo: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        avatarUrl: "",
      },
    },
  };

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    userServices
      .currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  };

  onCurrentUserSuccess = (response) => {
    var userId = response.data.item.id;

    userServices
      .userInfo(userId)
      .then(this.onUserInfoSuccess)
      .catch(this.onUserInfoError);
  };

  onUserInfoSuccess = (response) => {
    this.setUser(response.data.item);
  };

  setUser = (userData) => {
    this.setState(
      (prevState) => {
        let userInfo = { ...prevState.userInfo };

        //make this equal to previous state and change the userlogin and formdata....

        if (userData) {
          userInfo.isUserLoggedIn = true;
          let dataTarget = userInfo.activeUserInfo;

          dataTarget.id = userData.id;
          dataTarget.firstName = userData.firstName;
          dataTarget.lastName = userData.lastName;
          dataTarget.email = userData.email;
          dataTarget.avatarUrl = userData.avatarUrl;
        } else {
          userInfo.isUserLoggedIn = false;

          userInfo.activeUserInfo = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            avatarUrl: "",
          };
        }
        return { userInfo };
      },
      () => {
        this.props.history.push("/");
      }
    );
  };

  onUserInfoError = (response) => {
    console.warn(response);
  };
  onCurrentUserError = (response) => {
    this.setUser();
  };

  render() {
    return (
      <React.Fragment>
        <main role="main" id="site-container">
          <SiteNav
            {...this.props}
            userState={this.state.userInfo.isUserLoggedIn}
            currentUser={this.state.userInfo.activeUserInfo}
            setCurrentUser={this.getCurrentUser}
          ></SiteNav>

          <Route
            path="/"
            exact
            render={(routeProps) => (
              <Home
                {...routeProps}
                firstName={this.state.userInfo.activeUserInfo.firstName}
                lastName={this.state.userInfo.activeUserInfo.lastName}
              />
            )}
          ></Route>

          <Route path="/people/form" exact={false} component={PersForm}></Route>
          <Route path="/jobs/form" exact={false} component={JobForm} />
          <Route
            path="/login"
            exact
            render={(routeProps) => (
              <Login {...routeProps} setCurrentUser={this.getCurrentUser} />
            )}
          ></Route>

          <Route path="/people" exact component={People}></Route>
          <Route path="/jobs" exact component={Jobs} />
          <div className="container">
            <Route path="/cars" exact component={Cars}></Route>
          </div>

          <Route path="/register" exact component={Register} />

          <Footer></Footer>
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
