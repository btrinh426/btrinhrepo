import React from "react";
import { withRouter } from "react-router-dom";
import * as userService from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
      tenantId: "U021HA9HES0",
    },
  };

  //Toastr Notification Handlers
  successMessage = () =>
    toast.success("You have successfully signed in to your account!");

  errorMessage = () =>
    toast.error("You have not successfully signed in to an account.");

  //Form Input

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;

      return { formData };
    });
  };

  onSignInClicked = (e) => {
    e.preventDefault();
    console.log("I was clicked.", new Date());
    console.log("state", this.state.formData);
    // const data = {
    //   email: "charo@modernhuge.com",
    //   password: "Password777!",
    //   tenantId: "U021HA9HES0",
    // };

    userService
      .logIn(this.state.formData)
      .then(this.onLogInSuccess)
      .catch(this.onLogInError);
  };

  onLogInSuccess = (response) => {
    console.log(response);
    this.successMessage();
    this.props.history.push("/dashboard/");
  };

  onLogInError = (errResponse) => {
    console.log(errResponse);
    this.errorMessage();
  };

  render() {
    return (
      <React.Fragment>
        <form style={{ position: "relative", top: "100px" }}>
          <p align="center">Sign in to Your Account</p>
          <div className="form-group">
            <label htmlFor="emailInput">Email address</label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="email"
              value={this.state.formData.email}
              onChange={this.onFormFieldChanged}
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name="password"
              value={this.state.formData.password}
              onChange={this.onFormFieldChanged}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSignInClicked}
          >
            Sign In
          </button>
          <ToastContainer />
        </form>
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
