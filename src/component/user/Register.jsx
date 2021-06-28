import React from "react";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import { Container } from "reactstrap";
import * as userService from "../../services/userService";
import * as fileService from "../../services/fileService";
import Swal from "sweetalert2";
// import { Route, Redirect } from "react-router";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "U01KJ6JRW5T",
    };
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      console.log("newState", newState);

      return newState;
    });
  };
  onSubmitButtonClicked = (e) => {
    e.preventDefault();

    console.log(this.state);
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    console.log(this.state.selectedFile);
    console.log(data);

    fileService
      .picture(data)
      .then(this.onFileUpload)
      .catch(this.onFileUploaErr);
  };

  fileUploadChange = (e) => {
    console.log(e.target.files[0]);
    let selectedFile = e.target.files[0];
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.selectedFile = selectedFile;
      return newState;
    });
  };

  onFileUpload = (response) => {
    console.log(response.data.items[0]);
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.avatarUrl = response.data.items[0];
      return newState;
    });
    const data = this.state;
    userService
      .register(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };
  onFileUploaErr = (err) => {
    console.error(err);
  };

  onActionSuccess = (response) => {
    Swal.fire("Success!", "You have registered successfully!", "success").then(
      this.props.history.push("/")
    );

    console.log(response);
  };
  onActionError = (errResponse) => {
    Swal.fire("Registration Faliled", `Something went wrong! ${errResponse}`);

    console.error(errResponse);
  };

  render() {
    return (
      <Container className="themed-container" fluid="sm">
        <h1>Sign Up Here!</h1>
        <Form>
          <FormGroup row>
            <Label for="fName" sm={2}>
              First Name
            </Label>
            <Col sm={5}>
              <Input
                onChange={this.onFormFieldChanged}
                value={this.state.firstName}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="lName" sm={2}>
              Last Name
            </Label>
            <Col sm={5}>
              <Input
                onChange={this.onFormFieldChanged}
                value={this.state.lastName}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Email
            </Label>
            <Col sm={5}>
              <Input
                onChange={this.onFormFieldChanged}
                value={this.state.email}
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="E-mail"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Password" sm={2}>
              Password
            </Label>
            <Col sm={5}>
              <Input
                onChange={this.onFormFieldChanged}
                value={this.state.password}
                type="password"
                name="password"
                id="Password"
                placeholder="password"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="ConfirmPassword" sm={2}>
              Confirm Password
            </Label>
            <Col sm={5}>
              <Input
                onChange={this.onFormFieldChanged}
                value={this.state.passwordConfirm}
                type="password"
                name="passwordConfirm"
                id="ConfirmPassword"
                placeholder="Confirm Password"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="pictureUpload" sm={2}>
              Avatar
            </Label>
            <Col sm={5}>
              <Input
                onChange={this.fileUploadChange}
                type="file"
                name="avatarUrl"
                id="avatarUrl"
                placeholder="avatar Url"
              />
            </Col>
          </FormGroup>
          {/* <FormGroup row>
            <Label for="avatarUrl" sm={2}>
              Avatar
            </Label>
            <Col sm={5}>
              <Input
                onChange={this.onFormFieldChanged}
                value={this.state.avatarUrl}
                type="url"
                name="avatarUrl"
                id="avatarUrl"
                placeholder="avatar Url"
              />
            </Col>
          </FormGroup> */}
          <button
            type="submit"
            onClick={this.onSubmitButtonClicked}
            className="btn btn-primary m-3"
          >
            Submit Form
          </button>
        </Form>
      </Container>
    );
  }
}

export default Register;
