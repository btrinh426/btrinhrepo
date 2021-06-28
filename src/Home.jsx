import React from "react";
import axios from "axios";
import * as userServices from "./services/userServices";
import Swal from "sweetalert2";

class Home extends React.Component {
  state = {
    firstName: "Current User",
  };

  componentDidMount() {
    userServices
      .getCurrentUser()
      .then(this.onGetCurrentUserSuccess)
      .catch(this.onGetCurrentUserError);
    // make axios call here on success you need to make another one.

    // on success of getById you need to display on the DOM.
  }

  onGetCurrentUserSuccess = (response) => {
    let currentUser = response.data.item.id;

    userServices
      .getById(currentUser)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetByIdError);

    // this object will be the thing that is copying and then replacing state
  };

  onGetCurrentUserError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You're Not Logged In!",
      footer: "<a href>Why do I have this issue?</a>",
    });
    this.props.history.push("/login/");
  };

  onGetByIdSuccess = (response) => {
    let firstName = response.data.item.firstName;
    this.setState({ firstName: firstName });
  };

  onGetByIdError = () => {};

  onLogoutCLick = () => {
    // e.preventDefault();
    userServices.logOut().then(this.onLogoutSuccess).catch(this.onLogoutError);
  };
  onLogoutSuccess = () => {
    Swal.fire("Good job!", "You are now Logged Out", "success");
    this.props.history.push("/login/");
  };
  onLogoutError = () => {};

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3" style={{ marginTop: "80px" }}>
              Welcome {this.state.firstName}
            </h1>
            <div>
              <button
                name="logout"
                type="submit"
                className="btn btn-primary btn-sm"
                onClick={this.onLogoutCLick}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
