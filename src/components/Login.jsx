import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Button, Form, Label, Input, FormText } from "reactstrap";
import * as userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends Component {
  state = {
    userEmail: "",
    userPassword: "",
  };

  componentDidMount = () => {
    console.log("Login component mounted....");
  };

  onLoginFormChange = (e) => {
    let currentTargetName = e.currentTarget.name;
    let currentTargetValue = e.currentTarget.value;
    // console.log(newValue);
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState[currentTargetName] = currentTargetValue;
      // console.log(newState);
      return newState;
    });
  };

  clickLoginButton = () => {
    console.log("Clicked Login button...get user data from form/state.....");
    const userData = this.getUserData();
    userData.tenantId = "U01BMEA3V8V";
    console.log("User data is:");
    console.log(userData);
    userService.userLogin(userData).then(this.onUserLoginSuccess).catch(this.onUserLoginError);
  };

  onUserLoginSuccess = () => {
    console.log(`User successfully logged in.`);

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
    // I'll figure out how to setState on App.jsx from Login.jsx later.......
    //
    //
    // this.setState(
    //   (prevState) => {
    //     console.log("Setting state with newly logged-in user info...");
    //     const currentUser = { ...prevState.currentUser };
    //     currentUser.firstName = response.data.item.firstName;
    //     currentUser.lastName = response.data.item.lastName;
    //     currentUser.email = response.data.item.email;
    //     currentUser.avatarUrl = response.data.item.avatarUrl;
    //     // debugger;
    //     return { currentUser };
    //   },
    //   () => {
    //     toast.success(`Successful login.`);
    //     this.props.history.push("/");
    //     // location.replace("home.html");
    //   }
    // );
    //
    // For now, just re-route to home page =>
    this.props.history.push("/");
    toast.success("User logged in.");
  };

  onGetCurrentUserError = (error) => {
    console.error("Error getting current user.");
    debugger;
  };

  onUserLoginError = (error) => {
    console.error("Error logging in user.");
    let errorText = error.response.data.errors.join("\n");
    if (errorText.toLowerCase().includes("invalid credentials")) {
      errorText = "Invalid credentials.";
      console.error(errorText);
    }
    toast.error(`Error Loggin in user:  /n/n ${errorText}`);
    debugger;
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

  render() {
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
                  console.log("Login button clicked.");
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
                    href="/register"
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
