import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Button, Form, Label, Input, FormText } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as userService from "../services/userService";

class Register extends Component {
  state = {
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userAvatarUrl: "",
    userPassword: "",
    userPasswordConfirm: "",
  };

  componentDidMount = () => {
    // console.log("Register component mounted.");
  };

  onRegisterFormChange = (e) => {
    let currentTargetName = e.currentTarget.name;
    let currentTargetValue = e.currentTarget.value;
    // console.log(newValue);
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState[currentTargetName] = currentTargetValue;
      // console.log(newState);
      return newState;
    });
  };

  clickSubmitButton = (e) => {
    e.preventDefault();
    // console.log("Submit Form button clicked.");

    const userData = this.getUserData();
    userData.tenantId = "U01BMEA3V8V";
    userService.userRegister(userData).then(this.onUserRegisterSuccess).catch(this.onUserRegisterError);
  };

  onUserRegisterSuccess = (response) => {
    // console.log(`User successfully registered. ID# ${response.data.item}`);
    toast.success("User Successfully Registered!", {
      autoClose: 3000,
      onClose: () => {
        this.props.history.push("/login");
        // window.location.assign("/login");
      },
    });
  };

  onUserRegisterError = (error) => {
    debugger;
    // console.error("Error registering new user.");
    const errorText = error.response.data.errors;
    const ErrorDiv = () => (
      <div>
        <p>Registration failed:</p>
        {errorText.map((errMsg) => {
          return <div>{errMsg}</div>;
        })}
      </div>
    );
    toast.error(<ErrorDiv />, { autoClose: 10000 });
  };

  getUserData = () => {
    const defaultAvatarUrl =
      "https://www.pngitem.com/pimgs/m/164-1648722_female-filled-icon-kostenloser-human-silhouette-head-and.png";
    const user = {
      firstName: this.state.userFirstName,
      lastName: this.state.userLastName,
      email: this.state.userEmail,
      avatarurl: this.state.userAvatarUrl || defaultAvatarUrl,
      password: this.state.userPassword,
      passwordConfirm: this.state.userPasswordConfirm,
    };
    return user;
  };

  render() {
    return (
      <div className="col pl-3">
        <div className="row m-0 pt-1">
          <h3>Register User</h3>
        </div>
        <div
          className="container col-3 border border-secondary rounded mb-0 mr-3 ml-0 pl-0 pt-0 pr-0 pb-3"
          id="userRegister"
          style={{ backgroundColor: "rgb(210, 217, 235)", minWidth: "406px" }}
        >
          <Form className="userRegisterForm pl-3 pr-3" style={{ marginTop: "1rem" }}>
            <div className="form-group row mr-1">
              <div className="col">
                <div className="row align-items-center">
                  <Label for="fNameInput" className="form-label my-label col-3" style={{ minWidth: "68px" }}>
                    First Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control my-input-control col"
                    id="fNameInput"
                    name="userFirstName"
                    aria-describedby="fNameHelp"
                    placeholder=""
                    onChange={this.onRegisterFormChange}
                  />
                </div>
                <div className="row">
                  <div className="col-3"></div>
                  <FormText id="fNameHelpBlock" className="d-none col myHelpNote">
                    Please enter a first name.
                  </FormText>
                </div>
              </div>
            </div>
            <div className="form-group row mr-1">
              <div className="col">
                <div className="row align-items-center">
                  <Label for="lNameInput" className="form-label my-label col-3">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control my-input-control col"
                    id="lNameInput"
                    name="userLastName"
                    aria-describedby="lNameHelp"
                    placeholder=""
                    onChange={this.onRegisterFormChange}
                  />
                </div>
                <div className="row">
                  <div className="col-3"></div>
                  <FormText id="lNameHelpBlock" className="d-none col myHelpNote">
                    Please enter a last name.
                  </FormText>
                </div>
              </div>
            </div>

            <div className="form-group row mr-1">
              <div className="col">
                <div className="row align-items-center">
                  <Label for="emailInput" className="form-label my-label col-3">
                    Email
                  </Label>
                  <Input
                    type="email"
                    className="form-control my-input-control col"
                    id="emailInput"
                    name="userEmail"
                    aria-describedby="emailHelp"
                    placeholder=""
                    onChange={this.onRegisterFormChange}
                  />
                </div>
                <div className="row">
                  <div className="col-3"></div>
                  <FormText id="emailHelpBlock" className="d-none col myHelpNote">
                    Please enter an e-mail address.
                  </FormText>
                </div>
              </div>
            </div>

            <div className="form-group row mr-1">
              <div className="col">
                <div className="row align-items-center">
                  <Label for="avatarUrlInput" className="form-label my-label col-3">
                    Avatar URL
                  </Label>
                  <Input
                    type="url"
                    className="form-control my-input-control col"
                    id="avatarUrlInput"
                    name="userAvatarUrl"
                    aria-describedby="avatarUrlHelp"
                    placeholder=""
                    onChange={this.onRegisterFormChange}
                  />
                </div>
                <div className="row">
                  <div className="col-3"></div>
                  <FormText id="avatarurlHelpBlock" className="d-none col myHelpNote">
                    Please enter a valid URL for your avatar (or leave the field blank to use the default).
                  </FormText>
                </div>
              </div>
            </div>

            <div className="form-group row mr-1">
              <div className="col">
                <div className="row align-items-center">
                  <Label for="passwordInput" className="form-label my-label col-3 mb-0">
                    Password
                  </Label>
                  <Input
                    type="password"
                    className="form-control my-input-control col"
                    id="passwordInput"
                    name="userPassword"
                    placeholder=""
                    onChange={this.onRegisterFormChange}
                  />
                </div>
                <div className="row">
                  <div className="col-3"></div>
                  <FormText id="passwordHelpBlock" className="col myHelpNote" style={{ color: "black !important" }}>
                    Your password must be 8-64 characters long, contain a lower and upper case letter, a number, and a
                    special character (#?!$%^&*-).
                  </FormText>
                </div>
              </div>
            </div>

            <div className="form-group row mr-1">
              <div className="col">
                <div className="row align-items-center">
                  <Label for="passwordConfirmInput" className="form-label my-label col-3 mb-0 align-middle">
                    Confirm Password
                  </Label>
                  <Input
                    type="password"
                    className="form-control my-input-control col mb-1"
                    style={{ minWidth: "200px" }}
                    id="passwordConfirmInput"
                    name="userPasswordConfirm"
                    placeholder=""
                    onChange={this.onRegisterFormChange}
                  />
                </div>
                <div className="row">
                  <div className="col-3"></div>
                  <FormText id="passwordConfirmHelpBlock" className="d-none col myHelpNote">
                    Your passwords must match.
                  </FormText>
                </div>
              </div>
            </div>

            <div className="row" style={{ justifyContent: "center" }}>
              <Button color="primary" type="submit" id="submitButton" onClick={this.clickSubmitButton}>
                Submit Form
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
export default withRouter(Register);
