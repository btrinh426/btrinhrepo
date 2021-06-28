import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { usersService } from "../services/userService";
import { toast } from "react-toastify";

class Home extends Component {
  state = {
    currentUserData: {
      id: "",
      firstName: "",
      email: "",
      avatarUrl: "",
    },
  };

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    usersService
      .whoIsLoggedIn()
      .then(this.getCurrentUserSuccess)
      .catch(this.getCurrentUserError);
  };

  getCurrentUserSuccess = (response) => {
    console.log({ getIdGood: response.data.item.id });
    this.getUserInfo(response.data.item.id);
  };

  getCurrentUserError = (response) => {
    console.log({ error: response });
    this.props.history.push("/Login"); //redirect to login page
  };

  getUserInfo = (id) => {
    usersService
      .getInfoById(id)
      .then(this.onGetUserInfoSuccess)
      .catch(this.onGetUserInfoError);
  };

  onGetUserInfoSuccess = (response) => {
    console.log({ getUserInfoGood: response });
    let currentUserData = response.data.item;
    //push info to state
    this.setState(() => {
      return { currentUserData };
    });
  };

  onGetUserInfoError = (response) => {
    console.log({ error: response });
  };

  onLogoutClicked = (e) => {
    console.log("onLogoutClicked");
    usersService
      .userLogout()
      .then(this.onLogoutSuccess)
      .catch(this.onLogoutError);
  };

  onLogoutSuccess = (response) => {
    console.log({ good: response });
    toast.success("You have successfully logged out.");
    //redirect to login page
    this.props.history.push("/Login");
  };
  onLogoutError = (response) => {
    console.log({ error: response });
    toast.error("Something went wrong, please try again.");
  };

  onBtnClick = (e) => {
    console.log("I was clicked", e.currentTarget.id);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid bd-3">
          <div className="row flex-xl-nowrap">
            <main
              className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content"
              role="main"
            >
              <div className="container" id="loadingContainer">
                <div className="text-center" id="userAvatar">
                  <h1 className="bd-title">
                    Hello {this.state.currentUserData.firstName}!
                  </h1>
                  <img
                    src={this.state.currentUserData.avatarUrl}
                    className="rounded img-thumbnail"
                    alt="user avatar"
                  />
                </div>
                <div className="text-center">
                  Logged in as: <p>{this.state.currentUserData.email}</p>
                </div>
                This is the container
              </div>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
