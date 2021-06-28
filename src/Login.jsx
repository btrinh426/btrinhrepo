import React, { Component } from "react";
import "./App.css";
import * as userService from "./services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, NavLink, Link, Switch } from "react-router-dom";
import Register from "./Register";

class Login extends Component {
  state = {
    email: "",
    password: "",
    tenantId: "1423",
  };

  onLoginFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      return newState;
    });
  };

  //!!!!!!MAKE SURE TO AJAX CURRENT USER BEFORE CHECKING USER BY ID

  loginClicked = (e) => {
    e.preventDefault();
    // userService
    //   .getCurrentUsers()
    //   .then(function (response) {
    //     toast("You are already logged in");
    //     return response;
    //   })
    //   .catch(userService.logIn);
    userService
      .getCurrentUsers()
      .then(this.onGetCurrentUsersSuccess)
      .catch(this.onGetCurrentUsersFail);
  };

  onGetCurrentUsersSuccess = () => {
    toast("You are already logged in");
  };

  onGetCurrentUsersFail = () => {
    userService
      .logIn(this.state)
      .then(this.loginSuccess)

      .catch(this.loginFail);
  };

  loginSuccess = (data) => {
    console.log("You've Successfully Logged In", data);

    toast("You've Successfully Logged In", data);
  };

  loginFail = (err) => {
    console.error("Invalid Email or Password", err);
    toast("Invalid Email or Password", err);
  };

  onRegisterClicked = () => {
    // this.props.history.push("/register");
    userService
      .getCurrentUsers()
      .then(this.onGetCurrentUsersSuccess)
      .catch(this.onGetCurrentUsersError);
  };

  onGetCurrentUsersError = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.loginClicked}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={this.onLoginFieldChanged}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={this.onLoginFieldChanged}
              value={this.state.password}
            />
          </div>

          <button type="submit" className="btn btn-primary submit loginBtn">
            Log In
          </button>
          {/* <Switch> */}

          <NavLink to="/register">
            <button
              className="btn btn-primary nav-link link-button loginBtn"
              onClick={this.onRegisterClicked}
            >
              Register
            </button>
          </NavLink>
          {/* </Switch> */}
        </form>
        {/* <BrowserRouter>
          <Route
            path="/register"
            exact={true}
            component={Register}
            // render={() => <Register></Register>}
          ></Route>
        </BrowserRouter> */}
      </React.Fragment>
    );
  }
}

export default Login;
