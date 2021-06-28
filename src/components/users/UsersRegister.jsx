import React from "react";
import * as usersService from "../../services/usersService.js";

class UsersRegister extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};

      newState[inputName] = newValue;

      return newState;
    });
  };

  usersRegisterClicked = (e) => {
    e.preventDefault();

    let data = { ...this.state };

    data.tenantId = "U018SUYK401";

    usersService.register(data).then(this.onSuccess).catch(this.onError);
  };

  onError = (response) => {
    console.log("Error is firing", response);
  };

  onSuccess = (response) => {
    console.log("Success is firing", response);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6 p-1">
            <h1 className="p-2">Register User</h1>
            <form className="p-2">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={this.onFormFieldChanged}
                  placeholder="First Name"
                  value={this.state.fName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={this.onFormFieldChanged}
                  placeholder="Last Name"
                  value={this.state.lastName}
                />
                {/* <input
                  type="hidden"
                  className="form-control"
                  id="id"
                  name="id"
                  onChange={this.onFormFieldChanged}
                  value={this.state.id}
                /> */}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  placeholder="email@email.com"
                  value={this.state.email}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={this.onFormFieldChanged}
                    placeholder=""
                    value={this.state.password}
                  />
                </div>
                <div className="form-group col-md">
                  <label htmlFor="passwordConfirm">Password Confirmation</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    onChange={this.onFormFieldChanged}
                    placeholder=""
                    value={this.state.passwordConfirm}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="avatarUrl">Avatar URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="avatarUrl"
                  name="avatarUrl"
                  onChange={this.onFormFieldChanged}
                  placeholder=""
                  value={this.state.avatarUrl}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                id="register"
                name="register"
                onClick={this.usersRegisterClicked}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

export default UsersRegister;
