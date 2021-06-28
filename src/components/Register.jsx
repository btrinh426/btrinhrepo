import React from "react";
import { toast } from "react-toastify";
import * as userService from "../services/userService";

class Register extends React.Component {
  state = {
    regData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "U01RD0GNJKE",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let regData = { ...prevState.regData };

      regData[inputName] = newValue;
      //console.log("regData", regData.firstName, { regData });

      return { regData };
    });
  };

  onRegButton = (e) => {
    e.preventDefault();
    userService
      .register(this.state.regData)
      .then(this.onRegSuccess)
      .catch(this.onRegError);
  };

  onRegSuccess = (response) => {
    console.log(response);
    toast.success("registration, successful.");
  };

  onRegError = (response) => {
    console.warn(response);
    toast.error("registration, not successful.");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="firstNameInput">first name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userFirstName"
                    name="firstName"
                    onChange={this.onFormFieldChanged}
                    value={this.state.regData.firstName}
                    placeholder="first name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastNameInput">last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userLastName"
                    name="lastName"
                    onChange={this.onFormFieldChanged}
                    value={this.state.regData.lastName}
                    placeholder="last name"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="emailInput">email</label>
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  value={this.state.regData.email}
                  placeholder="email@example.com"
                />
                <small id="emailHelp" className="form-text text-muted">
                  we'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="passwordInput">password</label>
                <input
                  type="password"
                  className="form-control"
                  id="userPassword"
                  name="password"
                  onChange={this.onFormFieldChanged}
                  value={this.state.regData.password}
                  placeholder="password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="pWConfirmInput">confirm password</label>
                <input
                  type="password"
                  className="form-control"
                  id="userPWConfirm"
                  name="passwordConfirm"
                  onChange={this.onFormFieldChanged}
                  value={this.state.regData.passwordConfirm}
                  placeholder="re-enter password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="avatarUrlInput">upload profile image</label>
                <input
                  type="url"
                  className="form-control"
                  id="userAvatarUrl"
                  name="avatarUrl"
                  onChange={this.onFormFieldChanged}
                  value={this.state.regData.avatarUrl}
                  placeholder="avatar url"
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-dark"
                onClick={this.onRegButton}
              >
                register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
