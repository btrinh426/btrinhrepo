import React from "react";
import * as userServices from "../../services/userServices";
import { NavLink, Route } from "react-router-dom";
import Registration from "../Registration";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: "",
        password: "",
        tenantId: "sabio123",
      },
    };
  }

  loginUser = (e) => {
    e.preventDefault();

    userServices
      .userLogin(this.state.formData)
      .then(this.onLoginUserSuccess)
      .catch(this.onLoginUserError);
  };

  handleFormChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;

      return { formData };
    });
  };

  onLoginUserSuccess = (response) => {
    this.successNotification(response);
  };

  onLoginUserError = (response) => {
    this.errorNotification(response);
  };

  toDashboard = () => {
    this.props.history.push("/");
  };

  successNotification = (response) => {
    toast.success(`Login Successful! Please wait while you're redirected.`, {
      autoClose: 1500,
    });

    setTimeout(this.toDashboard, "1500");
  };

  errorNotification = (response) => {
    toast.error(`Login Error! ${response}`);
  };

  render() {
    return (
      <main className="form-signin">
        <h2>Log In</h2>
        <form>
          <div className="form-floating">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={this.state.formData.email}
              onChange={this.handleFormChange}
            />
          </div>
          <div className="form-floating">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={this.state.formData.password}
              onChange={this.handleFormChange}
            />
          </div>
          <div className="d-grid gap-2 mx-auto m-3">
            <button
              type="submit"
              className="btn btn-info btn-large btn-block p-2"
              onClick={this.loginUser}
            >
              Login
            </button>
            <button type="button" className="btn btn-link btn-block">
              <NavLink to="/registration">Register New Account</NavLink>
              <Route path="/registration" component={Registration} />
            </button>
          </div>
        </form>
      </main>
    );
  }
}

export default Login;
