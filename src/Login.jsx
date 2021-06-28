import React from "react";

import { login } from "./components/apiServices.js";
import { getCurrentUser } from "./components/apiCalls.js";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  } // end constructor

  setLoggedIn = (person) => {
    this.props.parentSetLogin(person);
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let newValue = currentTarget.value;

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      return newState;
    });
  }; // end onFormFieldChanged

  getUserData = () => {
    var login = {
      email: this.state.email,
      password: this.state.password,
      tenantId: "U01U45PKVM2",
    };

    return login;
  };

  userLogin = (payload) => {};

  onLogin = () => {
    login(this.getUserData())
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
  };

  onLoginSuccess = () => {
    // console.log("logged in");
    getCurrentUser().then(this.getCurUserSuccess).catch(this.getCurUserError);
  };

  onLoginError = () => {
    console.log("could not log in");
    this.setLoggedIn({});
  };

  getCurUserSuccess = (response) => {
    console.log(response.data.item);
    this.setLoggedIn({ userfirstName: response.data.item.name });
  };

  // JTG: could check type of error
  // might be no user current or might be error
  getCurUserError = (response) => {
    this.setLoggedIn("");
  };

  render = () => {
    return (
      <form>
        <div className="form-floating">
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <h1 className="h3 mb-3 fw-normal">Sign in</h1>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">E-mail</label>
            <div className="col-sm-10">
              <input
                id="email"
                className="edit-control"
                type="email"
                name="email"
                onChange={this.onFormFieldChanged}
                value={this.state.email}
              ></input>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                id="password"
                className="edit-control"
                type="password"
                name="password"
                onChange={this.onFormFieldChanged}
                value={this.state.password}
              ></input>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={this.onLogin}
          id="register"
        >
          Sign in
        </button>
      </form>
    );
  };
}

export default Login;
