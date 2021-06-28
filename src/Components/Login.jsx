import React from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Register";
import { NavLink } from "react-router-dom";

toast.configure();

class Login extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
      tenantId: "string",
    },
  };

  // componentDidMount() {
  //   console.log("componentDidMount");
  //   console.log(this.state);

  //   var newInfo = { ...this.state.email };

  //   newInfo.email = "aaron_mags@yahoo.com";

  //   this.setState({ email: newInfo.email });

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name; //firstName or lastName

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    userService
      .logIn(this.state.formData)
      .then(this.onActionSuccess)
      .catch(this.onActionError);

    console.log(this.state.formData);
  };

  onActionSuccess = (response) => {
    toast.success("You have successfull logged in.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onActionError = (errResponse) => {
    toast.error("Unable to log in.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onItemClicked = (e) => {
    console.log("I was clicked", e.currentTarget);
    console.log(this.button);
  };

  render() {
    return (
      <main>
        <div className="container">
          <div className="row">
            <form>
              <div className="mb-3">
                <div id="signInMessage" className="form-text">
                  Sign in to Continue
                </div>
                <label htmlFor="loginInputEmail1" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.password}
                />
              </div>
              <div className="mb-3 form-check"></div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.onClickHandler}
              >
                Login
              </button>
              <p></p>
              <div id="signUpMessage" className="form-text">
                Need to Sign Up?
              </div>
              <button type="submit" className="btn btn-light">
                <NavLink to="/Register/">Register</NavLink>
              </button>
            </form>
          </div>
        </div>
        <hr />
      </main>
    );
  }
}

export default Login;
