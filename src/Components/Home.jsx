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
    console.log({ getIdGood: response.data.item.id });
    //call getInfo and pass it the id
    // this.getUserInfo(response.data.item.id); //endless loop
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
    // let copyState = { ...this.state.currentUserData };
    let userData = response.data.item;
    //update copyState with userData
    //push info to state
    this.setState(() => {
      return userData;
      //is this correct?
    });
  };

  onGetUserInfoError = (response) => {
    console.log({ error: response });
  };

  //use these to stop the enless looping from getUserInfo
  // check path where it come from and if it is the same page then dont update
  componentDidMount() {}

  componentDidUpdate() {}

  // need to use componentdidupdate and componentdidMount for getCurrentUser

  render() {
    this.getCurrentUser();

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
