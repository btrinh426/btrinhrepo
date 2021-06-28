import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SideBar from "./SideBar";
import { usersService } from "../services/userService";

class Home extends Component {
  state = {
    currentUserData: {
      id: "",
      firstName: "Default firstName",
      email: "Default email",
      avatarUrl:
        "https://image.shutterstock.com/image-vector/universal-blank-profile-picture-avatar-600w-1654275940.jpg",
    },
    show: false,
  };

  getCurrentUser = () => {
    usersService
      .whoIsLoggedIn()
      .then(this.getCurrentUserSuccess)
      .catch(this.getCurrentUserError);
  };
  getCurrentUserSuccess = (response) => {
    console.log({ good: response });
    //call getInfo and pass it the id
  };
  getCurrentUserError = (response) => {
    console.log({ error: response });
    //redirect to login page
    this.props.history.push("/Login");
  };

  getUserInfo = (id) => {
    usersService
      .getInfoById(id)
      .then(this.onGetUserInfoSuccess)
      .catch(this.onGetUserInfoError);
  };

  onGetUserInfoSuccess = (response) => {
    console.log({ good: response });
    //push info to state
    let userData = response.data.item;
    let newValue = {};
    this.setState(() => {
      let currentUserData = { ...this.state.currentUserData };
      currentUserData[userData] = newValue;
      return { currentUserData };
      //i dont think i did this correctly
    });
  };

  onGetUserInfoError = (response) => {
    console.log({ error: response });
  };

  render() {
    this.getCurrentUser();
    // need to use componentdidupdate and componentdidMount for getCurrentUser
    return (
      <React.Fragment>
        <div className="container-fluid bd-3">
          <div className="row flex-xl-nowrap">
            <SideBar {...this.props}></SideBar>
            <main
              className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content"
              role="main"
            >
              <div className="container" id="loadingContainer">
                <h1 className="bd-title">Hello firstName.</h1>
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
