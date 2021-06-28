import React, { Component } from "react";
import * as userService from "./userService";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";

class Registration extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatar: "",
    tenantId: "whales",
  };

  handleClick = () => {
    userService
      .logIn(this.state)
      .then(this.onGetSuccess)

      .catch(this.onGetError);
  };

  onGetSuccess = (response) => {
    toast.success("You successfully registered!");

    console.log(response);
  };

  onGetError = (response) => {
    toast.error("Please fill in the indicated fields.");
    console.log(response);
  };

  onChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(() => {
      let newState = {};

      newState[name] = value;
      console.log({ newState });
      return newState;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Form>
          <FormGroup>
            <Label for="exampleFirstName">First Name</Label>
            <Input
              type="first"
              name="firstName"
              placeholder="with a placeholder"
              value={this.state.firstName}
              onChange={this.onChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleLastName">Last Name</Label>
            <Input
              type="last"
              name="lastName"
              placeholder="with a placeholder"
              value={this.state.lastName}
              onChange={this.onChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="emailExample"
              name="email"
              placeholder="with a placeholder"
              value={this.state.email}
              onChange={this.onChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="passwordExample"
              name="password"
              placeholder="password placeholder"
              value={this.state.password}
              onChange={this.onChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleConfirmPassword">Confirm Password</Label>
            <Input
              type="confirmPasswordExample"
              name="confirmPassword"
              placeholder="password placeholder"
              value={this.state.confirmPassword}
              onChange={this.onChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleAvatar">Avatar</Label>
            <Input
              type="avatarExample"
              name="avatar"
              value={this.state.avatar}
              onChange={this.onChange}
            />
          </FormGroup>

          <Button onClick={this.handleClick}>Submit</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Registration;

// onGetSuccess = data => {}
// onGetError => {}
//axios call this.state
