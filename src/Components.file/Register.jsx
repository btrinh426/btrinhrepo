import React from "react";
import * as userService from "../services/userServices";
import { toast } from "react-toastify";
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
      tenantId: "U01JRC1P7GE",
    },
  };

  notify = () => {
    toast("User Registered");
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

  //information is in formData how do I call onRegisterSuccess

  onButtonClicked = (e) => {
    e.stopPropagation();

    const data = { ...this.state.formData };

    userService
      .register(data)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);

    console.log("i was clicked", this.state);
  };

  onRegisterSuccess = (response) => {
    console.log({ person: response });
    // console.log("Register user worked!");
    toast("User Registered!");
  };

  onRegisterError = (response) => {
    console.warn({ error: response });
    toast("User was not registered!");
  };

  render() {
    return (
      <React.Fragment>
        <form className="col-md-10 p-5">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="firstName"
              onChange={this.onFormFieldChanged}
              value={this.state.firstName}
            ></input>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lastName"
              onChange={this.onFormFieldChanged}
              value={this.state.lastName}
            ></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              onChange={this.onFormFieldChanged}
              value={this.state.email}
            ></input>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.onFormFieldChanged}
              value={this.state.password}
            ></input>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="passwordConfirm"
              onChange={this.onFormFieldChanged}
              value={this.state.confirmPassword}
            ></input>
          </div>
          <div className="form-group">
            <label>Avatar URL</label>
            <input
              type="avatar"
              className="form-control"
              placeholder="Insert Avatar URL"
              name="avatarUrl"
              onChange={this.onFormFieldChanged}
              value={this.state.avatar}
            ></input>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onButtonClicked}
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
