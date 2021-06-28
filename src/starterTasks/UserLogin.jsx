import React from "react";
import userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class LoginForm extends React.Component {
  state = {
    loginData: { email: "", password: "", tenantId: "U01CZ6XELN4" },
  };

  loginButton = (e) => {
    e.preventDefault();
    userService
      .logIn(this.state.loginData)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  toRegisterButton = (e) => {
    e.preventDefault();
    console.log("i was pressed");
    this.props.history.push("/Registration");
  };

  onActionSuccess = (response) => {
    // this.props.history.push("/Registration");
    console.log("Success");
    toast.success("You Are In!", "Success");
    this.props.history.push("/homePage");
  };

  onActionError = (errResponse) => {
    console.log("Failure");
    toast.error("WRONG!", "Failure");
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let loginData = { ...this.state.loginData };

      loginData[inputName] = newValue;

      return { loginData };
    });
  };

  render() {
    return (
      <form className="row g-3 p-5">
        <div className="col-12">
          <label htmlFor="emailInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="userEmail"
            name="email"
            placeholder="your-email@whatever.com"
            onChange={this.onFormFieldChange}
            value={this.state.loginData.email}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            name="password"
            onChange={this.onFormFieldChange}
            value={this.state.loginData.password}
          />
        </div>
        <div className="col-12" />
        <div className="col-12">
          <button
            onClick={this.loginButton}
            type="submit"
            className="btn btn-primary"
            id="userLogin"
          >
            Login
          </button>
          <button
            onClick={this.toRegisterButton}
            type="submit"
            className="btn btn-secondary"
            id="registerPage"
          >
            Register
          </button>
        </div>
      </form>
    );
  }
}

export default LoginForm;
