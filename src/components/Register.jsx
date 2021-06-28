import React from "react";
import userService from "../services/usersServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Register extends React.Component {
  state = {
    newUser: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
    },
  };

  onRegisterFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let newUser = { ...prevState.newUser };

      newUser[inputName] = newValue;

      return { newUser };
    });
  };

  onSubmitClick = () => {
    let payload = { ...this.state.newUser };
    console.log(payload);

    userService
      .registerUser(payload)
      .then(this.onSubmitSuccess)
      .catch(this.onSubmitError);
  };

  onSubmitSuccess = (response) => {
    toast.success("Successful !!");
  };

  onSubmitError = (response) => {
    let errorMessages = response.response.data.errors;
    errorMessages.forEach((ele) => toast.error(ele));
  };

  render() {
    return (
      <div className="container form">
        <div className="row">
          <div className="col-md-6">
            <div id="head">
              <h1>Register User</h1>
            </div>
            <form id="body">
              <div className="form-group register-group row">
                <label htmlFor="fName" className="col-sm-4 col-form-label">
                  First Name
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    aria-describedby="emailHelp"
                    placeholder="John"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group register-group row">
                <label htmlFor="lName" className="col-sm-4 col-form-label">
                  Last Name
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Doe"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group register-group row">
                <label htmlFor="email" className="col-sm-4 col-form-label">
                  Email
                </label>
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="example@mail.com"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group register-group row">
                <label htmlFor="password" className="col-sm-4 col-form-label">
                  Password
                </label>
                <div className="col-sm-8">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="password"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group register-group row">
                <label
                  htmlFor="confirmpassword"
                  className="col-sm-4 col-form-label"
                >
                  Confirm Password
                </label>
                <div className="col-sm-8">
                  <input
                    type="password"
                    className="form-control"
                    name="passwordConfirm"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group register-group row">
                <label htmlFor="avatar" className="col-sm-4 col-form-label">
                  Avatar Url
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="avatarUrl"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group register-group row">
                <div className="col-sm-8" id="casingsubmit">
                  <button
                    type="button"
                    onClick={this.onSubmitClick}
                    className="btn btn-primary"
                  >
                    Submit Form
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
