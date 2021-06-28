import React from "react";
import { toast } from "react-toastify";
import * as userService from "../services/userService";

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "U01EMG7DS8H",
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    console.log(e);

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      return newState;
    });
  };

  handleRegister = (e) => {
    e.preventDefault();

    const newUser = { ...this.state };

    userService
      .register(newUser)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  onRegisterSuccess = (response) => {
    console.log(response.data);
    toast("Successfully Registered!");
  };

  onRegisterError = (response) => {
    console.warn({ error: response });
    toast("Unable Register!");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 -md-4 p-5">
            <form>
              <label htmlFor="text">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                onChange={this.onFormFieldChanged}
                value={this.state.firstName}
              ></input>
              <label htmlFor="text">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                onChange={this.onFormFieldChanged}
                value={this.state.lastName}
              ></input>
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
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="passwordConfirm"
                onChange={this.onFormFieldChanged}
                value={this.state.passwordConfirm}
              ></input>
              <label htmlFor="text">Avatar</label>
              <input
                type="text"
                className="form-control"
                name="avatarUrl"
                onChange={this.onFormFieldChanged}
                value={this.state.avatarUrl}
              ></input>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleRegister}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
