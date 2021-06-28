import React from "react";
import Swal from "sweetalert2";

import * as appService from "../services/appService";

class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl:
        "https://nerdist.com/wp-content/uploads/2020/07/maxresdefault.jpg",
      tenantId: "U01JY5G7M18",
    },
  };

  onFormFieldChanged = (e) => {
    // console.log(e.currentTarget.name);
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  registerUser = (e) => {
    e.preventDefault();
    console.log(this.state.formData.firstName);
    // const payload = {
    //   firstName: this.state.formData.firstName,
    //   lastName: this.state.formData.lastName,
    //   email: this.state.formData.email,
    //   password: this.state.formData.password,
    //   passwordConfirm: this.state.formData.passwordConfirm,
    //   avatarUrl: this.state.formData.avatarUrl,
    //   tenantId: this.state.formData.tenantId,
    // };
    const data = this.state.formData;

    appService
      .register(data)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  onRegisterSuccess = (response) => {
    console.log("register success");
    Swal.fire({
      icon: "success",
      text: "Register success!",
      footer: "Have a great time!",
    });
  };

  onRegisterError = (errResponse) => {
    console.log(errResponse);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Could not register!",
      footer: "Already registered? <a> Log in</a>",
    });
  };
  render() {
    // console.log(this); if you're ever curious how to see the currentState
    return (
      <div className="container pt-4">
        <div className="row">
          <div className="col-md-12">
            <form>
              <h1 className="text-center">Register</h1>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.lastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.password}
                />
              </div>
              <div className="form-group">
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="passwordConfirm"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.passwordConfirm}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.registerUser}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
