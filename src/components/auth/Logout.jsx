import React from "react";
import * as userService from "../../services/userService";
import { toast } from "react-toastify";

class Logout extends React.Component {
  // constructor(props){
  //   super(props);
  // }

  onLogoutButtonClicked = () => {
    console.log("... SiteNav > onLogoutButtonClicked firing ...");

    userService.logout().then(this.onLogoutSuccess).catch(this.onLogoutFail);
  };

  onLogoutSuccess = () => {
    console.log("... SiteNav > onLogoutSuccess firing ...");

    toast.success("Logged out successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
    this.props.onLogout();
    this.props.history.push("/login");
  };

  onLogoutFail = () => {
    console.log("... SiteNav > onLogoutFail firing ...");
    toast.error("Logout mechanism triggered error");
  };

  render() {
    return (
      <button
        className="btn btn-dark"
        disabled={!this.props.isUserLoggedIn}
        onClick={this.onLogoutButtonClicked}
        hidden={!this.props.isUserLoggedIn}
      >
        Logout
      </button>
    );
  }
}

export default Logout;
