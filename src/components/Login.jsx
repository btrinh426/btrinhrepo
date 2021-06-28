import React from "react";
import * as userService from "../services/userService";
import Swal from "sweetalert2";

import { NavLink } from "react-router-dom";

class Login extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
      tenantId: "U01JY5G7M18",
    },
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

  logInUser = (e) => {
    e.preventDefault();
    const data = this.state.formData;

    userService.logIn(data).then(this.onLoginSuccess).catch(this.onLoginError);
  };

  onLoginSuccess = (response) => {
    console.log(response);
    Swal.fire({
      icon: "success",
      text: "Login success!",
      footer: "Have a great time!",
    });
    this.props.history.push("/home");
  };

  onLoginError = (errResponse) => {
    console.log(errResponse);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Could not log in!",
      footer: "Please try again",
    });
  };

  render() {
    return (
      <div className="container pt-4">
        <div className="row">
          <div className="col-md-12">
            <form>
              <h1 className="text-center">Log In</h1>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.password}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.logInUser}
              >
                Log In
              </button>
              <NavLink to="/register">
                <button type="button" className="btn btn-secondary ml-2">
                  Register
                </button>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
