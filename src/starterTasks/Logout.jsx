import React from "react";
import userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Logout extends React.Component {
  logoutUser = (e) => {
    e.preventDefault();
    console.log("Worked");
    userService.logout().then(this.onActionSuccess).catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log("Success");
    // toast.success("You did it", "SUCCESS");
    console.log(this.props);
    this.props.history.push("/userlogin");
  };

  onActionError = (errResponse) => {
    console.log("Failure");
    toast.error("Denied", "Failure");
  };

  render() {
    return (
      <button onClick={this.logoutUser} className="btn btn-primary btn-lg">
        Logout &raquo;
      </button>
    );
  }
}
export default Logout;
