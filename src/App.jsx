import React, { Component } from "react";
import Footer from "./pageParts/Footer";
import SiteNav from "./pageParts/SiteNav";
import Friends from "./pageParts/Friends";
import AddFriend from "./pageParts/AddFriend";
//import Content from "./pageParts/Content";
import Login from "./pageParts/Login";
//import * as userService from "./services/userService";
import { withRouter, Route /*, NavLink*/ } from "react-router-dom";
import Home from "./pageParts/Home";
import Register from "./pageParts/Register";
import "./App.css";
import * as userService from "./services/userService";
import ProductForm from "./ProductForm";
import Jobs from "./pageParts/Jobs";
import AddJob from "./pageParts/AddJob";
class App extends Component {
  state = {
    userData: {
      id: "",
      name: "fake name",
      roles: "",
      tenantId: "",
      siteId: "",
    },
  };

  componentDidMount() {
    console.log("App componenet mounted");

    this.getUser();
  }

  logUserout = () => {
    console.log("in log user out, App");
    userService
      .logUserOut()
      .then(this.onLogoutSuccess)
      .catch(this.onLogoutError);
  };
  onLogoutSuccess = (response) => {
    console.log("you logged out");
    console.log(response);
    this.setState((prevState) => {
      return { prevState, isLoggedIn: false };
    });

    this.props.history.push("/login");
  };

  onLogoutError = (errResponse) => {
    console.log("logout error");
  };

  getUser = () => {
    console.log("in get user");
    userService
      .getCurrentUser()
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  logUserIn = () => {
    console.log("in log user in, app");
    this.getUser();
  };
  onActionSuccess = (response) => {
    console.log("it worked");
    console.log(response.data.item);

    this.setState((prevState) => {
      let newValues = response.data.item;
      let newState = { ...prevState.userData };
      newState = newValues;
      return { prevState, userData: newState, isLoggedIn: true };
    });
  };

  onActionError = (errResponse) => {
    console.log("it didnt work");
    this.setState(() => {
      return { isLoggedIn: false };
    });
  };

  render() {
    return (
      <>
        <div className="App">
          <Route
            render={(props) => (
              <SiteNav
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                currentUser={this.state.userData}
                logout={this.logUserout}
              ></SiteNav>
            )}
          ></Route>
          <main
            role="main"
            style={{
              backgroundImage: "url(/2.jpg)",
              backgroundSize: `cover`,
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          >
            <div>
              <Route path="/productform" exact={true} component={ProductForm} />
              <Route
                path="/home"
                exact
                render={(props) => (
                  <Home
                    {...props}
                    isLoggedIn={this.state.isLoggedIn}
                    currentUser={this.state.userData}
                  ></Home>
                )}
              ></Route>

              <Route path="/register">
                <Register></Register>
              </Route>

              <Route
                path="/login"
                exact
                render={(props) => (
                  <Login
                    {...props}
                    isLoggedIn={this.state.isLoggedIn}
                    currentUser={this.state.userData}
                    logIn={this.logUserIn}
                  ></Login>
                )}
              ></Route>
              <Route path="/jobs" component={Jobs} />
              <Route path="/jobs/add" component={AddJob} />
              <Route path="/friends/edit" component={AddFriend} />
              <Route path="/friends/add" component={AddFriend} />
              <Route path="/friends" exact={true} component={Friends}></Route>
            </div>
            <Footer />
            Words at the bottom
          </main>
        </div>
      </>
    );
  }
}

export default withRouter(App);
