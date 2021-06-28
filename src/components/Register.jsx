import React from "react";
import * as userService from "../services/userService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      tenantId: "1626",
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
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onClick = () => {
    console.log("Button is firing");

    //axios
    const user = this.state.formData;
    userService
      .register(user)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log(response.data);
    toast.success("Registered Successfully!");
  };

  onActionError = (errResponse) => {
    console.log(errResponse);
    toast.error("Register Failed!");
  };

  render() {
    return (
      <div className="form-group">
        <div className="container">
          <label htmlFor="inputFirstName">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            onChange={this.onFormFieldChanged}
            value={this.state.formData.firstName}
          ></input>
          <div className="form-group">
            <label htmlFor="exampleInputLastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.lastName}
            ></input>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onFormFieldChanged}
                value={this.state.formData.email}
              ></input>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.password}
                ></input>
                <div className="form-group">
                  <label htmlFor="exampleInputConfirmation">
                    Password Confirmation
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="passwordConfirm"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.passwordConfirm}
                  ></input>
                  <div className="form-group">
                    <label htmlFor="exampleInputLastName">Avatar Url</label>
                    <input
                      type="text"
                      className="form-control"
                      name="avatarUrl"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.avatarUrl}
                    ></input>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.onClick}
                    >
                      Submit Form
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
