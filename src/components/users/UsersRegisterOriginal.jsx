import React from "react";
import * as usersService from "../../services/usersService.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class UsersRegister extends React.Component {
  state = {
    newUser: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = { ...this.state.newUser };

      newState[inputName] = newValue;

      return { newUser: newState };
    });
  };

  registerClicked = (e) => {
    e.preventDefault();

    let data = { ...this.state.newUser };

    usersService
      .register(data)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  onRegisterError = (response) => {
    console.log("onRegisterError is firing", response);

    let notify = () =>
      toast.error("Unable to perform registration", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    notify();
  };

  onRegisterSuccess = (response) => {
    console.log("Success is firing", response);

    let notify = () =>
      toast.success("You have completed registration", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    notify();
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
                onClick={this.registerClicked}
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
