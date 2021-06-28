import React from "react";
import * as usersService from "../services/userService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import UserHome from "./UserHome";
import { Route } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "email@gmail.com",
    password: "Password1!",
    tenantId: "TrelloUser",
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputData = currentTarget.id;

    this.setState(() => {
      let newState = { ...this.state };
      newState[inputData] = newValue;
      return newState;
    });
  };

  onLoginClicked = (e) => {
    console.log("I was Clicked");
    e.preventDefault();
    console.log(e);
    console.log(this.state);
    const data = this.state;
    // this.props.history.push("/home/" + this.state.tenantId, {
    //   type: "LOGIN",
    //   payload: this.state,
    // });
    usersService.login(data).then(this.onLoginSuccess).catch(this.onLoginError);
  };

  onLoginSuccess = (response) => {
    console.log({ login: response.data });
    this.props.history.push("/home/" + this.state.tenantId, { type: "LOGIN" });

    Swal.fire("Good job!", "You clicked the button!", "success");
  };

  onLoginError = (errResponse) => {
    console.error(errResponse);
    Swal.fire("Oops...", "Something went wrong!", "error");
  };

  onRegisterClicked = () => {
    this.props.history.push("/register/");
  };

  render() {
    return (
      <React.Fragment>
        <div className="card-login">
          <h5 className="card-header">Welcome</h5>
          <div className="card-body">
            <form ref={(form) => (this.form = form)}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={this.onFormFieldChanged}
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={this.onFormFieldChanged}
                  value={this.state.password}
                />
              </div>
              <div className="form-group">
                <input
                  id="tenantId"
                  type="hidden"
                  value={this.state.tenantId}
                ></input>
              </div>
              <button
                type="submit"
                className="btn btn-secondary btn-lg btn-block"
                onClick={this.onLoginClicked}
              >
                Login
              </button>
              <Route
                path={"/home/" + this.state.tenantId}
                component={UserHome}
              ></Route>
            </form>
          </div>
          <div className="text-center">
            <p className="card-text">Need to Signup?</p>
            <button
              id="registerFromLoginPage"
              className="btn btn-outline-secondary btn-lg btn-block"
              onClick={this.onRegisterClicked}
            >
              Register Now
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Login;
