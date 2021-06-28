import React from "react";
import * as userService from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userForm: this.propsToFormData(this.props) };
  }

  propsToFormData(props) {
    if (props.location.state && props.location.state.id) {
      return JSON.parse(JSON.stringify(props.location.state));
    } else {
      return {
        firstName: " ",
        lastName: " ",
        email: " ",
        password: " ",
        passwordConfirm: " ",
        avatarUrl: " ",
        tenantId: " ",
      };
    }
  }
  onInputChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log(inputName, newValue);
    this.setState(() => {
      let userData = { ...this.state.userForm };
      userData[inputName] = newValue;
      return { userForm: userData };
    });
  };

  onSaveUserClicked = (e) => {
    e.preventDefault();
    console.log("save this user...");
    userService.addUser(this.state.userForm);
  };
  render() {
    return (
      <div>
        <form id="registerForm">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={this.state.userForm.firstName}
              onChange={this.onInputChanged}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={this.state.userForm.lastName}
              onChange={this.onInputChanged}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={this.state.userForm.email}
              onChange={this.onInputChanged}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={this.state.userForm.password}
              onChange={this.onInputChanged}
            />
          </div>
          <div className="form-group">
            <label>Password Confirm </label>
            <input
              type="text"
              className="form-control"
              name="passwordConfirm"
              value={this.state.userForm.passwordConfirm}
              onChange={this.onInputChanged}
            />
          </div>
          <div className="form-group">
            <label>Avatar Url</label>
            <input
              type="text"
              className="form-control"
              name="avatarUrl"
              value={this.state.userForm.avatarUrl}
              onChange={this.onInputChanged}
            />
          </div>
          <div className="form-group">
            <label>Tenant Id</label>
            <input
              type="text"
              className="form-control"
              name="tenantId"
              value={this.state.userForm.tenantId}
              onChange={this.onInputChanged}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSaveUserClicked}
          >
            Save User
          </button>
          <div></div>
        </form>
      </div>
    );
  }
}

export default UserForm;
