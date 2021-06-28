import React from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends React.Component {
  state = {
    user: {
      loggedIn: false,
      email: " ",
      password: " ",
    },
  };
  onLoginChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let user = { ...prevState.user };

      user[inputName] = newValue;

      return { user };
    });
  };

  userLoginClick = (e) => {
    console.log("Log In was Clicked");
    let payload = { ...this.state.user };
    userService
      .getLogIn(payload)
      .then(this.onLogInSuccess)
      .catch(this.onLogInError);
  };

  onLogInSuccess = (response) => {
    console.log(response);
    this.props.history.push("/home");
    toast.success("Logged In!", {
      position: "top-right",
      pauseOnHover: true,
      draggable: true,
      closeOnClick: true,
    });
  };
  onLogInError = (response) => {
    console.warn(response.messages);
    toast.success("Oops! Submission Failed", {
      position: "top-right",
      pauseOnHover: true,
      draggable: true,
      closeOnClick: true,
    });
  };

  render() {
    return (
      <div className="m-container">
        <div className="m-container">
          <form onSubmit={this.submitForm}>
            <div>
              <div>
                <div className="col-3">
                  <h1>Login</h1>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter Email"
                    onChange={this.onLoginChanged}
                    value={this.state.user.email}
                  />
                </div>
              </div>
              <div>
                <div className="col-3">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    placeholder="********"
                    onChange={this.onLoginChanged}
                    value={this.state.user.password}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="mb-3 form-check" />
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  remember me
                </label>
                <div className="p-3 bg" />
                <button
                  type="button"
                  className="btn btn-primary btn-md"
                  onClick={this.userLoginClick}
                >
                  Log In
                </button>
                &nbsp;
                <div className="p-3 bg" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
