import React from "react";
import * as usersService from "../services/userService";
import Swal from "sweetalert2/dist/sweetalert2.js";

class Register extends React.Component {
  state = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "email@gmail.com",
    password: "Password1!",
    passwordConfirm: "Password1!",
    avatarUrl:
      "https://i.pinimg.com/236x/52/90/26/529026138c2df5897e4f758082b5a3bd.jpg",
    tenantId: "TrelloUser",
  };
  // When a form field is changed this function should fire
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputData = currentTarget.id;

    this.setState(() => {
      let newState = { ...this.state };
      newState[inputData] = newValue;
      return newState;
    });
  };

  onRegisterClicked = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state);
    const data = this.state;

    usersService
      .register(data)
      .then(this.onRegisterUserSuccess)
      .catch(this.onRegisterUserError);
  };

  onRegisterUserSuccess = (response) => {
    console.log({ login: response.data });
    Swal.fire("Good job!", "You clicked the button!", "success");
  };
  onRegisterUserError = (err) => {
    console.error(err);
    Swal.fire("Oops...", "Something went wrong!", "error");
  };

  render() {
    return (
      <React.Fragment>
        <div className="register container">
          <div className="register-card">
            <div className="card-header text-center">Register User</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="inputFirstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    aria-describedby="nameHelp"
                    placeholder="First Name"
                    onChange={this.onFormFieldChanged}
                    value={this.state.firstName}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="inputLastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    aria-describedby="nameHelp"
                    placeholder="Last Name"
                    onChange={this.onFormFieldChanged}
                    value={this.state.lastName}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="inputEmail">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={this.onFormFieldChanged}
                    value={this.state.email}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={this.onFormFieldChanged}
                    value={this.state.password}
                  ></input>
                  <div id="message">
                    <h3>Password must contain the following:</h3>
                    <p id="length" className="invalid">
                      At least 8 characters with no space
                    </p>
                    <p id="letter" className="invalid">
                      At least 1 lowercase letter
                    </p>
                    <p id="capital" className="invalid">
                      At least 1 uppercase letter
                    </p>
                    <p id="number" className="invalid">
                      At least 1 number
                    </p>
                    <p id="specialCharacter" className="invalid">
                      At least 1 of the following special characters for ! # $ ^
                      * (other special characters are not supported
                    </p>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputPasswordConfirm">Password Confirm</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordConfirm"
                    placeholder="Password Confirm"
                    onChange={this.onFormFieldChanged}
                    value={this.state.passwordConfirm}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAvatarUrl">Profile Picture</label>
                  <input
                    type="url"
                    className="form-control"
                    id="avatarUrl"
                    aria-describedby="pictureHelp"
                    placeholder="Picture URL"
                    onChange={this.onFormFieldChanged}
                    value={this.state.avatarUrl}
                  ></input>
                </div>
                <div className="form-group">
                  <input
                    id="tenantId"
                    type="hidden"
                    value={this.state.tenantId}
                  ></input>
                </div>
              </form>
            </div>
            <button
              className="btn btn-secondary btn-lg btn-block"
              onClick={this.onRegisterClicked}
            >
              Register
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Register;
