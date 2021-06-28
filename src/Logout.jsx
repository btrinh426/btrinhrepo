import React, { Component } from "react";
import "./App.css";
import * as userService from "./services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

class Logout extends Component {
  //!!!!!!MAKE SURE TO AJAX CURRENT USER BEFORE CHECKING USER BY ID

  logoutClicked = (e) => {
    e.preventDefault();
    userService
      .getCurrentUsers()
      .then(this.onGetCurrentUsersSuccess)
      .catch(this.onGetCurrentUsersFail);
    // userService.logOut()
  };

  onGetCurrentUsersSuccess = () => {
    userService.logOut().then(this.onLogOutSuccess).catch(this.onLogOutFail);
  };

  onGetCurrentUsersFail = () => {
    toast("No users are logged in");
  };

  onLogOutSuccess = (response) => {
    console.log(response);
    Swal.fire("You've Successfully Logged Out");
    // this.props.history.push("/login");
  };

  onLogOutFail = (err) => {
    console.error(err);
    toast("You are already logged out");
  };

  render() {
    return (
      <form onSubmit={this.logoutClicked}>
        <button type="submit" className="btn btn-primary submit loginBtn">
          Log Out
        </button>
      </form>
    );
  }
}

export default Logout;
