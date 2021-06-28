import React from "react";
import axios from "axios";
import { logInUser } from "../services/userServices";
import { render } from "react-dom";

class Login extends React.Component {
  // form object state values
  state = {
    email: "",
    password: "",
  };

  // fake user
  user = {
    email: "sabio@la.com",
    password: "Password1!",
  };

  componentDidMount(event) {
    logInUser(this.user)
      .then(this.onLogInSuccess)
      .catch(this.ComponentOnLogInError);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    logInUser(this.user, this.onLogInSuccess, this.ComponentOnLogInError);
  };

  onLogInSuccess = () => {};

  ComponentOnLogInError = (error) => {
    console.log("Login Failed!", error);
  };

  // handlePasswordValidation() {
  //   const userPassword = this.state.password;
  //   const dummyPassword = this.user.password;

  //   // compare value and data type
  //   // ===

  //   if (userPassword === dummyPassword) {
  //     toastr.success("Have fun storming the castle!", "Miracle Max Says");
  //   } else {
  //     toastr.error(
  //       "I do not think that word means what you think it means.",
  //       "Inconceivable!"
  //     );
  //   }

  //   // compare not value or data type
  //   // !==
  // }

  handlePasswordChange = (event) => {
    console.log("event.target", event.target);
    const password = event.target.value;
    this.setState({ password });
  };

  handleEmailChange = (event) => {
    console.log("event.target", event.target);
    const email = event.target.value;
    this.setState({ email });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
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
          <button className="btn-primary" type="submit">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
