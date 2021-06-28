import React, { Component } from "react";
import { postUser } from "../services/userService";
import { toast } from "react-toastify";

class Registration extends Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "U01UAJY7BR7",
    },
  };

  onInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let name = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[name] = newValue;
      console.log(formData);

      return { formData };
    });
  };
  handleClick = (e) => {
    e.preventDefault();
    postUser(this.state.formData)
      .then(this.onPostUserSuccess)
      .catch(this.onPostUserError);
  };

  onPostUserSuccess = (Response) => {
    toast.success(
      `Welcome ${this.state.formData.firstName} Registration was successful`
    );
  };

  onPostUserError = (Response) => {
    toast.error("Please fill out form completely");
  };

  //on input change will update as one types, creating a new state each time.

  render() {
    return (
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input
            onChange={this.onInputChange}
            name="firstName"
            value={this.state.formData.firstName}
            className="form-control"
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            onChange={this.onInputChange}
            name="lastName"
            value={this.state.formData.lastName}
            className="form-control"
            id="exampleInputLastName"
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            onChange={this.onInputChange}
            name="email"
            value={this.state.formData.email}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={this.onInputChange}
            name="password"
            value={this.state.formData.password}
            className="form-control"
            type="password"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            onChange={this.onInputChange}
            value={this.state.formData.passwordConfirm}
            name="passwordConfirm"
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <div className="form-group">
          <label>Avatar Url</label>
          <input
            onChange={this.onInputChange}
            name="avatarUrl"
            value={this.state.formData.avatarUrl}
            className="form-control"
            id="avatarUrl"
            placeholder="Avatar Url"
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label">Check me out</label>
        </div>
        <button
          onClick={this.handleClick}
          type="button"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default Registration;
