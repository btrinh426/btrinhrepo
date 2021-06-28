import React from "react";
import * as userService from "../services/userServices";
import { toast, ToastContainer } from "react-toastify";

class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "U01G6AS2WER",
    },

    name: "HELLO",
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    console.log("I just clicked a submit button");

    userService
      .register(this.state.formData)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  // clickRegister = (e) => {
  //   e.preventDefault;
  //   console.log(response);
  //   toast.error("fix this.")
  // };

  changeName = (e) => {
    e.preventDefault();

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          name: "you changed the name..",
        };
      },
      () => console.log("after we setState", this.state.name)
    );
  };

  render() {
    return (
      <div className="container pt-5 pb-5">
        <ToastContainer />
        <form className="card">
          <h1> {this.state.name} </h1>
          <button type="button" onClick={this.changeName}>
            Change Name
          </button>
          <div className="card-header text center"> Register </div>
          <div className="form-group row m-3">
            <label htmlFor="FirstName" className="col-sm2 col-form-label">
              First Name
            </label>
            <div className="col-sm10">
              <input
                type="text"
                className="form-control"
                id="FirstName"
                name="firstName"
                placeholder="Brian, Bill, etc."
                value={this.state.formData.firstName}
                onChange={this.onFormFieldChange}
              />
            </div>
          </div>
          <div className="form-group row m-3">
            <label htmlFor="LastName" className="col-sm2 col-form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="LastName"
              name="lastName"
              placeholder="Rose, Garcia, etc."
              value={this.state.formData.lastName}
              onChange={this.onFormFieldChange}
            />
          </div>
          <div className="form-group row m-3">
            <label htmlFor="email" className="col-sm2 col-form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="gmail, yahoo, etc"
              name="email"
              value={this.state.formData.email}
              onChange={this.onFormFieldChange}
            />
          </div>
          <div className="form-group row m-3">
            <label htmlFor="password" className="col-sm2 col-form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              name="password"
              value={this.state.formData.password}
              onChange={this.onFormFieldChange}
            />
          </div>
          <div className="form-group row m-3">
            <label htmlFor="passwordConfirm" className="col-sm2 col-form-label">
              Password Confirmation
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="passwordConfirm"
              placeholder="password"
              value={this.state.formData.passwordConfirm}
              onChange={this.onFormFieldChange}
            />
          </div>
          <div className="form-group row m-3">
            <label htmlFor="avatarUrl" className="col-sm2 col-form-label">
              Avatar Url
            </label>
            <input
              type="text"
              className="form-control"
              id="avatarUrl"
              placeholder="avatarUrl"
              name="avatarUrl"
              value={this.state.formData.avatarUrl}
              onChange={this.onFormFieldChange}
            />
          </div>
          <button type="button" onClick={this.submitForm}>
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
