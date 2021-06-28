import React from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "string",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name; //firstName or lastName

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    userService
      .register(this.state.formData)
      .then(this.onActionSuccess)
      .catch(this.onActionError);

    console.log(this.state.formData);
  };

  onActionSuccess = (response) => {
    toast.success("You have registered your account.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onActionError = (errResponse) => {
    toast.error("You have not registered your account.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <form>
                <div className="mb-3">
                  <label htmlFor="firstName1" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.firstName}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName1" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.lastName}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="registerInputEmail1" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.email}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="registerInputPassword1"
                    className="form-label"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.password}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputConfirmPassword2" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="passwordConfirm"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.passwordConfirm}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="avatarImage" className="form-label">
                    Avatar
                  </label>
                  <input
                    className="form-control"
                    name="avatarUrl"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.avatarUrl}
                  />
                </div>
                <div id="nameHelp" className="form-text">
                  We'll never share your information with anyone else.
                </div>
                <p></p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onClickHandler}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Register;
