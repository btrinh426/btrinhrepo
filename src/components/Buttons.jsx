import React from "react";
import { Route } from "react-router-dom";
import { userService } from "../services/userService";
import HomePage from "./HomePage";
import NewForm from "./NewForm";

class Buttons extends React.Component {
  onLoginClicked = (e) => {
    e.preventDefault();
    console.log("login clicked");
    //this.props.history.push("/home");
  };
  onRegisterClicked = (e) => {
    e.preventDefault();
    console.log("register clicked");
    // this.props.history.push("/register");
  };
  onLogoutClicked = (e) => {
    e.preventDefault();
    console.log("logoutClicked");
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <button
          onClick={this.onLoginClicked}
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>

        <button
          onClick={this.onRegisterClicked}
          type="submit"
          className="btn btn-danger"
        >
          Register
        </button>
      </>
    );
  }
}
export default Buttons;
