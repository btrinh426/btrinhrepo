import React from "react";
import userService from "./services/userService";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

class Home extends React.Component {
  state = {
    userName: "Please use Login Page to log in",
  };
  currentLoginUser = () => {
    userService
      .currentUser()
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
  };

  onLoginSuccess = (response) => {
    // console.log(response.data.item.id);
    let data = response.data.item.id;
    // this.setState((preState) => {
    //   let newState = { ...preState };

    //   newState.userName = data;

    //   return newState;
    // });
    userService
      .getUserInfo(data)
      .then(this.onGetUserInfoByIdSuccess)
      .catch(this.onGetUserInfoIdError);
  };

  onLoginError = (errResponse) => {
    console.log(errResponse);
  };

  componentDidMount() {
    this.currentLoginUser();
  }

  logOutUser = () => {
    userService
      .logoutCurrentUser()
      .then(this.onLogoutuccess)
      .catch(this.onLogoutError);
  };

  onLogoutuccess = (response) => {
    console.log(response);
    toast.success("Logout Successful");
    let userFirstName = "Please use Login Page to log in";
    let userImage = "";
    this.setState((preState) => {
      let newState = { ...preState };

      newState.userName = userFirstName;
      newState.avatarUrl = userImage;

      return newState;
    });
  };

  onLogoutError = (errResponse) => {
    console.log(errResponse);
    toast.error("No user is signed in");
  };

  onGetUserInfoByIdSuccess = (response) => {
    console.log(response);
    let userFirstName = response.data.item.firstName;
    let userImage = response.data.item.avatarUrl;
    this.setState((preState) => {
      let newState = { ...preState };

      newState.userName = userFirstName;

      return newState;
    });
  };

  onGetUserInfoIdError = (response) => {
    console.log(response);
  };

  render() {
    return (
      <React.Fragment>
        <h1>Welcome to the HomePage</h1>
        <img src={this.state.avatarUrl} alt="" />
        <h2>{this.state.userName}</h2>
        <div>
          <button
            type="button"
            onClick={this.logOutUser}
            className="btn btn-primary"
          >
            Logout
          </button>
        </div>
        <div>
          <NavLink
            to="/LoginPage"
            exact
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
          >
            Login
          </NavLink>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
