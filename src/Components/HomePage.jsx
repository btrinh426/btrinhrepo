import React from "react";
import LogOutButton from "./LogOutButton";
import * as userService from "../services/userServices";
import { toast } from "react-toastify";
import Content from "./Content";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //On load, check if user is logged in
  componentDidMount() {
    console.log("Component Mounted");
    userService.getCurrent().then(this.onLoggedIn).catch(this.onNotloggedIn);
  }
  //If logged in, call for user info
  onLoggedIn = (data) => {
    var userId = data.data.item.id;
    userService
      .getById(userId)
      .then(this.getUserSuccess)
      .catch(this.getUserError);
  };
  //If not logged in, redirect to login
  onNotloggedIn = () => {
    this.props.history.push("/login");
  };

  //gather user name and avatar to inject into dom
  getUserSuccess = (data) => {
    var userData = data.data.item;
    var userName = `${userData.firstName} ${userData.lastName}`;
    var userPic = userData.avatarUrl;

    this.setState((prevState) => {
      var newState = { ...prevState };
      newState.userName = userName;
      newState.userPic = userPic;
      return newState;
    });
  };

  //User is logged in but Id failed so something is broken
  onGetUserError() {
    toast.error(`getById failed.`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  render() {
    return (
      <React.Fragment>
        <LogOutButton {...this.props}></LogOutButton>
        <div id="loggedInPage">
          <div className="jumbotron jumbotron-fluid mb-3 ">
            <div className="container">
              <div className="row float-right">
                <img
                  src={this.state.userPic}
                  className="rounded float-left img-thumbnail "
                  alt={this.state.userName}
                  style={{ maxHeight: "200px", maxWidth: "200px" }}
                />
              </div>
              <h1 className="display-4">Welcome, {this.state.userName}!</h1>
            </div>
          </div>
          <Content />
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
