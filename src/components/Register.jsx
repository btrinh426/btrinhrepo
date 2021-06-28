import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as userService from "../Service/userService";
import {toast, ToastContainer} from "react-toastify"



export class Register extends Component {
  state = {
    formInfo: {
      firstName: "tom", //tom
      lastName: "", //ford
      email: "", // "sabio@sabio10.la"
      password: "", //"Sabiopassword1!"
      passwordConfirm: "", //"Sabiopassword1!"
      avatarUrl: "",
      tenantId: "bootcamp19", //bootcamp10
    },
  };

  //  need AJax call

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    //console.log({ newValue, currentTarget });

    this.setState((prevState) => {
      let formInfo = { ...prevState.formInfo };

      formInfo[inputName] = newValue;
      return { formInfo };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    userService
      .register(this.state.formInfo)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);

    // make axios call. Bring in the file and call the method
  };

  onRegisterSuccess = (response) => {
      console.log(response)
    toast.success("You're registerd!",response);

    // do something
  };

  onRegisterError = (response) => {
      console.log(response)
    toast.error("Please complete all fields",response);

    // do something
  };

  
//   registerClicked = () => {
//     console.log("I was clicked!!!");
//   };

  render() {
    return (
     
        <Form>
        
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              onChange={this.onFormFieldChanged}
              value={this.state.formInfo.firstName}
            />
          </Form.Group>

          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              onChange={this.onFormFieldChanged}
              value={this.state.formInfo.lastName}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name="email"
              onChange={this.onFormFieldChanged}
              value={this.state.formInfo.email}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type= "password"
              onChange={this.onFormFieldChanged}
              value={this.state.formInfo.password}
            />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="passwordConfirm"
              type="password"
              onChange={this.onFormFieldChanged}
              value={this.state.formInfo.confirmPassword}
            />
          </Form.Group>

          <Form.Group controlId="formBasicAvatarUrl">
            <Form.Label>AvatarUrl</Form.Label>
            <Form.Control
              name="avatarUrl"
              onChange={this.onFormFieldChanged}
              value={this.state.formInfo.avatarUrl}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={this.registerClicked}
          >
            Register
          </Button>
          <ToastContainer/>
        </Form>
   
    );
  }
}

export default Register;
