import React from "react";
import userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class RegisterForm extends React.Component {
  state = {
    regData: {
      firstName: "",
      lastName: "",
      email: "",
      avatarUrl: "",
      password: "",
      passwordConfirm: "",
      tenantId: "U01CZ6XELN4",
    },
  };

  regButton = (e) => {
    e.preventDefault();
    userService
      .register(this.state.regData)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log("Success");
    toast.success("Registered!", "Success");
    this.props.history.push("/userLogin");
  };

  onActionError = (errResponse) => {
    console.log("Failure");
    toast.error("Too Bad!", "Failure");
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let regData = { ...prevState.regData };

      regData[inputName] = newValue;

      return { regData };
    });
  };

  render() {
    return (
      <form className="row g-3 p-5">
        <div className="col-md-6">
          <label htmlFor="firstNameInput" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="userFirstName"
            name="firstName"
            onChange={this.onFormFieldChange}
            value={this.state.regData.firstName}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastNameInput" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="userLastName"
            name="lastName"
            onChange={this.onFormFieldChange}
            value={this.state.regData.lastName}
          />
        </div>
        <div className="col-12">
          <label htmlFor="emailInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="userEmail"
            name="email"
            placeholder="your-email@whatever.com"
            onChange={this.onFormFieldChange}
            value={this.state.regData.email}
          />
        </div>
        <div className="col-12">
          <label htmlFor="urlInput" className="form-label">
            URL
          </label>
          <input
            type="text"
            className="form-control"
            id="userUrl"
            name="avatarUrl"
            placeholder="https//"
            onChange={this.onFormFieldChange}
            value={this.state.regData.avatarUrl}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            name="password"
            onChange={this.onFormFieldChange}
            value={this.state.regData.password}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="passwordConfirmInput" className="form-label">
            Password Confirm
          </label>
          <input
            type="password"
            className="form-control"
            id="userPasswordConfirm"
            name="passwordConfirm"
            onChange={this.onFormFieldChange}
            value={this.state.regData.passwordConfirm}
          />
        </div>
        <div className="col-12" />
        <div className="col-12">
          <button
            onClick={this.regButton}
            type="submit"
            className="btn btn-primary"
            id="userRegister"
          >
            Register
          </button>
        </div>
      </form>
    );
  }
}

export default RegisterForm;
