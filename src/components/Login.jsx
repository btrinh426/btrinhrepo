import React from "react";
import logIn from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends React.Component {
  // fix toastr notification on login, pull email string from response
  state = {
    loginFormData: {
      email: "echokilo515@gmail.com",
      password: "Greyhound515!",
    },
  };

  onInputChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let loginFormData = { ...this.state.loginFormData };
      loginFormData[inputName] = newValue;
      // console.log(loginFormData.email, loginFormData.password);
      return { loginFormData };
    });
  };

  onSignInClicked = (e) => {
    e.preventDefault();
    // console.log(this.state.loginFormData);
    logIn(this.state.loginFormData)
      .then(this.onLoginSuccess) 
      .catch(this.onLoginError);
  };
  onRegisterClicked = (e) => {
    e.preventDefault();
    this.props.history.push("/register");
  };
  onLoginSuccess = (response) => {
    let loginCred = response.config.data.split(",");
    console.log(loginCred);
    //toast["success"]("Success! User:"); //not rendering ID
    //this.props.history.push("/jumbo");
  };
  onLoginError = (err) => {
    console.log(err);
  };

  render() {
    return (
      <React.Fragment>
        <div className="login main">
          <h3>Login</h3>
          <form id="loginForm">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={this.state.loginFormData.email}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onInputChanged}
                value={this.state.loginFormData.password}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onSignInClicked}
            >
              Login
            </button>
            <button
              id="toRegisterButton"
              type="button"
              className="btn btn-primary"
              onClick={this.onRegisterClicked}
            >
              Sign Up
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
