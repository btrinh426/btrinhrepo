import React from "react";
import * as userService from "../services/userService";

import { ToastContainer, toast } from "react-toastify";

class Login extends React.Component {
  state = {
    formData: {
      email: "Tylerar@dukes.jmu.edu",
      password: "password",
      tenantId: "U01LG539DPD",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    //console.log({ newValue, currentTarget });

    this.setState((prevState) => {
      const formData = { ...prevState.formData };
      formData[inputName] = newValue;
      //newState.firstName = newValue;
      //console.log({ newState });
      return { ...prevState, formData };
    });
  };

  onButtonClicked = (e) => {
    e.preventDefault();
    // console.log("I was clicked");
    //console.log(this.state.formData);
    userService
      .logIn(this.state.formData)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log("it worked!");
    this.props.logIn();

    toast("🦄 Yay, you're logged in!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    this.props.history.push("/home");
  };

  onActionError = (errResponse) => {
    toast("FAIL, try agiain", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  handleRegisterClick = (e) => {
    //this.setState({ isLoggedIn: true });
    console.log("Register clicked");
    this.props.history.push("/register");
  };

  render() {
    return (
      <div className="container col-md-9">
        <div className="row"></div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        <div className=" container bg-text">
          <form>
            <div>
              <label htmlFor="uEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.email}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div>
              <label htmlFor="uPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.password}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onButtonClicked}
            >
              Login
            </button>
            <p> </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleRegisterClick}
            >
              Register new user
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
