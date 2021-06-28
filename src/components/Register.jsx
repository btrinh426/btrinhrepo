import React from "react";
import { registerAccount } from "../services/usersService";
import { toast } from "react-toastify";
import debug from "sabio-debug";
const _logger = debug.extend("App");

class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "sabio123",
    },
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...this.state.formData };
    registerAccount(payload)
      .then(this.onRegisterAccountSuccess)
      .catch(this.onRegisterAccountError);
  };

  onRegisterAccountSuccess = (response) => {
    _logger("Register Success", response);
    toast["success"]("You registered your account!", "Congratulations");
  };
  onRegisterAccountError = (response) => {
    _logger("Register Error", response);
    toast["error"]("Oops, something didn't process correctly...", "Oops");
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <div className="row">
          <div className="col-md-4 p-5">
            <form>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter Name"
                  onChange={this.onFormFieldChange}
                  value={this.state.formData.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Last Name"
                  onChange={this.onFormFieldChange}
                  value={this.state.formData.lastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={this.onFormFieldChange}
                  value={this.state.formData.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  onChange={this.onFormFieldChange}
                  value={this.state.formData.password}
                />
              </div>
              <div className="form-group">
                <label htmlFor="passwordConfirm">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  onChange={this.onFormFieldChange}
                  value={this.state.formData.passwordConfirm}
                />
              </div>
              <div className="form-group">
                <label htmlFor="avatarUrl">Profile Picture:</label>
                <input
                  type="url"
                  className="form-control"
                  id="avatarUrl"
                  name="avatarUrl"
                  placeholder="Enter picture url"
                  onChange={this.onFormFieldChange}
                  value={this.state.formData.avatarUrl}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
