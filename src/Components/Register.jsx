import React from "react";
import { toast } from "react-toastify";
import { register } from "../services/userService";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    registerResponse: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarURL: "",
  };

  onButtonClick = () => {
    console.log("Registration button clicked.");

    register(this.state).then(this.onSuccess).catch(this.onError);
  };

  onError = (error) => {
    toast("Register failed.", {
      className: "error-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  onSuccess = (response) => {
    toast("Register succcess.", {
      className: "Success-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  onTextInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};

      newState[inputName] = newValue;

      return newState;
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="firstName"
            className="form-control"
            id="firstName"
            placeholder="First Name"
            name="firstName"
            onChange={this.onTextInputChange}
            value={this.state.firstName}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="lastName"
            className="form-control"
            id="lastName"
            placeholder="Last Name"
            name="lastName"
            onChange={this.onTextInputChange}
            value={this.state.lastName}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="userEmail">Email</label>
          <input
            type="userEmail"
            className="form-control"
            id="Email"
            placeholder="Email Address"
            name="email"
            onChange={this.onTextInputChange}
            value={this.state.email}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="userPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            placeholder="Password"
            name="password"
            onChange={this.onTextInputChange}
            value={this.state.password}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="confirmPassword"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            name="passwordConfirm"
            onChange={this.onTextInputChange}
            value={this.state.passwordConfirm}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="avatarURL">Avatar URL</label>
          <input
            type="avatarURL"
            className="form-control"
            id="avatarURL"
            placeholder="Avatar URL"
            name="avatarURL"
            onChange={this.onTextInputChange}
            value={this.state.avatarURL}
          ></input>
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onButtonClick}
          >
            Submit form
          </button>
          <Link to={"/login"} class="Button ">
            Already registered? Login now here.
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
