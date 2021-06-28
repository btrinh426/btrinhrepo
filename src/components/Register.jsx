import React from "react";
import { NavLink } from "react-router-dom";
import * as usersService from "../services/usersService";
import { toast } from "react-toastify";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        avatarUrl: "",
        termsCheck: false,
      },
    };
  }

  onFormFieldChanged = (e) => {
    console.log(e.currentTarget.name);
    let currentTarget = e.currentTarget;
    let newValue =
      currentTarget.type === "checkbox"
        ? currentTarget.checked
        : currentTarget.value;
    let inputName = currentTarget.name;
    //console.log({newValue, currentTarget})

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      //   console.log("newState", formData, { formData });
      return { formData };
    });
  };

  onRegisterBtnClicked = (e) => {
    console.log(e.currentTarget);
    console.log("state", this.state);

    if (this.state.formData.termsCheck === true)
      usersService
        .register(this.state.formData)
        .then(this.onUsersRegistrationSuccess)
        .catch(this.onUsersRegistrationError);
    else {
      toast.error(
        <div>
          Registration Failed
          <br />
          You must agree to the terms.
        </div>
      );
    }
  };

  onUsersRegistrationSuccess = (response) => {
    console.log(response);
    toast.success(
      <div>
        Registration Succeeded
        <br />
        Redirecting to Login.
      </div>
    );
    this.props.history.push("/login");
  };

  onUsersRegistrationError = (error) => {
    console.log("You already have an account");
    // toast.error("This account already \n exists", "Registration Failed");
    console.log(error.response.data.errors);

    if (
      error.response.data.errors[0].includes("Cannot insert duplicate key row")
    ) {
      toast.error(
        <div>
          Registration Failed
          <br />
          This account already exists.
          <br />
          Redirecting to Login.
        </div>
      );
      this.props.history.push("/login");
    } else {
      toast.error(
        <div>
          Registration Failed
          <br />
          All fields are required.
        </div>
      );
    }
  };

  render() {
    return (
      <div className="card-container">
        <div className="card">
          <div className="card-body">
            <div className="card-title">Register a new membership</div>
            <form name="registrationForm">
              <div className="form-floating mb-3">
                <input
                  onChange={this.onFormFieldChanged}
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="First Name"
                  value={this.state.formData.firstName}
                />
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Last Name"
                  value={this.state.formData.lastName}
                  onChange={this.onFormFieldChanged}
                />
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={this.state.formData.email}
                  onChange={this.onFormFieldChanged}
                />
              </div>

              <div className="form-floating  mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.formData.password}
                  onChange={this.onFormFieldChanged}
                />
              </div>

              <div className="form-floating  mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="passwordConfirm"
                  placeholder="Retype password"
                  value={this.state.formData.passwordConfirm}
                  onChange={this.onFormFieldChanged}
                />
              </div>

              <div className="form-floating  mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="avatarUrl"
                  placeholder="Avatar Url"
                  value={this.state.formData.avatarUrl}
                  onChange={this.onFormFieldChanged}
                />
              </div>

              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="termsCheck"
                  value={this.state.formData.termsCheck}
                  onChange={this.onFormFieldChanged}
                  checked={this.state.formData.termsCheck}
                />
                <label className="form-check-label" forhtml="agreeTerms">
                  I agree to the terms
                </label>
              </div>

              <div className="form-floating  mb-3">
                <NavLink to="/login" exact>
                  <label>Already have an account?</label>
                </NavLink>
              </div>
              <div className="form-floating  mb-3">
                <div
                  type="button"
                  className="btn btn-primary"
                  name="registerBtn"
                  onClick={this.onRegisterBtnClicked}
                >
                  Register
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="form-check">
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
