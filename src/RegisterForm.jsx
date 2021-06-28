import React from "react";
import * as friendService from "./friendService";
import { toast, ToastContainer } from "react-toastify";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(
      this
    );
    this.handleAvatarUrlChange = this.handleAvatarUrlChange.bind(this);
    this.handleTenantIdChange = this.handleTenantIdChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handlePasswordConfirmChange(event) {
    this.setState({ passwordConfirm: event.target.value });
  }

  handleAvatarUrlChange(event) {
    this.setState({ avatarUrl: event.target.value });
  }

  handleTenantIdChange(event) {
    this.setState({ tenantId: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    friendService
      .registerUser(user)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  }

  onRegisterSuccess = () => {
    console.log("success");
    toast.success("Registration Successful! Welcome " + this.state.firstName);
  };
  onRegisterError = () => {
    console.log("error");
    toast.error("New User Registration Failed, Please Try Again!");
  };

  render() {
    return (
      <form style={{ margin: "100px " }}>
        <ToastContainer />

        <div className="form-group">
          <label htmlFor="inputFirstName">First Name</label>
          <input
            type="text"
            className="form-control"
            onChange={this.handleFirstNameChange}
            placeholder="John"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputLastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            onChange={this.handleLastNameChange}
            placeholder="Doe"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={this.handleEmailChange}
            placeholder="example@email.com"
            aria-describedby="emailHelp"
          ></input>
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={this.handlePasswordChange}
            placeholder="*****"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            onChange={this.handlePasswordConfirmChange}
            placeholder="*****"
          ></input>
          <small id="avatarHelp" className="form-text text-muted">
            Please re-enter password created, they must match!
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="inputAvatar">Avatar</label>
          <input
            type="text"
            className="form-control"
            onChange={this.handleAvatarUrlChange}
            placeholder="https://placeYourLinkHere.png"
          ></input>
          <small id="avatarHelp" className="form-text text-muted">
            Use a URL link to add a personal photo.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="inputTenantId">Create Id</label>
          <input
            type="text"
            className="form-control"
            onChange={this.handleTenantIdChange}
            placeholder="ex: 1a2s3f3r5e7"
          ></input>
          <small id="avatarHelp" className="form-text text-muted">
            Create a unique ID to easily locate your Profile. (Please use a mix
            of letters and numbers for a total of 11 characters)
          </small>
        </div>
        <button
          type="button"
          style={{ marginTop: "30px " }}
          className="btn btn-primary"
          onClick={this.handleSubmit}
        >
          Register
        </button>
      </form>
    );
  }
}

export default RegisterForm;
