import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as userService from "../Service/userService";



export class Login extends Component {
  state = {
    loginInfo: {
      email: "", // "sabio@sabio10.la"
      password: "", //"Sabiopassword1!"
      currentUser:{isLoggedIn:false}
    },
  };

  //  need AJax call

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    //console.log({ newValue, currentTarget });

    this.setState((prevState) => {
      let loginInfo = { ...prevState.loginInfo };

      loginInfo[inputName] = newValue;
      return { loginInfo };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    userService
      .login(this.state.loginInfo)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);

    // make axios call. Bring in the file and call the method
  };

  onLoginSuccess = (response) => {
    console.log(response);
    
  };

  onLoginError = (response) => {
    console.log(response);
  };

  loginClicked = () => {
    console.log("I was clicked!!!")
    this.state.history.push("/homepage");
  };

  onRegisterClicked = (e) => {

    console.log("test")
  };

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name="email"
            onChange={this.onFormFieldChanged}
            value={this.state.loginInfo.email}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={this.onFormFieldChanged}
            value={this.state.loginInfo.password}
          />
        </Form.Group>

        <Button 
        variant="primary" 
        type="submit"
        {...this.props} 
        onClick={this.loginClicked}>
        {this.state.currentUser}
          Login
        </Button>

        <Button variant="primary" type="submit" onClick={this.onRegisterClicked}>
          Register
        </Button>

        <div
          className="row pt-3">
          .....Are you logged in? {this.state.loginInfo.currentUser.isLoggedIn ? "Yes" : "No"}
        </div>
      </Form>
    );
  }
}

export default Login;
