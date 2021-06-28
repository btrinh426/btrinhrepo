import React, { Component } from "react";
import * as userService from "./userService";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";

class NewLogIn extends Component {
  state = {
    email: "",
    password: "",
    tenantId: "whales",
  };

  handleClick = () => {
    userService
      .logIn(this.state)
      .then(this.onGetSuccess)

      .catch(this.onGetError);
  };

  onGetSuccess = (response) => {
    toast.success("Login successfull!");
    console.log(response);
  };

  onGetError = (response) => {
    toast.error("Failed login attempt");
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
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="with a placeholder"
            value={this.state.email}
            onChange={this.onChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="password placeholder"
            value={this.state.password}
            onChange={this.onChange}
          />
        </FormGroup>

        <Button onClick={this.handleClick}>Submit</Button>
      </Form>
    );
  }
}

export default NewLogIn;
