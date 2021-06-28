import React from "react";
// import { Link } from "react-router-dom";
import { Button, Form, Label, Input, FormText } from "reactstrap";
import * as userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const clickLoginButton = () => {
    console.log("Make Ajax call...");
    const userData = {
      email: "mjmiklos@yahoo.com",
      password: "Usmc7523!!",
      tenantId: "U01BMEA3V8V",
    };
    userService.userLogin(userData).then(onLoginSuccess).catch(onLoginError);
  };

  const onLoginSuccess = (response) => {
    console.log("Successful login.");
    console.log(response);
    toast.success("Logged in!");
    console.log(this.props.location);
  };

  const onLoginError = (error) => {
    console.error("Login error.");
    console.error(error);
    toast.error("Could not log in user.");
  };

  return (
    <div className="col pl-3">
      <div className="row m-0 pt-1">
        <h3>Login User</h3>
      </div>
      <div
        className="container col-3 border border-secondary rounded mb-0 mr-3 ml-0 pl-0 pt-0 pr-0 pb-3"
        id="userRegister"
        style={{ backgroundColor: "rgb(210, 217, 235)", minWidth: "406px" }}
      >
        <div className="form-header">Welcome</div>

        <Form className="userLoginForm pl-3 pr-3" style={{ marginTop: "1rem" }}>
          <div className="form-group row mr-1">
            <div className="col pr-0">
              <Input
                type="email"
                className="form-control my-input-control col"
                id="emailInput"
                aria-describedby="emailHelp"
                placeholder="Enter e-mail"
              />
              <div className="col pl-0 pr-0">
                <small id="emailHelpBlock" className="d-none form-text text-muted col myHelpNote">
                  Please enter your e-mail address.
                </small>
              </div>
            </div>
          </div>
          <div className="form-group row mr-1">
            <div className="col pr-0">
              <Input
                type="password"
                className="form-control my-input-control col"
                id="passwordInput"
                placeholder="Password"
              />
              <FormText>
                <small id="passwordHelpBlock" className="d-none form-text text-muted col myHelpNote">
                  Please enter your password.
                </small>
              </FormText>
            </div>
          </div>
          <div className="form-group row ml-0 mr-1">
            <Button
              type="submit"
              color="primary"
              className="form-group"
              id="loginButton"
              style={{ width: "100%" }}
              onClick={(e) => {
                e.preventDefault();
                console.log("Login button clicked.");
                clickLoginButton();
              }}
            >
              Login
            </Button>
          </div>
          <div className="form-group border-top ml-0 mr-1 pt-3 my-border-top">
            <div className="col">
              <div className="row">
                <Label
                  for="registerNow"
                  className="form-label my-label pb-1"
                  style={{ color: "#212529", fontWeight: "400", textAlign: "center", width: "100%" }}
                >
                  Need to Signup?
                </Label>
              </div>
              <div className="row">
                <Button color="secondary" type="submit" id="registerButton" style={{ width: "100%" }} href="/register">
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
