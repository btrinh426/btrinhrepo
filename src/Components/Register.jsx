import React from "react";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import userService from "../services/userService";

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: this.props.tenantId,
  };

  onFormChange = (e) => {
    let currentBoxName = e.currentTarget.name;
    let updatedInput = e.currentTarget.value;

    this.setState(() => {
      let newState = { ...this.state };
      newState[currentBoxName] = updatedInput;
      return newState;
    });
  };

  registerNewUser = () => {
    let payload = this.state;
    userService
      .registerUser(payload)
      .then(this.onRegisterUserSuccess)
      .catch(this.onRegisterUserFail);
  };

  onRegisterUserSuccess = (response) => {
    console.log(response);
    Swal.fire({
      icon: "success",
      title: `Welcome ${this.state.firstName}`,
      text: "Your account has been created.",
    }).then(() => {
      this.props.history.push("/login");
    });
  };

  onRegisterUserFail = (error) => {
    console.log(error.response);
    Swal.fire({
      icon: "error",
      title: "There was an error",
      text: error.response.data.errors,
    });
  };

  render() {
    return (
      <div className="col-12 mt-5">
        <div className="col-xl-5 col-lg-7 col-md-7 col-sm-10 col-10 bg-white border m-auto p-0">
          <div className="bg-white m-auto pb-1 pt-1 pl-3 border-bottom">
            <h3>{this.props.siteName}</h3>
            <h6 className="text-muted">New user registration</h6>
          </div>

          <form className="p-3">
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                First Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="regFirstName"
                  placeholder=""
                  name="firstName"
                  onChange={this.onFormChange}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Last Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="regLastName"
                  placeholder=""
                  name="lastName"
                  onChange={this.onFormChange}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="regEmail"
                  placeholder=""
                  name="email"
                  onChange={this.onFormChange}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="regPw"
                  placeholder=""
                  name="password"
                  onChange={this.onFormChange}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Confirm Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="regConfirmPw"
                  placeholder=""
                  name="passwordConfirm"
                  onChange={this.onFormChange}
                ></input>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Avatar Image URL
              </label>
              <div className="col-sm-10">
                <input
                  type="url"
                  className="form-control form-control-sm"
                  id="regAvatarUrl"
                  placeholder=""
                  name="avatarUrl"
                  onChange={this.onFormChange}
                ></input>
              </div>
            </div>
            <div className="col">
              <div className="row justify-content-between d-flex">
                <div>
                  <h6>Already a user?</h6>
                  <NavLink to="/login">
                    <button className="btn btn-outline-primary">
                      Login here
                    </button>
                  </NavLink>
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={this.registerNewUser}
                    type="button"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
