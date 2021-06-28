import React from "react";
import * as userService from "../../services/userServices";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class RegisterForm extends React.Component {
  //Capture form data and setState().
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState(() => {
      let newState = {};
      let inputName = currentTarget.name;
      newState[inputName] = newValue;
      return newState;
    });
  };
  //Prepare form data for userService.register call and make call
  submitRegistrationForm = (e) => {
    e.preventDefault();
    var payload = { ...this.state };
    payload.tenantId = userService.tenantId;
    userService
      .register(payload)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  //User registered successfully, show a nice message
  onRegisterSuccess = () => {
    toast.success(
      `${this.state.firstName} ${this.state.lastName} registered successfully!`,
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    setTimeout(() => {
      this.props.history.push("/home");
    }, 1500);
  };
  //User was not registered, show a less nice message.
  //Implement more detailed Error message Here
  onRegisterError = (data) => {
    toast.error(
      `Something went wrong! 
    Please check your data.`,
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron my-2">
          <h1 className="display-5"> User Registration</h1>
          <NavLink to="/login" exact>
            <button type="button" className="btn btn-outline-info my-3">
              Already registered? Log in here!
            </button>
          </NavLink>
        </div>
        <form className="mx-5">
          <div className="form-group p-5 col-4">
            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              onChange={this.onFormFieldChanged}
            />
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              onChange={this.onFormFieldChanged}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={this.onFormFieldChanged}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={this.onFormFieldChanged}
            />
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordConfirm"
              name="passwordConfirm"
              onChange={this.onFormFieldChanged}
            />
            <label htmlFor="avatar">Avatar Url</label>
            <input
              type="text"
              className="form-control"
              id="avatarUrl"
              name="avatarUrl"
              onChange={this.onFormFieldChanged}
            />

            <button
              type="submit"
              className="btn btn-primary mt-2"
              onClick={this.submitRegistrationForm}
            >
              Submit
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
