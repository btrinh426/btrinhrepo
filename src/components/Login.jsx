import React from "react";
import { NavLink } from "react-router-dom";
import * as usersService from "../services/usersService";
import { toast } from "react-toastify";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: null,
      formData: {
        email: "test@aol.com",
        password: "password111",
      },
    };
  }

  onSignInBtnClicked = (e) => {
    console.log(e.currentTarget);

    usersService
      .signIn(this.state.formData)
      .then(this.onSignInSuccess)
      .catch(this.onSignInError);
  };

  onSignInSuccess = (response) => {
    console.log("login OK");
    toast.success(
      <div>
        Login Successful
        <br />
        Redirecting to your Home Page.
      </div>
    );

    this.props.history.push({ pathname: "/home", state: { isLoggedIn: true } });
  };

  onSignInError = (error) => {
    console.log("login failed");
    toast.error(
      <div>
        Login Failed
        <br />
        That username and password combination does not exist.
      </div>
    );
  };

  onFormFieldChanged = (e) => {
    console.log(e.currentTarget);
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state };
      formData[inputName] = newValue;
      return { formData };
    });
  };

  render() {
    return (
      <div className="card-container">
        <div className="card">
          <div className="card-body">
            <div className="card-title">Sign In</div>
            <form name="registrationForm">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={this.state.formData.email}
                  onChange={this.onFormFieldChanged}
                />
              </div>

              <div className="form-floating  mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.formData.password}
                  onChange={this.onFormFieldChanged}
                />
              </div>

              <div className="form-floating  mb-3">
                <NavLink to="/forgot" exact>
                  <label>I forgot my password</label>
                </NavLink>
              </div>

              <div className="form-floating  mb-3">
                <NavLink to="/register" exact>
                  <label>Register a new membership</label>
                </NavLink>
              </div>

              <div className="form-floating  mb-3">
                <div
                  type="button"
                  className="btn btn-primary"
                  name="signIn"
                  onClick={this.onSignInBtnClicked}
                >
                  Sign In
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="form-check">
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
