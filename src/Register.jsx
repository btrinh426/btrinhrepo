import React from "react";
import * as userService from "./services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "U021HA9HES0",
    },
  };

  // finish tweaking toast notification after lunch

  notify = (response) =>
    toast.success(
      "You have successfully added your item! Item Id: " + response
    );

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;

      return { formData };
    });
  };
  onRegisterClicked = (e) => {
    e.preventDefault();
    // console.log("I was clicked.", new Date());
    // console.log("state", this.state.formData);

    userService
      .register(this.state.formData)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  onRegisterSuccess = (response) => {
    console.log(response);
    this.notify();
  };

  onRegisterError = (errResponse) => {
    console.log(errResponse);
    this.notify();
  };

  render() {
    return (
      <React.Fragment>
        <form style={{ position: "relative", top: "100px" }}>
          <p align="center">Register a New Membership</p>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="firstName"
              id="firstName"
              value={this.state.formData.firstName}
              onChange={this.onFormFieldChanged}
              placeholder="First Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={this.state.formData.lastName}
              onChange={this.onFormFieldChanged}
              placeholder="Last Name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.formData.email}
              onChange={this.onFormFieldChanged}
              placeholder="Email"
              autoComplete="username"
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.formData.password}
              onChange={this.onFormFieldChanged}
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="passwordConfirm"
              value={this.state.formData.passwordConfirm}
              onChange={this.onFormFieldChanged}
              placeholder="Confirm Password"
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <input
              type="url"
              className="form-control"
              name="avatarUrl"
              value={this.state.formData.avatarUrl}
              onChange={this.onFormFieldChanged}
              placeholder="Avatar URL"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onRegisterClicked}
          >
            Register
          </button>
          <ToastContainer />
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
