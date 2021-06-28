import React from "react";
import * as userService from "../../services/userServices";
import { NavLink } from "react-router-dom";

class LogOutButton extends React.Component {
  //on click, call userService.logOut
  submitLogOut = () => {
    userService.logOut().then(this.onLogOutSuccess).catch(this.onLogOutError);
  };
  //Logout successful, redirect to login
  onLogOutSuccess = () => {
    this.props.history.push("/login");
  };
  onLogOutError = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <NavLink to="/login">
        <li className="nav-item ">
          <button className="nav-link link-button" onClick={this.submitLogOut}>
            Logout
          </button>
        </li>
      </NavLink>
    );
  }
}

export default LogOutButton;
