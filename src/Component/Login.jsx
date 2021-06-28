import React from "react";
import * as userService from "../services/userServices";
// import { toast, ToastContainer } from "react-toastify";

class Login extends React.Component {
  state = {
    logInData: {
      email: "",
      password: "",
      tenantId: "U01G6AS2WER",
    },
  };

  onFormFieldChange = (e) => {
    console.log(e);
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let logInData = { ...this.state.logInData };

      logInData[inputName] = newValue;

      return {
        logInData,
      };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    userService
      .logIn(this.state.logInData)
      .then(this.onLogInSuccess)
      .catch(this.onLogInError);
  };

  onLogInSuccess = (response) => {
    console.log({ response: response.data });
  };

  onLogInError = (error) => {
    console.log("Login Failed!", error);
  };

  handleRegisterClick = (e) => {
    e.preventDefault();
    console.log("The register button was clicked");

    this.props.history.push("/register");
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3 col-md-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="gmail, yahoo, etc."
              value={this.state.email}
              onChange={this.onFormFieldChange}
            />
          </div>
          <div className="mb-3 col-md-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.onFormFieldChange}
            />
          </div>
          <button className="btn-primary" type="submit">
            Login
          </button>
          <button type="button" onClick={this.handleRegisterClick}>
            Go To Register Page
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
