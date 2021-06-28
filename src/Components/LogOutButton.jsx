import React from "react";
import * as userService from "../services/userServices";
import { toast } from "react-toastify";

class LogOutButton extends React.Component {
  //on click, call userService.logOut
  submitLogOut = () => {
    userService.logOut().then(this.onLogOutSuccess).catch(this.onLogOutError);
  };
  //Logout successful, redirect to login
  onLogOutSuccess = () => {
    this.props.history.push("/login");
  };
  //Logout failed, show failure message

  onLogOutError = (response) => {
    toast.error("Something went wrong. User was not logged out.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  render() {
    return (
      <button
        type="button"
        className="btn btn-primary float-left mt-2 ml-3"
        onClick={this.submitLogOut}
      >
        Log Out
      </button>
    );
  }
}

export default LogOutButton;
