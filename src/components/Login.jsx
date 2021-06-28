import React, { Component } from "react";
import userService from "../services/userService";
import { toast } from "react-toastify";

class Login extends Component {
  state = {
    formData: {
      email: "",
      password: "",
      tenantId: "U01UAJY7BR7",
    },
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

  handleClick = (e) => {
    e.preventDefault();
    userService
      .login(this.state.formData)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
  };

  onLoginError = (Response) => {
    toast.error("Password or email incorrect");
  };

  onLoginSuccess = (response) => {
    toast.success(`Login was successful`);
    this.props.history.push("/home");
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={this.onFormFieldChanged}
            className="form-control"
            name="email"
            value={this.state.formData.enterEmail}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          ></input>
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={this.onFormFieldChanged}
            name="password"
            type="password"
            value={this.state.formData.password}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          ></input>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          ></input>
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button
          onClick={this.handleClick}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </React.Fragment>
    );
  }
}

export default Login;
