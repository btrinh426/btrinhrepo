import React, { Component } from "react";
import Nav from "./SiteNav/SiteNav";
import Footer from "./footer/Footer";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Home from "./Home/Home";
import AddContact from "./Friends/addFriend";
import * as userService from "./services/userService";
import { withRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import GetFriends from "./Friends/getFriends";

class App extends Component {
  componentDidMount() {
    const data = {
      email: "user@google.com",
      password: "Reactpassword123!",
      tenantId: "bootcamp2",
    };
    const payload = data;
    userService
      .userLogin(payload)
      .then(this.onLogInSuccess)
      .catch(this.onLogInError);
  }

  onLogInSuccess = () => {
    console.log("Login Success @", new Date());
  };

  onLogInError = (err) => {
    console.error(err);
  };

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let prevPath = prevProps.location.pathname;
    console.log("App", { currentPath, prevPath });
  }

  render() {
    return (
      <React.Fragment>
        {/* <Nav /> */}
        <AddContact {...this.props} />
        <GetFriends {...this.props} />
        <Register {...this.props} />
        <Home {...this.props} />
        <Login {...this.props} />
        
        <div className="row m-3">
          <Route path="/login" exactly={true} component={Home}></Route>
          <Route 
            path="/register/:userName"
            exact={true}
            render={(props) => <Home userName={props.match.params.userName} />}
          ></Route>
          <Route
            path="/logout"
            exact={true}
            component={Login}
          ></Route>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
