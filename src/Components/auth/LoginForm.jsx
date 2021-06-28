import React from "react";
import { NavLink } from "react-router-dom";
import * as userService from "../../services/userServices";

import { toast } from "react-toastify";

class LoginForm extends React.Component {
  //capture user input from form to state
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState(() => {
      let newState = {};
      let inputName = currentTarget.name;
      newState[inputName] = newValue;
      return newState;
    });
  };
  //prepare form data for call to userService.logIn and make call
  submitLogin = (e) => {
    e.preventDefault();
    var payload = { ...this.state };
    payload.tenantId = userService.tenantId;
    userService
      .logIn(payload)
      .then(this.onLoginSuccessGoHome)
      .catch(this.onLoginError);
  };
  //Login was successful, redirect to Home
  onLoginSuccessGoHome = () => {
    this.props.history.push("/home");
  };
  //Login was unsuccessful, show failure message
  onLoginError = () => {
    toast.error(`Login failed. Bad username and/or password.`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron my-2">
          <h1 className="display-5"> User Login</h1>
          <NavLink to="/register" exact>
            <button type="button" className="btn btn-outline-info my-3">
              Not registered? Click here!
            </button>
          </NavLink>
        </div>
        <form className="mx-5">
          <div className="form-group p-5 col-4 mx-5">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={this.onFormFieldChanged}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={this.onFormFieldChanged}
            />
            <button
              type="submit"
              className="btn btn-primary mt-2"
              onClick={this.submitLogin}
            >
              Submit
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
