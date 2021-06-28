import React from "react";
import * as userService from "../services/userService";

class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "user@example.com",
      password: "",
      passwordConfirm: "",
      avatarUrl: "https://",
      tenantId: "123456",
    },
  };
  onRegisterClicked = (e) => {
    e.preventDefault();
    console.log("register clicked");
    userService
      .register(this.state.formData)
      .then(this.onSuccess)
      .catch(this.onFailure);
  };
  onSuccess = () => {
    console.log("registration success");
  };

  onFailure = () => {
    console.log("registration failed");
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

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form>
          <label>First Name</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            name="firstName"
            value={this.state.formData.firstName}
            type="name"
            placeholder="First Name"
          />
          <label>Last Name</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            name="lastName"
            value={this.state.formData.lastName}
            type="name"
            placeholder="Last Name"
          />

          <label>Email address</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            name="email"
            value={this.state.formData.email}
            type="email"
            placeholder="Enter email"
          />
          <label>Avatar</label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            name="avatarUrl"
            value={this.state.formData.avatarUrl}
            type="name"
            placeholder=""
          />

          <label></label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.password}
            name="password"
            type="password"
            placeholder="Password"
          />
          <label></label>
          <input
            className="form-control"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.passwordConfirm}
            name="passwordConfirm"
            type="password"
            placeholder="Re-enter Password"
          />
          <button
            onClick={this.onRegisterClicked}
            type="submit"
            className="btn btn-danger"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
