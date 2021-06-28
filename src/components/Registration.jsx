import React from "react";
import * as userService from "../services/userServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        avatarUrl: "",
        tenantId: "sabio123",
      },
    };
  }

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

  userRegistration = (e) => {
    e.preventDefault();

    //console.log("user registration state:", this.state);
    userService
      .newUserRegistration(this.state)
      .then(this.onUserRegistrationSuccess)
      .catch(this.onUserRegistrationError);
  };

  onUserRegistrationSuccess = (response) => {
    this.successNotification(response);
  };

  onUserRegistrationError = (response) => {
    this.errorNotification(response);
  };

  //toast on success
  successNotification = (response) => {
    toast.success(`🙌Registration Successful! Yaaasss!! <br /> ${response}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //toast on error
  errorNotification = (response) => {
    toast.error(`Yikes! Registration Error!<br /> ${response}`, {
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
      <main className="form-signin">
        <h2>Register</h2>
        <form>
          <div className="form-floating">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              id="firstName"
              value={this.state.formData.firstName}
              onChange={this.handleFormChange}
            />
          </div>
          <div className="form-floating">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              id="lastName"
              value={this.state.formData.lastName}
              onChange={this.handleFormChange}
            />
          </div>
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
          <div className="form-floating">
            <label htmlFor="passwordConfirm">Password Confirm</label>
            <input
              type="password"
              className="form-control"
              name="passwordConfirm"
              id="passwordConfirm"
              value={this.state.formData.passwordConfirm}
              onChange={this.handleFormChange}
            />
          </div>
          <div className="form-floating">
            <label htmlFor="avatarUrl">Profile URL</label>
            <input
              type="text"
              className="form-control"
              name="avatarUrl"
              id="avatarUrl"
              value={this.state.formData.avatarUrl}
              onChange={this.handleFormChange}
            />
          </div>
          <div className="d-grid gap-2 mx-auto m-3">
            <button
              type="submit"
              className="btn btn-info btn-large btn-block p-2"
              onClick={this.userRegistration}
            >
              Register
            </button>
          </div>
        </form>
      </main>
    );
  }
}

export default Registration;
