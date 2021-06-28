import React, { Component } from "react";
//import Nav from "./SiteNav/SiteNav";
//import Footer from "./footer/Footer";
//import Login from "./Login/Login";
//import * as userService from "./services/usersService";
import { withRouter } from "react-router-dom";
import AddEntity from "./AddEntity";
class App extends Component {
  // componentDidMount() {
  //   const data = {
  //     email: "user@google.com",
  //     password: "Reactpassword123!",
  //     tenantId: "bootcamp2",
  //   };
  //   const payload = data;
  //   userService
  //     .login(payload)
  //     .then(this.onLogInSuccess)
  //     .catch(this.onLogInError);
  // }
  // onLogInSuccess = () => {
  //   console.log("Login Success @", new Date());
  // };
  // onLogInError = (err) => {
  //   console.error(err);
  // };
  // componentDidUpdate(prevProps) {
  //   let currentPath = this.props.location.pathname;
  //   let prevPath = prevProps.location.pathname;
  //   console.log("App", { currentPath, prevPath });
  // }
  render() {
    return (
      <React.Fragment>
        <AddEntity />
        {/* //<Footer /> */}
      </React.Fragment>
    );
  }
}
export default withRouter(App);