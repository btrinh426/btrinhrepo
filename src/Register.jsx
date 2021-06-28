import React, { Component } from "react";
import { register } from "./services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class Register extends Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "",
    },
    isModalOpen: false,
    hadMadeAjax: true,
    arrayOfComp: [],
  };
  onButtonClicked = (e) => {
    e.preventDefault();
    console.log("Submitting user registration information");
    let data = this.state.formData;
    register(data).then(this.onRegisterSuccess).catch(this.onRegisterError);
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
  onRegisterSuccess = () => {
    console.log("User Registration Success @", new Date());
    toast.success("Success! You have registered successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.props.history.push("/login");
  };
  onRegisterError = (response) => {
    console.warn({ error: response });
    toast.error("Error! You are not registered", {
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
      <div className="container">
        <div className="row mt-5 p-4">
          <div className="col-md-6">
            <form className="form">
              <div className="row-md-4">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    id="firstName"
                    onChange={this.onFormFieldChanged}
                    value={this.state.firstName}
                  />
                </div>
              </div>
              <div className="row-md-4">
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    id="lastName"
                    onChange={this.onFormFieldChanged}
                    value={this.state.lastName}
                  />
                </div>
              </div>
              <div className="row-md-4">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    onChange={this.onFormFieldChanged}
                    value={this.state.email}
                  />
                </div>
              </div>
              <div className="row-md-4">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    onChange={this.onFormFieldChanged}
                    value={this.state.password}
                  />
                </div>
              </div>
              <div className="row-md-4">
                <div className="form-group">
                  <label htmlFor="passwordConfirm">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    onChange={this.onFormFieldChanged}
                    value={this.state.confirmPassword}
                  />
                </div>
              </div>
              <div className="row-md-4">
                <div className="form-group">
                  <label htmlFor="avatarUrl">Avatar Url</label>
                  <input
                    type="text"
                    className="form-control"
                    name="avatarUrl"
                    id="avatarUrl"
                    onChange={this.onFormFieldChanged}
                    value={this.state.avatar}
                  />
                </div>
              </div>
              <div className="row-md-4">
                <div className="form-group">
                  <label htmlFor="tenantId">tenantId</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tenantId"
                    id="tenantId"
                    onChange={this.onFormFieldChanged}
                    value={this.state.tenantId}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.onButtonClicked}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;