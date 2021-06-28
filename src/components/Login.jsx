import React from "react";
import * as FaIcon from "react-icons/fa";
import userService from "../services/usersServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends React.Component {
  state = {
    userData: { email: "", password: "" },
  };

  onNewRegister = () => {
    this.props.history.push("/register");
  };

  onLoginfield = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let userData = { ...prevState.userData };
      userData[inputName] = newValue;
      return { userData };
    });
  };

  onLoginClick = () => {
    let payload = { ...this.state.userData };
    userService
      .logIn(payload)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
  };

  onLoginSuccess = (response) => {
    console.log(response);
    userService
      .currentUser()
      .then(this.onCurrentSuccess)
      .catch(this.onCurrentError);
  };
  onLoginError = (err) => {
    let errorData = err.response.data.errors;
    errorData.forEach((ele) => toast.error(ele));
  };

  onCurrentSuccess = (response) => {
    toast.success(`Welcome Back, ${response.data.item.name}!`);
    let currUsersId = response.data.item.id;
    this.userData(currUsersId);
  };
  onCurrentError = (err) => {
    toast.error("Not the CurrentUser");
  };

  userData = (payload) => {
    userService
      .usersData(payload)
      .then(this.onUsersDataSuccess)
      .catch(this.onUsersDataError);
  };

  onUsersDataSuccess = (response) => {
    const { firstName, lastName, avatarUrl } = response.data.item;
    const UsersInfo = { firstName, lastName, avatarUrl };
    var logIn = { type: "LOGIN", payload: { ...UsersInfo } };
    this.props.history.push("/", logIn);
  };

  onUsersDataError = (response) => {
    console.warn({ error: response });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 login">
            <div className="card flex">
              <div className="card-title" id="welcome">
                <h5>Weclome!</h5>
              </div>
              <div className="card-title" id="message">
                <h6>SIGN IN TO CONTINUE.</h6>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control-md"
                      placeholder="Email"
                      onChange={this.onLoginfield}
                    />
                    <FaIcon.FaEnvelope />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control-md"
                      name="password"
                      placeholder="Password"
                      onChange={this.onLoginfield}
                    />
                    <FaIcon.FaLock />
                  </div>
                  <div className="form-group">
                    <input
                      type="button"
                      className="btn log-btns btn-primary"
                      value="Login"
                      onClick={this.onLoginClick}
                    />
                  </div>
                  <div className="form-group">
                    <h4>Need To Sign Up?</h4>
                    <input
                      type="button"
                      className="btn log-btns btn-primary"
                      value="Register Now!"
                      onClick={this.onNewRegister}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
