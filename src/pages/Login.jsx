import React from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as userService from "../services/userService";

class Login extends React.Component {
  state = { formData: { eMail: "", password: "", tenantId: "" } }; // that we coordinate with the names of the
  //properties of state
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value; //  capture prop value
    let inputName = currentTarget.name; // 4. assn prop name of input value (i.e. eMail)
    //console.log(newValue, currentTarget);

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue; // bind state to each form field
      // as characters are entered
      return { formData };
    });
  };

  onClickLogin = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let payload = { ...this.state.formData };
    console.log(payload);
    // let data = {
    //   email: "user@google.com",
    //   password: "1Password!",
    //   tenantId: "U01KM94881G",
    // };

    userService
      .logIn(payload)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (res) => {
    console.log("logged in", res);
    toast.success("Login Successful", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    this.props.history.push("/home");
    console.log("this props upon login", this.props);
  };

  onActionError = (errRes) => {
    console.log(errRes);
    toast.error("Login Failure. Check Spelling", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  onClickRegister = (e) => {
    e.preventDefault();
    console.log("onRegisterclick");
    this.props.history.push("/register");
  };

  render() {
    return (
      <React.Fragment>
        <div className="container main flex-column bkground">
          <div className="container parent-container d-flex">
            <div className="container bkground">
              <div className="row">
                <div className="col-xs-6 col-sm-3 col-md-4 p-5">
                  <h2 className="p-1">Please Login</h2>
                  <span className="p-3"></span>
                  
                  <form>
                    <div className="form-group">
                      <label htmlFor="InputEmail">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="eMail" // 1. coordinate name of input
                        value={this.state.formData.eMail} // 2. with name of property in state
                        onChange={this.onFormFieldChanged} // 3. create onChange handler
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="InputPassword">password</label>
                      <input
                        type="current-password"
                        className="form-control"
                        name="password"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formData.password}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="InputPassword">tenantId</label>
                      <input
                        type="text"
                        className="form-control"
                        name="tenantId"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formData.tenantId}
                      />
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.onClickLogin}
                    >
                      Login
                    </button>
                  </form>
                </div>
                <div className="login-help p-5">
                  <p>Need To SignUp?</p>
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={this.onClickRegister}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
