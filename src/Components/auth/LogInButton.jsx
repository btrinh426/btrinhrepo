import React from "react";
import { NavLink } from "react-router-dom";

class LoginButton extends React.Component {
  render() {
    return (
      <NavLink to="/login">
        <li className="nav-item ">
          <button className="nav-link link-button">Login</button>
        </li>
      </NavLink>
    );
  }
}
export default LoginButton;
