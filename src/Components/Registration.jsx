import React, { Component } from "react";
import { toast } from "react-toastify";
import { usersService } from "../services/userService";

class Registration extends Component {
  state = {
    registerFormData: {
      firstName: "",
      lastName: "",
      email: "",
      avatarUrl: "",
      password: "",
      passwordConfirm: "",
      tenantId: "U01JYBJ1M51",
    },
  };

  onSubmitClick = (e) => {
    e.preventDefault();
    // console.log("submit clicked");
    // console.log(e.currentTarget);
    // "tenantId": "string" is required
    // let testData = {
    //   firstName: "string",
    //   lastName: "cheese",
    //   email: "user@example.com3",
    //   password: "Sabio123$%",
    //   passwordConfirm: "Sabio123$%",
    //   avatarUrl:
    //     "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/nhq202101160007_0.jpg",
    //   tenantId: "string",
    // };
    //201 success
    usersService
      .register(this.state.registerFormData)
      .then(this.onSubmitSuccess)
      .catch(this.onSubmitError);
  };

  onSubmitSuccess = (response) => {
    console.log({ good: response });
    toast.success("Success! You are now registered.");
  };

  onSubmitError = (response) => {
    console.warn({ error: response });
    toast.error(
      "Something went wrong. Please check your inputs and try again."
    );
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget; //information on field being filled out
    console.log(currentTarget);
    let newValue = currentTarget.value; //new value that was input into the field
    console.log(newValue);
    let inputName = currentTarget.name; //name of field
    console.log(inputName);

    this.setState(() => {
      let registerFormData = { ...this.state.registerFormData }; //make copy of object of current values
      registerFormData[inputName] = newValue; //add new value
      return { registerFormData }; //return object with 1 new value changed
    });
  };

  render() {
    return (
      <div className="registration">
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-7">
              <h1 align="center-text">Registration</h1>
              <form className="needs-validation" id="registrationForm">
                <div className="form-row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="First name"
                      onChange={this.onFormFieldChange}
                      value={this.state.registerFormData.firstName}
                      name="firstName"
                    ></input>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Last name"
                      onChange={this.onFormFieldChange}
                      value={this.state.registerFormData.lastName}
                      name="lastName"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-4 mb-3">
                    <label>Avatar URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="avatarUrl"
                      placeholder="URL"
                      onChange={this.onFormFieldChange}
                      value={this.state.registerFormData.avatarUrl}
                      name="avatarUrl"
                    ></input>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="email"
                      onChange={this.onFormFieldChange}
                      value={this.state.registerFormData.email}
                      name="email"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="form-control"
                      aria-describedby="passwordHelpBlock"
                      onChange={this.onFormFieldChange}
                      value={this.state.registerFormData.password}
                      name="password"
                    ></input>
                    <small
                      id="passwordHelpBlock"
                      className="form-text text-muted"
                    >
                      Make it a good one.
                    </small>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input
                      type="password"
                      id="passwordConfirm"
                      placeholder="Password"
                      className="form-control"
                      aria-describedby="passwordHelpBlock"
                      onChange={this.onFormFieldChange}
                      value={this.state.registerFormData.passwordConfirm}
                      name="passwordConfirm"
                    ></input>
                    <small
                      id="passwordHelpBlock"
                      className="form-text text-muted"
                    >
                      Passwords Must Match
                    </small>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={this.onSubmitClick}
                >
                  Submit form
                </button>
              </form>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default Registration;
