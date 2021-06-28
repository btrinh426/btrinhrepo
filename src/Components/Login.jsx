import React from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UserService from "../services/userService";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    tenantId: this.props.tenantId,
  };

  buildPayload = (e) => {
    let newValue = e.currentTarget.value;
    let elementName = e.currentTarget.name;

    this.setState(() => {
      let newState = { ...this.state };
      newState[elementName] = newValue;
      return newState;
    });
  };

  loginUser = () => {
    var payload = this.state;
    console.log(payload);

    UserService.loginUser(payload)
      .then(this.onLoginSuccess)
      .catch(this.onLoginFail);
  };

  onLoginSuccess = (response) => {
    console.log("login good");
    console.log(response);
    Swal.fire({
      icon: "success",
      title: "Login Approved",
    }).then(() => {
      this.props.updateStateOnLogin();
    });
  };

  onLoginFail = (error) => {
    console.log("login bad");
    console.log(error.response);
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Please try again...",
    });
  };

  render() {
    return (
      <div className="col-12 mt-5">
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10 bg-white border m-auto">
          <form id="login-form" className="form" action="" method="post">
            <p className="text-center h4 mt-2" style={{ paddingtop: "10px" }}>
              {this.props.siteName}
            </p>
            <p
              className="text-center mt-2 text-muted"
              style={{ paddingtop: "10px" }}
            >
              Please login to continue
            </p>
            <div className="form-group">
              <input
                type="text"
                name="email"
                id="userEmail"
                className="form-control"
                placeholder="Email"
                onChange={this.buildPayload}
              ></input>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="userPassword"
                className="form-control"
                placeholder="Password"
                onChange={this.buildPayload}
              ></input>
            </div>
            <div className="form-group pb-3">
              <button
                type="button"
                className="btn btn-primary btn-md col-12 mt-2"
                id="loginBtn"
                onClick={this.loginUser}
              >
                Login
              </button>
            </div>

            <p className="text-center">Need to sign up?</p>
            <div className="form-group">
              <NavLink
                to="/register"
                type="button"
                className="btn btn-light btn-md col-12 border"
              >
                Register Now
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
