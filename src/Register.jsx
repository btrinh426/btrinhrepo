import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as userService from "./services/userService";

class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "U01HLGH2RKJ",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    //console.log({newValue, currentTarget});

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;
      //console.log("newState", newState.firstName, {newState});

      return { formData };
    });
  };

  submitForm = (e) => {
    e.preventDefault();

    userService
      .register(this.state.formData)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  onRegisterSuccess = (response) => {
    console.log(response);
    toast.success("Success!");
    userService.email().then(this.onEmailSuccess).catch(this.onEmailError);
  };
  onRegisterError = (response) => {
    console.log(response);
    toast.error("Please enter your data correctly.");
  };
  onEmailSuccess = (response) => console.log(response);
  onEmailError = (err) => console.log(err);

  render() {
    return (
      <React.Fragment>
        <div className="container pt-5 pb-5">
          <ToastContainer />
          <form className="card">
            <div className="card-header text-center">Register</div>
            <div className="form-group row m-3">
              <label htmlFor="firstName" className="col-sm-2 col-form-label">
                First Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.firstName}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="lastName" className="col-sm-2 col-form-label">
                Last Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.lastName}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.email}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.password}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label
                htmlFor="confirmPassword"
                className="col-sm-2 col-form-label"
              >
                Confirm Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.passwordConfirm}
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="avatarUrl" className="col-sm-2 col-form-label">
                Avatar Url
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="avatarUrl"
                  name="avatarUrl"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.avatarUrl}
                />
              </div>
            </div>
            <div className="form-group row mx-auto">
              <button className="btn btn-primary" onClick={this.submitForm}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
