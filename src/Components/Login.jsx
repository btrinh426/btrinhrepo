import React, { Component } from "react";
import { toast } from "react-toastify";
import { usersService } from "../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFormData: {
        email: "",
        password: "",
        tenantId: "U01JYBJ1M51",
      },
    };
  }

  // testData = {
  //   email: "nitrospaz@hotmail.com",
  //   password: "Sabio123$%",
  //   tenantId: "U01JYBJ1M51",
  // };

  onLoginClick = (e) => {
    e.preventDefault();
    console.log("onLogin clicked");
    usersService
      .userLogin(this.state.loginFormData)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
  };

  onLoginSuccess = (response) => {
    console.log({ good: response });
    toast.success("Login Success!");
  };

  onLoginError = (response) => {
    console.log({ error: response });
    toast.error(
      "Something went wrong. Please check your inputs and try again."
    );
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget; //information of field
    console.log(currentTarget);
    let newValue = currentTarget.value; //value of input in field
    console.log(newValue);
    let inputName = currentTarget.name; // name of input
    console.log(inputName);

    //anonomous function in set state
    this.setState(() => {
      let loginFormData = { ...this.state.loginFormData }; //make copy
      loginFormData[inputName] = newValue; //add new value from form
      return { loginFormData }; // return form with new value
    });
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <hr></hr>
            <div className="col-md-2"></div>
            <div className="col-md-9">
              <h2>Login Portal</h2>
              <form id="loginForm">
                <div className="mb-4">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Email"
                    onChange={this.onFormFieldChange}
                    value={this.state.loginFormData.email}
                    name="email"
                  ></input>
                </div>
                <div className="mb-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    onChange={this.onFormFieldChange}
                    value={this.state.loginFormData.password}
                    name="password"
                  ></input>
                </div>
                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  onClick={this.onLoginClick}
                >
                  Login &raquo;
                </button>
              </form>
            </div>
            <div className="col-md-1"></div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}
export default Login;
