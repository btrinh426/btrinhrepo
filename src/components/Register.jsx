import React from "react";

import * as userService from "../services/userService";

import "./Register.css";

class Register extends React.Component {
  state = {
    registerFormData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "456",
    },
    isModalOpen: false,
    hasMadeAjax: true,
    arrayOfComp: [],
  };

  // handleChange = (event) => {
  //   // this.setState(prevState => (firstName: firstName));
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    // axios call with this.state
    userService
      .register(this.state.registerFormData)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  onRegisterSuccess = (response) => {
    console.log({ user: response.data });
    this.setState({
      registerFormData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        avatarUrl: "",
      },
    });
  };

  onRegisterError = (errResponse) => {
    console.warn({ error: errResponse.config });
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputValue = currentTarget.name;

    this.setState(() => {
      let registerFormData = { ...this.state.registerFormData };

      registerFormData[inputValue] = newValue;

      return { registerFormData };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-offset-2">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstNameField"
                    placeholder="Enter first name"
                    name="firstName"
                    onChange={this.onFormFieldChanged}
                    value={this.state.registerFormData.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastNameField"
                    placeholder="Enter last name"
                    name="lastName"
                    onChange={this.onFormFieldChanged}
                    value={this.state.registerFormData.lastName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userEmail">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailField"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    name="email"
                    onChange={this.onFormFieldChanged}
                    value={this.state.registerFormData.email}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="userPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordField"
                    placeholder="Password"
                    name="password"
                    onChange={this.onFormFieldChanged}
                    value={this.state.registerFormData.password}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userConfirmPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPasswordField"
                    placeholder="Confirm password"
                    name="passwordConfirm"
                    onChange={this.onFormFieldChanged}
                    value={this.state.registerFormData.passwordConfirm}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="avatarUrl">Avatar URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="avatarUrlField"
                    placeholder="Enter an avatar URL"
                    name="avatarUrl"
                    onChange={this.onFormFieldChanged}
                    value={this.state.registerFormData.avatarUrl}
                  />
                </div>
                {/* <button
                  type="submit"
                  className="btn btn-primary"
                  id="submitUserRegistration"
                >
                  Submit
                </button> */}
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Submit"
                />
              </form>
              {/* <p className="text-center small">

                Already have an account? <a href="Login.html">Log in here</a>.
              </p> */}
              {/* <a href="Navigation.html">Go to navigation page</a>. */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
