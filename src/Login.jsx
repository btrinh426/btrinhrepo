import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { NavLink, Redirect } from "react-router-dom";
import * as userService from "./services/userService";

class Login extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
      tenantId: "U01HLGH2RKJ",
    },
    redirect: false,
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

  loginUser = (e) => {
    e.preventDefault();

    userService
      .logIn(this.state.formData)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
  };

  onLoginSuccess = (response) => {
    console.log(response);
    toast.success("You're logged in.");
    this.setState({ redirect: true });
  };
  onLoginError = (response) => {
    console.warn({ error: response });
    toast.error("Please enter your email and password correctly.");
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/homepage" />;
    }
    return (
      <React.Fragment>
        <div className="container pt-5 pb-5">
          <ToastContainer />
          <form className="card">
            <div className="card-header text-center bg-dark text-white text-large">
              <h3>WELCOME</h3>
            </div>
            <div className="row text-muted card-body text-center mt-3">
              <h5 className="col-12 text-center">Sign in to continue.</h5>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.email}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.password}
                />
              </div>
            </div>
            <div className="form-group row mx-auto">
              <button className="btn btn-primary" onClick={this.loginUser}>
                Login
              </button>
            </div>
            <div className="form-group row text-muted mx-auto p-3">
              <h5 className="col-12 text-center">Need to Signup?</h5>
            </div>
            <div className="form-group row mx-auto pb-3">
              <button className="btn btn-light">
                <NavLink to="/register">Register Now</NavLink>
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
