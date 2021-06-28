import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import * as userService from "../services/userServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Register";
import Home from "./Home";

class Login extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
      tenantId: "U01JRCc1P7GE",
    },
  };

  onRegisterClick = (e) => {
    console.log("Register was clicked");
    this.props.history.push("/register");
  };

  notify = () => {
    toast("Login Successful");
  };

  navToHome = (e) => {
    this.props.history.push("/home");
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;

      return { formData };
    });
  };
  onSignIn = (e) => {
    e.stopPropagation();

    const data = { ...this.state.formData };

    userService.logIn(data).then(this.onLogInSuccess).catch(this.onLogInError);

    console.log("i was clicked", this.state);
  };

  onLogInSuccess = (response) => {
    console.log({ person: response });
    console.log("Log In Successful");
    toast("Login Successful!");
    this.navToHome();
  };

  onLogInError = (response) => {
    console.warn({ error: response });
    toast("Login Error");
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <form className="col-md-10 p-5">
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  value={this.state.email}
                  placeholder="Email"
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  value={this.state.password}
                  name="password"
                  placeholder="Password"
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-10">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onSignIn}
                >
                  Log in
                </button>
              </div>
            </div>
            <a>
              <strong>Need To Register?</strong>
            </a>
            <div className="form-group row">
              <div className="col-sm-10">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onRegisterClick}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default Login;
