import React from "react";
import * as userService from "../services/userService";
import { toast, ToastContainer } from "react-toastify";

class Login extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
      tenantId: "U01R026Q614",
    },
    currentUser: {
      firstName: "",
    },
  };

  onPasswordLoginChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  signInButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    userService
      .logIn(this.state.formData)
      .then(this.user)
      .catch(this.onLogInError);
  };

  user = () => {
    userService
      .currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);

    toast.success("Sign In Successful!");
  };

  onLogInError = (response) => {
    console.warn({ error: response });

    toast.error("Please Try Again!");
  };

  onCurrentUserSuccess = (response) => {
    let newName = response.data.item.name;

    var newUser = { ...this.state.currentUser };

    newUser.firstName = newName;

    var newState = { currentUser: newUser };

    this.setState(newState);
  };

  onCurrentUserError = (response) => {
    console.warn({ error: response });
  };

  render() {
    let styles = {
      marginRight: "500px",
      marginLeft: "480px",
      marginTop: "40px",
    };
    return (
      <React.Fragment>
        <ToastContainer />
        <h1 style={styles}>Welcome {this.state.currentUser.firstName}!</h1>
        <div className="container"></div>
        <form style={styles}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={this.onPasswordLoginChange}
              value={this.state.formData.email}
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={this.onPasswordLoginChange}
              value={this.state.formData.password}
              name="password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.signInButtonClick}
          >
            Sign In
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
