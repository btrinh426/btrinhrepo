import React from "react";
import * as userService from "../services/userService";

class Logout extends React.Component {
  componentDidMount() {
    userService
      .getUserLogout()
      .then(this.onLogoutSuccess)
      .catch(this.onLogoutError);
  }

  onLogoutSuccess = () => {
    console.log("logged out");
    this.props.history.push("/login", { type: "LOGOUT", payload: null });
  };
  onLogoutError = (res) => {
    console.error(res);
    this.props.history.push("/login");
  };
  render() {
    return null;
  }
}

export default Logout;
