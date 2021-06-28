import React from "react";
import registerUser from "../services/registerService";

class Register extends React.Component {
  state = {
    registerData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passConfirm: "",
      avatar: "",
    },
  };

  onInputChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let registerData = { ...this.state.registerData };
      registerData[inputName] = newValue;
      return { registerData };
    });
  };

  onRegisterClicked = (e) => {
    e.preventDefault();
    console.log(this.state.registerData);
    registerUser(this.state.registerData);
  };
  render() {
    return (
      <React.Fragment>
        <div className=" register main">
          <h3>Register</h3>
          <form id="registerForm">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={this.state.registerData.firstName}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={this.state.registerData.lastName}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={this.state.registerData.email}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.registerData.password}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="passConfirm"
                value={this.state.registerData.passConfirm}
                onChange={this.onInputChanged}
              />
            </div>
            <div className="form-group">
              <label>Avatar URL</label>
              <input
                type="text"
                className="form-control"
                name="avatar"
                value={this.state.registerData.avatar}
                onChange={this.onInputChanged}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onRegisterClicked}
            >
              Register
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
