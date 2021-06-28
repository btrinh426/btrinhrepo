import React from "react";
import { register } from "../services/userServices";

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatarUrl: "",
  };

  handleFirstNameChange = (event) => {
    console.log("event.target", event.target);
    const firstName = event.target.value;
    this.setState({ firstName });
  };

  handleLastNameChange = (event) => {
    console.log("event.target", event.target);
    const lastName = event.target.value;
    this.setState({ lastName });
  };

  handleEmailChange = (event) => {
    console.log("event.target", event.target);
    const email = event.target.value;
    this.setState({ email });
  };

  handlePasswordChange = (event) => {
    console.log("event.target", event.target);
    const password = event.target.value;
    this.setState({ password });
  };

  handleConfirmPasswordChange = (event) => {
    console.log("event.target", event.target);
    const confirmPassword = event.target.value;
    this.setState({ confirmPassword });
  };

  handleAvatarUrlChange = (event) => {
    console.log("event.target", event.target);
    const avatarUrl = event.target.value;
    this.setState({ avatarUrl });
  };

  onRegisterSuccess = () => {
    //put whatever you want to happen after they register
    console.log("Registered Successfully!");
    //toastr.info("Are you the 6 fingered man?");
  };

  onRegisterError = (error) => {
    //If they fail to register
    console.log("Register Failed!", error);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      tenantId: "U01G6AS2WER",
      avatarUrl: this.state.avatarUrl,
    };
    console.log("userData", userData);
    register(userData, this.onRegisterSuccess, this.onRegisterError);
  };

  render() {
    console.log("string of whatever");

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <h1> Register </h1>
          <div className="mb-3 col-md-3">
            <label htmlFor="FirstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="FirstName"
              placeholder="Brian, Bill, etc."
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
            />
          </div>
          <div className="mb-3 col-md-3">
            <label htmlFor="LastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="LastName"
              placeholder="Rose, Garcia, etc."
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
            />
          </div>
          <div className="mb-3 col-md-3">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="Email"
              placeholder="gmail, yahoo, etc."
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="mb-3 col-md-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div className="mb-3 col-md-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleConfirmPasswordChange}
            />
          </div>
          <div className="mb-3 col-md-3">
            <label htmlFor="confirmPassword" className="form-label">
              Avatar
            </label>

            <input
              type="url"
              className="form-control"
              id="Avatar"
              placeholder="urlForAvatar"
              value={this.state.avatarUrl}
              onChange={this.handleAvatarUrlChange}
            />
          </div>

          <button className="btn-primary" type="submit">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
