import React from "react";
import { NavLink } from "react-router-dom";
import * as usersService from "../services/usersService";
import { toast } from "react-toastify";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  logout = () => {
    usersService.logout().then(this.onLogoutSuccess).catch(this.onLogoutError);
  };

  onLogoutSuccess = (response) => {
    console.log(response);
    return this.setState({ isLoggedIn: false });
  };

  onLogoutError = (error) => {
    console.log(error);
    return <div>Logout was not successful</div>;
  };

  render() {
    return <div>{this.state.isLoggedIn}</div>;
  }
}
export default Logout;
