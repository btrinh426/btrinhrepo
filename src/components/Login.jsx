import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as userService from "../services/userService";

class Login extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
      tenantId: "1626",
    },
  };

  onLoginChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onSignIn = () => {
    console.log("Sign In is working");

    const user = this.state.formData;
    userService
      .logIn(user)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log(response.data);
    toast.success("Login Successful!");
  };

  onActionError = (errResponse) => {
    console.log(errResponse);
    toast.error("Login Failed!");
  };

  render() {
    return (
      <form className="p-4">
        <div className="form-group">
          <label htmlFor="exampleDropdownFormEmail2">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={this.onLoginChanged}
            value={this.state.formData.email}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="exampleDropdownFormPassword2">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={this.onLoginChanged}
            value={this.state.formData.password}
          ></input>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.onSignIn}
        >
          Sign in
        </button>
      </form>
    );
  }
}

export default Login;
