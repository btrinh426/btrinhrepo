import React from "react";
import { logIn } from "../services/usersService";
import { toast } from "react-toastify";
import debug from "sabio-debug";
const _logger = debug.extend("App");

class LogIn extends React.Component {
  // payload = { email: "aUsername1@dispostable.com", password: "123qwe!@#QWE", tenantId: "sabio123" };
  state = {
    formData: {
      email: "",
      password: "",
      tenantId: "sabio123",
    },
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...this.state.formData };
    logIn(payload).then(this.onLogInSuccess).catch(this.onLogInError);
  };

  onLogInSuccess = (response) => {
    _logger("login success", response);
    toast["success"]("You logged in!", "Woohoo!");
  };
  onLogInError = (response) => {
    _logger("login error", response);
    toast["error"]("Oops, something didn't compute properly...", "Oops");
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <div className="row">
          <form className="col-md-4 p-5">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter Email"
                onChange={this.onFormFieldChange}
                value={this.state.formData.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter Password"
                onChange={this.onFormFieldChange}
                value={this.state.formData.password}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
