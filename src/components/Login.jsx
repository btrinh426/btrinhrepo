import React from "react";

import userService from "../services/UserService";

import { toast } from "react-toastify";

class Login extends React.Component {
  state = {
    user: {
      email: "",
      password: "",
      tenantId: "EXAMPLE_T_ID",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let user = { ...this.state.user };

      user[inputName] = newValue;

      return { user };
    });
  };

  onSubmitClicked = (e) => {
    e.preventDefault();
    const data = this.state.user;
    userService.logIn(data).then(this.onLoginSuccess).catch(this.onLoginError);
    console.log("Submit was clicked", new Date());
  };

  onLoginSuccess = (response) => {
    toast.success("Login Successful", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    let ticks = new Date().getSeconds();
    console.log("Login successful", response, ticks);
    this.props.history.push("/App/" + ticks);
  };

  onLoginError = (err) => {
    toast.warning("Unsuccessful Login", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.error(err);
  };

  render() {
    console.log("rendering login form");
    return (
      <React.Fragment>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={this.state.user.email}
              onChange={this.onFormFieldChanged}
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={this.state.user.password}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            id="sign-in"
            name="sign-in"
            onClick={this.onSubmitClicked}
          >
            Sign in
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
