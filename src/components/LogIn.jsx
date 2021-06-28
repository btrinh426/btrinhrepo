import React from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import * as userService from "../services/userService";

class LogIn extends React.Component {
  state = {
    loginData: {
      email: "",
      password: "",
      tenantId: "U01RD0GNJKE",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let loginData = { ...prevState.loginData };

      loginData[inputName] = newValue;

      return { loginData };
    });
  };

  logInButton = (e) => {
    e.preventDefault();
    userService
      .login(this.state.loginData)
      .then(this.onLogInSuccess)
      .catch(this.onLogInError);
  };

  toRegPgButton = (e) => {
    e.preventDefault();
    console.log("new here button pressed");
    this.props.history.push("/Register");
  };

  onLogInSuccess = (response) => {
    console.log(response);
    toast.success("you are now logged in.");
    this.props.history.push("/Home");
  };

  onLogInError = (response) => {
    console.warn(response);
    toast.error("invalid user email or password.");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <form>
              <div className="form-group">
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="email@example.com"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  value={this.state.loginData.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="password"
                  name="password"
                  onChange={this.onFormFieldChanged}
                  value={this.state.loginData.password}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-outline-dark"
                  onClick={this.logInButton}
                >
                  sign in
                </button>
              </div>
            </form>
            <div className="dropdown-divider"></div>
            <NavLink
              to="/Register"
              className="dropdown-item link-button"
              onClick={this.toRegPgButton}
            >
              new around here? sign up
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
