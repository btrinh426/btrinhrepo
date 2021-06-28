import React from "react";
import * as usersService from "../services/userService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as fileService from "../services/fileService";

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "TrelloUser",
  };
  // ----- When a form field is changed this function should fire
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

  // ----- Change Selected File State -----
  handleUploadChange = (e) => {
    console.log(e.target.files[0]);
    let selectedFile = e.target.files[0];
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.selectedFile = selectedFile;
      return newState;
    });
  };

  // ----- Upload Avatar Url and Register -----
  onRegisterClicked = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state);
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    console.log(this.state.selectedFile);

    fileService
      .picture(data)
      .then(this.onPicUploadSuccess)
      .catch(this.onPicUploadError);
  };

  onPicUploadSuccess = (response) => {
    console.log({ upload: response });
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.avatarUrl = response.data.items[0];
      return newState;
    });
    const data = this.state;
    usersService
      .register(data)
      .then(this.onRegisterUserSuccess)
      .catch(this.onRegisterUserError);
  };
  onPicUploadError = (err) => {
    console.error(err);
  };

  onRegisterUserSuccess = (response) => {
    console.log({ login: response.data });
    Swal.fire("Good job!", "You clicked the button!", "success");
  };
  onRegisterUserError = (err) => {
    console.error(err);
    Swal.fire("Oops...", `${err}`, "error");
  };

  // ----- Render -----
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
                <span className="Picture Url Form">
                  {/* <div className="form-group">
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
                </div> */}
                </span>
                <div className="form-group">
                  <label htmlFor="formControlFile">Profile Picture</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="avatarUrl"
                    onChange={this.handleUploadChange}
                    // value={this.state.selectedFile}
                  />
                  {/* <button
                    className="btn btn-secondary btn-upload"
                    id="upload-button"
                    onClick={this.onUploadFileClicked}
                  >
                    Upload
                  </button> */}
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
