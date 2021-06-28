import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

import "./Login.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as userService from "../services/userService";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";

class Login extends React.Component {
  state = {
    loginData: {
      email: "",
      password: "",
      tenantId: "bootcamp456",
      loggedIn: false,
    },
    isModalOpen: false,
    hasMadeAjax: true,
    arrayOfComp: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // axios call with this.state
    userService
      .logIn(this.state.loginData)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
  };

  onLoginSuccess = (response) => {
    console.log({ user: response.data });
    Swal.fire("Success");
    // toastr.success("Successfully logged in")
    this.setState({
      loginData: {
        email: "",
        password: "",
        loggedIn: true,
      },
    });
  };

  onLoginError = (errResponse) => {
    console.warn({ error: errResponse.config });
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputValue = currentTarget.name;

    this.setState(() => {
      let loginData = { ...this.state.loginData };

      loginData[inputValue] = newValue;

      return { loginData };
    });
  };

  render() {
    return (
      <React.Fragment>
        <script
          crossorigin
          src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js"
        ></script>
        <div className="login-form">
          <form onSubmit={this.handleSubmit}>
            <h2 className="text-center">Sign In</h2>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="emailField"
                  placeholder="Email"
                  name="email"
                  required="required"
                  onChange={this.onFormFieldChanged}
                  value={this.state.loginData.email}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="passwordField"
                  placeholder="Password"
                  name="password"
                  required="required"
                  onChange={this.onFormFieldChanged}
                  value={this.state.loginData.password}
                />
              </div>
            </div>
            <div className="form-group">
              {/* <button
                type="submit"
                id="submitUserLogin"
                className="btn btn-primary btn-block"
                href="Home.html"
              >
                Log in
              </button> */}
              <input
                type="submit"
                className="btn btn-primary btn-block"
                value="Submit"
              />
            </div>
            {/* <div className="clearfix">
                    <label className="pull-left checkbox-inline"><input type="checkbox" /> Remember me</label>
                    <a href="#" className="pull-right">Forgot Password?</a>
                </div>         */}
          </form>
          <p className="text-center small">
            Don't have an account?{" "}
            <NavLink className="nav-link link-button" to="/register">
              Sign up here.
            </NavLink>
          </p>
          {/* <a href="Navigation.html">Go to navigation page</a>. */}
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
