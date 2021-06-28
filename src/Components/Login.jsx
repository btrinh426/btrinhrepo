import React from "react";
import { logIn } from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.goToRegister = this.goToRegister.bind(this);
  }

  state = {
    email: "",
    password: "",
  };

  onButtonClick = (e) => {
    console.log("Login button clicked.");

    logIn(this.state).then(this.onSuccess).catch(this.onError);
  };

  onSuccess = (response) => {
    toast("Login Success.", {
      className: "Success-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  onError = (response) => {
    toast("Login failed.", {
      className: "error-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  onTextInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};

      newState[inputName] = newValue;

      return newState;
    });
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-group">
            <label htmlFor="userEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="userEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={this.onTextInputChange}
              value={this.state.email}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="userPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="userPassword"
              placeholder="Password"
              name="password"
              onChange={this.onTextInputChange}
              value={this.state.password}
            ></input>
          </div>

          <button
            type="login"
            className="btn btn-primary"
            onClick={this.onButtonClick}
          >
            Login
          </button>

          <Link to={"/register"} class="Button ">
            Not registered? Register now here.
          </Link>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
