import React from "react";
import { register } from "../services/usersService";
import { toast } from "react-toastify";

class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      agree: false,
    },
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue =
      currentTarget.type === "checkbox"
        ? currentTarget.checked
        : currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onRegisterClick = () => {
    let payload = {
      firstName: this.state.formData.firstName,
      lastName: this.state.formData.lastName,
      email: this.state.formData.email,
      password: this.state.formData.password,
      passwordConfirm: this.state.formData.passwordConfirm,
      avatarUrl: this.state.formData.avatarUrl,
      tenantId: "U0222FEF7T2",
    };
    if (this.state.formData.agree) {
      register(payload)
        .then(this.onRegisterSuccess)
        .catch(this.onRegisterError);
    } else {
      toast.error("You must agree to the terms");
    }
  };
  onRegisterSuccess = (response) => {
    console.log("Register Successful");
    toast.success("Register Successful!");
    console.log(response);
  };
  onRegisterError = (response) => {
    console.log("Register Unsuccessful");
    toast.error("Register Unsuccessful");
    console.error(response);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-8">
              <form>
                <center>Register a new membership</center>
                <div className="mb-3 mt-3">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.firstName}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.lastName}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.email}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.password}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="passwordConfirm"
                    className="form-control"
                    placeholder="Retype password"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.passwordConfirm}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="avatarUrl"
                    className="form-control"
                    placeholder="Avatar Url"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.avatarUrl}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="agree"
                    checked={this.state.formData.agree}
                    onChange={this.onFormFieldChange}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    I agree to the terms
                  </label>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onRegisterClick}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
