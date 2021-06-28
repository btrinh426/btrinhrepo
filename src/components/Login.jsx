import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Button, Form, Label, Input, FormText } from "reactstrap";
import * as userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import debug from "sabio-debug";
const _logger = debug.extend("Login");

class Login extends Component {
  state = {
    userEmail: "",
    userPassword: "",
  };

  componentDidMount = () => {
    _logger("componentDidMount");
  };

  onLoginFormChange = (e) => {
    let currentTargetName = e.currentTarget.name;
    let currentTargetValue = e.currentTarget.value;
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState[currentTargetName] = currentTargetValue;
      return newState;
    });
  };

  clickLoginButton = () => {
    const userData = this.getUserData();
    userData.tenantId = "U01BMEA3V8V";
    // _logger("User data is:", userData);
    userService.userLogin(userData).then(this.onUserLoginSuccess).catch(this.onUserLoginError);
  };

  onUserLoginSuccess = () => {
    userService
      .getCurrentUser()
      .then(this.onGetCurrentUserSuccess)
      .then(userService.getUserById)
      .then(this.onGetUserByIdSuccess)
      .catch(this.onGetCurrentUserError);
  };

  onGetCurrentUserSuccess = (response) => {
    const currentUserId = response.data.item.id;
    return currentUserId;
  };

  onGetUserByIdSuccess = (response) => {
    const { updateCurrentUser } = this.props;
    const currentUser = {
      id: response.data.item.id,
      firstName: response.data.item.firstName,
      lastName: response.data.item.lastName,
      email: response.data.item.email,
      avatarUrl: response.data.item.avatarUrl,
    };
    updateCurrentUser(currentUser);
    toast.success(`Welcome ${currentUser.firstName}.`);
    this.props.history.push("/");
  };

  onGetCurrentUserError = (error) => {
    debugger;
    console.error("Error getting current user.");
    const { updateCurrentUser } = this.props;
    const currentUser = {};
    updateCurrentUser(currentUser);
  };

  onUserLoginError = (error) => {
    debugger;
    console.error("Error logging in user.");
    let errorText = error.response.data.errors.join("\n");
    if (errorText.toLowerCase().includes("invalid credentials")) {
      errorText = "Invalid credentials.";
      console.error(errorText);
    }
    toast.error(`Error Loggin in user:  ${errorText}`);
  };

  getUserData = () => {
    const user = {
      // email: this.state.userEmail,
      // password: this.state.userPassword,
      email: "mjmiklos@yahoo.com",
      password: "Usmc7523!!",
    };
    return user;
  };

  clickRegisterButton = (e) => {
    e.preventDefault();
    this.props.history.push("/register");
  };

  render() {
    _logger("render");
    return (
      <div className="col pl-3">
        <div className="row m-0 pt-1">
          <h3>Login User</h3>
        </div>
        <div
          className="container col-3 border border-secondary rounded mb-0 mr-3 ml-0 pl-0 pt-0 pr-0 pb-3"
          id="userRegister"
          style={{ backgroundColor: "rgb(210, 217, 235)", minWidth: "406px" }}
        >
          <div className="form-header">Welcome</div>

          <Form className="userLoginForm pl-3 pr-3" style={{ marginTop: "1rem" }}>
            <div className="form-group row mr-1">
              <div className="col pr-0">
                <Input
                  type="text"
                  className="form-control my-input-control col"
                  id="userEmail"
                  name="userEmail"
                  aria-describedby="emailHelp"
                  placeholder="E-mail"
                  // value={this.state.userEmail}
                  onChange={this.onLoginFormChange}
                />
                <div className="col pl-0 pr-0">
                  <small id="emailHelpBlock" className="d-none form-text text-muted col myHelpNote">
                    Please enter your e-mail address.
                  </small>
                </div>
              </div>
            </div>
            <div className="form-group row mr-1">
              <div className="col pr-0">
                <Input
                  type="password"
                  className="form-control my-input-control col"
                  id="passwordInput"
                  name="userPassword"
                  placeholder="Password"
                  onChange={this.onLoginFormChange}
                />
                <FormText>
                  <small id="passwordHelpBlock" className="d-none form-text text-muted col myHelpNote">
                    Please enter your password.
                  </small>
                </FormText>
              </div>
            </div>
            <div className="form-group row ml-0 mr-1">
              <Button
                type="submit"
                color="primary"
                className="form-group"
                id="loginButton"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  // _logger("Login button clicked.");
                  this.clickLoginButton();
                }}
              >
                Login
              </Button>
            </div>
            <div className="form-group border-top ml-0 mr-1 pt-3 my-border-top">
              <div className="col">
                <div className="row">
                  <Label
                    for="registerNow"
                    className="form-label my-label pb-1"
                    style={{ color: "#212529", fontWeight: "400", textAlign: "center", width: "100%" }}
                  >
                    Need to Signup?
                  </Label>
                </div>
                <div className="row">
                  <Button
                    color="secondary"
                    type="submit"
                    id="registerButton"
                    style={{ width: "100%" }}
                    onClick={this.clickRegisterButton}
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
