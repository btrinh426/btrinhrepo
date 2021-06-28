import React, { Component } from "react";
import { login } from "./services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class Login extends Component {
  state = {
    formData: {
      email: "",
      password: "",
    },
    isModalOpen: false,
    hadMadeAjax: true,
    arrayOfComp: [],
  };
  onButtonClicked = (e) => {
    e.preventDefault();
    console.log("Logging in");
    let data = this.state.formData;
    login(data).then(this.onLoginSuccess).catch(this.onLoginError);
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
  onLoginSuccess = () => {
    console.log("User logged in @", new Date());
    toast.success("Login Successful", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.props.history.push("/");
  };
  onLoginError = (response) => {
    console.warn({ error: response });
    toast.error("Error! You are not Logged in", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  render() {
    return (
      <div id="login">
        <h3 className="text-center text-white pt-5">Welcome</h3>
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form">
                  <h3 className="text-center text-info">SIGN IN TO CONTINUE</h3>
                  <div className="form-group">
                    <label htmlFor="email" className="text-info">
                      Enter Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="text-info">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                    ></input>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-info"
                    onClick={this.onButtonClicked}
                  >
                    Login
                  </button>
                  <div id="register-link" className="text-right">
                    <a href="#" className="text-info">
                      Register here
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;