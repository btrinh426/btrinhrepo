import React from "react";
import * as userService from "./userService";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleTenantIdChange = this.handleTenantIdChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleTenantIdChange(event) {
    this.setState({ tenantId: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    userService.logIn(user).then(this.onLogInSuccess).catch(this.onLogInError);
  }

  onLogInSuccess = () => {
    console.log("success");
    toast.success("Log In Successful! Welcome! ");
  };
  onLogInError = () => {
    console.log("error");
    toast.error("Log In Failed, Please Try Again!");
  };

  render() {
    return (
      <form style={{ margin: "220px " }}>
        <ToastContainer />

        <div>
          <label>
            <h1>Welcome! Log in to access your account!</h1>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={this.handleEmailChange}
            aria-describedby="emailHelp"
          ></input>
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={this.handlePasswordChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Your Unique Id</label>
          <input
            type="text"
            className="form-control"
            onChange={this.handleTenantIdChange}
          ></input>
        </div>
        <button
          type="button"
          style={{ marginTop: "30px " }}
          className="btn btn-primary"
          onClick={this.handleSubmit}
        >
          Log In
        </button>
        <div>
          <button
            type="button"
            style={{ marginTop: "40px" }}
            className="btn btn-light"
          >
            <NavLink to="/RegisterForm">Register</NavLink>
          </button>
        </div>
      </form>
    );
  }
}

export default LogInForm;
