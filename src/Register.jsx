import React, { Component } from "react";
import "./App.css";
import * as userService from "./services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarURL: "",
    tenantId: "1423",
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      return newState;
    });
  };

  submitClicked = (e) => {
    e.preventDefault();
    userService
      .register(this.state)
      .then(this.submitSuccess)
      .catch(this.submitFail);
  };

  submitSuccess = (response) => {
    toast("nice", response);
  };

  submitFail = (err) => {
    console.error(err);
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="registerHeader">Register Now</h1>

        <form onSubmit={this.submitClicked}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              onChange={this.onFormFieldChanged}
              value={this.state.firstName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              onChange={this.onFormFieldChanged}
              value={this.state.lastName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail3">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={this.onFormFieldChanged}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail4">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={this.onFormFieldChanged}
              value={this.state.password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail5">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordConfirm "
              name="passwordConfirm"
              onChange={this.onFormFieldChanged}
              value={this.state.passwordConfirm}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail6">Avatar</label>
            <input
              type="text"
              className="form-control"
              id="avatarURL"
              name="avatarURL"
              onChange={this.onFormFieldChanged}
              value={this.state.avatarURL}
            />
          </div>
          {/* <button type="submit" className="btn btn-primary" /> */}
          <button type="submit" className="submit">
            Submit
          </button>
          {/* onClick={submitClicked} */}
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
