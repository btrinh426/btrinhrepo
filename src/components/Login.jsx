import React from "react";
import { toast } from "react-toastify";
import * as userService from "../services/userService";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    tenantId: "U01EMG7DS8H",
  };
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      return newState;
    });
  };
  handleLogIn = (e) => {
    e.preventDefault();

    const user = { ...this.state };
    userService.logIn(user).then(this.onLogInSuccess).catch(this.onLogInError);
  };

  onLogInSuccess = (response) => {
    console.log("Log In Successful", response);
    toast("Login success!");
  };

  onLogInError = (response) => {
    console.warn({ error: response });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 -md-4 p-5">
            <form>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                aria-describedby="emailHelp"
                onChange={this.onFormFieldChanged}
                value={this.state.email}
              ></input>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onFormFieldChanged}
                value={this.state.password}
              ></input>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleLogIn}
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
