import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import userService from "../services/userService";

class TopBar extends React.Component {
  checkUserStatus = () => {
    if (this.props.userStatus) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col m-auto">
              <div className="row justify-content-center">
                <FontAwesomeIcon icon={faUser} className="mt-2" />
              </div>
              <div className="row pb-2">{this.props.userName}</div>
            </div>
            <div
              className="col m-auto"
              onClick={this.logOutUser}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ width: "30px", height: "30px" }}
                className="ml-5 mr-5"
              />
            </div>
          </div>
        </React.Fragment>
      );
    }
    return;
  };

  logOutUser = () => {
    userService
      .userLogout()
      .then(this.onLogOutSuccess)
      .catch(this.onLogOutFail);
  };

  onLogOutSuccess = () => {
    this.props.logOutUser();
  };

  logoClickRouting = () => {
    if (this.props.userStatus) {
      this.props.history.push("/main");
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div
        className="d-flex row sticky-top p-0 border-bottom border-top"
        style={{ minHeight: "55px" }}
      >
        <div
          className="col d-flex align-items-center border-bottom justify-content-between"
          style={{ backgroundColor: "navy" }}
        >
          <div
            className="h5 mt-2 text-light pl-4"
            style={{ cursor: "pointer" }}
            onClick={this.logoClickRouting}
          >
            {this.props.siteName}
          </div>

          <div className="text-white">{this.checkUserStatus()}</div>
        </div>
      </div>
    );
  }
}

export default TopBar;
