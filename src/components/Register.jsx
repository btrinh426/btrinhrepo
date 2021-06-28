import React from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { withRouter } from "react-router-dom";

import { register } from "../services/userServices.js";

class Register extends React.Component {
  errorHeader = "Registration Error";
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
  };

  getUserData = () => {
    var userInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      avatarUrl: this.state.avatarUrl,
      tenantId: "U01U45PKVM2",
    };

    return userInfo;
  };

  // From schema:
  //  first name: maxLength: 100 / minLength: 2
  //  last name: maxLength: 100 / minLength: 2
  //  e-mail: maxLength: 100 / minLength: 2
  //  password: maxLength: 64 / minLength: 1 / pattern: ^ (?=.*? [A - Z])(?=.*? [a - z])(?=.*? [0 - 9])(?=.*? [# ? !$ %^&* -]).{ 8,}
  isValidUserInfo = (user) => {
    if (user.firstName.length < 2 || user.firstName.length > 100) {
      Swal.fire(
        this.errorHeader,
        "First name must have a length greater than 1 and less than 101"
      );
      return false;
    }
    if (user.lastName.length < 2 || user.lastName.length > 100) {
      Swal.fire(
        this.errorHeader,
        "Last name must have a length greater than 1 and less than 101"
      );
      return false;
    }
    if (user.email.length < 2 || user.email.length > 100) {
      Swal.fire(
        this.errorHeader,
        "E-mail address must have a length greater than 1 and less than 101"
      );
      return false;
    }
    if (!user.email.includes("@")) {
      Swal.fire(this.errorHeader, "Invalid e-mail format");
      return false;
    }
    // email end in: .com / .la ... longer?
    if (user.password.length < 1 || user.password.length > 64) {
      Swal.fire(this.errorHeader, "Password length must be between 1 and 64");
      return false;
    }
    if (user.password !== user.passwordConfirm) {
      Swal.fire(
        this.errorHeader,
        "The password and the confirmation password must match"
      );
      return false;
    }
    // password complexity?
    return true;
  };

  onRegisterUser = (e) => {
    e.preventDefault();

    let user = this.getUserData();
    if (this.isValidUserInfo(user)) {
      register(user).then(this.onRegisterSuccess).catch(this.onRegisterError);
    }
  };

  onRegisterSuccess = (e) => {
    console.log("User Registered");
    Swal.fire("User Registered");
    this.props.history.push("/login");
  };

  onRegisterError = (e) => {
    Swal.fire("Error registering user");
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let newValue = currentTarget.value;

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      return newState;
    });
  };

  render = () => {
    return (
      <form>
        <div className="form-floating">
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <h1 className="h3 mb-3 fw-normal">Register a New Membership</h1>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-10">
              <input
                id="firstName"
                className="edit-control"
                type="text"
                name="firstName"
                onChange={this.onFormFieldChanged}
                value={this.state.firstName}
              ></input>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Last Name</label>
            <div className="col-sm-10">
              <input
                id="lastName"
                className="edit-control"
                type="text"
                name="lastName"
                onChange={this.onFormFieldChanged}
                value={this.state.lastName}
              />
            </div>
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">E-mail</label>
            {/* <div className="col-sm-10"> */}
            <input
              id="email"
              className="edit-control"
              type="email"
              placeholder="name@example.com"
              name="email"
              onChange={this.onFormFieldChanged}
              value={this.state.email}
            />
            {/* </div> */}
          </div>
        </div>

        <div className="mb-2">
          <label>Password</label>
          <input
            id="password"
            className="edit-control"
            type="password"
            name="password"
            onChange={this.onFormFieldChanged}
            value={this.state.password}
          />
          <div className="mb-2">
            <label>Password Confirmation</label>
            <input
              id="passwordConfirm"
              className="edit-control"
              type="password"
              name="passwordConfirm"
              onChange={this.onFormFieldChanged}
              value={this.state.passwordConfirm}
            />
          </div>

          <div className="mb-2">
            <label>Link to Avatar</label>
            <input
              id="avatarUrl"
              className="edit-control"
              type="text"
              placeholder="https://example.com/users/"
              name="avatarUrl"
              onChange={this.onFormFieldChanged}
              value={this.state.avatarUrl}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.onRegisterUser}
          id="register"
        >
          Register
        </button>
      </form>
    );
  };
} // end Register class

export default withRouter(Register);
