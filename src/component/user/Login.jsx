import React from "react";
import { Form } from "reactstrap";
import { Container } from "reactstrap";
import * as userService from "../../services/userService";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      tenantId: "U01KJ6JRW5T",
    };
  }

  onFormChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      console.log("newState", newState.email, newState);

      return newState;
    });
  };

  onSigninButtonClicked = (e) => {
    e.preventDefault();

    userService
      .logIn(this.state)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };
  onActionSuccess = (response) => {
    Swal.fire("Success!", "You have loggined successfully!", "success").then(
      this.props.history.push("/")
    );

    console.log(response);
  };
  onActionError = (errResponse) => {
    Swal.fire("Login Faliled", "Something went wrong!", "error");

    console.error(errResponse);
  };

  render() {
    return (
      <React.Fragment>
        <Container className="themed-container" fluid="sm">
          <Form className="form-signin center">
            <h1>Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              onChange={this.onFormChanged}
              value={this.state.email}
              name="email"
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
            />
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              onChange={this.onFormChanged}
              value={this.state.password}
              name="password"
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
            />
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button
              className="btn btn-md btn-primary btn-block mb-2"
              type="submit"
              onClick={this.onSigninButtonClicked}
            >
              Sign in
            </button>
            <NavLink to="/Register">
              <button
                className="btn btn-md btn-secondary btn-block mb-1"
                type="submit"
              >
                Register Now
              </button>
            </NavLink>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

export default Login;
