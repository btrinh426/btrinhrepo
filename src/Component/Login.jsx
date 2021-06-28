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

  componentDidMount() {
    userService
      .logIn(this.user)
      .then(this.onLogInSuccess)
      .catch(this.onLogInError);
  }

  onFormFieldChange = (e) => {
    console.log(e);
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = { ...this.state.formData };

      newState[inputName] = newValue;

      return newState;
    });
  };

  clickHandler = (e) => {
    e.preventDefault();

    userService
      .logIn(this.state.logInData)
      .then(this.onLogInSuccess)
      .catch(this.onLogInError);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // const user = {
    //   email: this.state.email,
    //   password: this.state.password,
    // };

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
              id="Email"
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
              id="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.onFormFieldChange}
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

export default Login;
