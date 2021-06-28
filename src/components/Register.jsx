import React from "react";

import userService from "../services/UserService";

import { toast } from "react-toastify";

class Register extends React.Component {
  state = {
    user: {
      firstName: "Michael",
      lastName: "Andino-Luciano",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "https://api.remotebootcamp.dev/apihelp/rbclogo.png",
      tenantId: "EXAMPLE_T_ID",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let user = { ...this.state.user };

      user[inputName] = newValue;

      return { user };
    });
  };

  onSubmitClicked = (e) => {
    e.preventDefault();
    const data = this.state.user;
    userService
      .register(data)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
    console.log("Submit was clicked", new Date());
  };

  onRegisterSuccess = (response) => {
    toast.success("register Successful", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log("register successful", response);
    this.props.history.push("/Login/");
  };

  onRegisterError = (err) => {
    toast.warning("Unsuccessful register", err, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.error(err);
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={this.state.user.firstName}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={this.state.user.lastName}
            onChange={this.onFormFieldChanged}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={this.state.user.email}
            onChange={this.onFormFieldChanged}
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={this.state.user.password}
            onChange={this.onFormFieldChanged}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirm"
            name="passwordConfirm"
            value={this.state.user.passwordConfirm}
            onChange={this.onFormFieldChanged}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          id="sign-up"
          name="sign-up"
          onClick={this.onSubmitClicked}
        >
          Sign me up!
        </button>
      </form>
    );
  }
}

export default Register;
