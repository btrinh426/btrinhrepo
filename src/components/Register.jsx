import React, { Component } from "react";
import * as userService from "../services/userService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import Login from "../components/Login";
import { Route, NavLink } from "react-router-dom";

class Register extends Component {
  state = {
    registerFormData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      tenantId: "U0190CX3XPW",
    },
  };
  onFromFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newRegisterFormData = { ...this.state.registerFormData };
      newRegisterFormData[inputName] = newValue;
      console.log({ newRegisterFormData });

      return { registerFormData: newRegisterFormData };
    });
  };
  registerRequested = () => {
    let data = this.state.registerFormData;
    console.log("regiser requested for: ", data);

    userService
      .register(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    Swal.fire("successful registration!");
  };

  onActionError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong!");
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="form-row text-center">
            <div className="col-sm-10">
              <h5>Register a New Membership</h5>
            </div>
          </div>
          <form>
            <div className="form-row">
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="userFName"
                  name="firstName"
                  placeholder="First Name"
                  value={this.state.registerFormData.firstName}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="userLName"
                  name="lastName"
                  placeholder="Last Name"
                  value={this.state.registerFormData.lastName}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control email"
                  id="userEmailAddress"
                  name="email"
                  placeholder="Email"
                  value={this.state.registerFormData.email}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="userPassword"
                  name="password"
                  placeholder="Password"
                  value={this.state.registerFormData.password}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="userPasswordRetype"
                  name="passwordConfirm"
                  placeholder="Retype Password"
                  value={this.state.registerFormData.passwordConfirm}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="avatarURL"
                  name="avatarUrl"
                  placeholder="Avatar URL"
                  value={this.state.registerFormData.avatarUrl}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value="123"
                  id="agreeCheking"
                  name="checkBoxAgree"
                />
                <label className="form-check-label" htmlFor="agreeCheking">
                  I agree to <a href="https://sabio.la/">terms</a>
                </label>
              </div>
            </div>
          </form>
          <div className="col-sm-10">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.registerRequested}
            >
              Register
            </button>
          </div>
          <hr />
          <div className="col-sm-10">
            <NavLink to="/login">Already have an account?</NavLink>
            <Route path="/login" exact={true} component={Login}></Route>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Register;
