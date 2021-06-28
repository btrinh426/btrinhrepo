import React from "react";
import * as userService from "../services/userService";

class Login extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
    },
    tenantId: "SabioNation",
    userName: "",
    userId: "",
  };
  componentDidMount() {
    if (this.props.userLogin) {
      userService
        .getCurrentUser()
        .then(this.onGetCurrentUserSuccess)
        .catch(this.onGetCurrentUserError);
    }
  }
  onGetCurrentUserSuccess = (res) => {
    this.setState((prevState) => {
      let newId = { ...prevState.userId };
      newId = res.data.item.id;
      return { userId: newId };
    });
    userService
      .getUserNameById(res.data.item.id)
      .then(this.onGetUserNameByIdSuccess)
      .catch(this.onGetUserNameByIdError);
  };
  onGetCurrentUserError = (res) => {
    console.error(res);
  };
  onGetUserNameByIdSuccess = (res) => {
    let user = res.data.item;
    let userName = user.firstName + " " + user.lastName;
    console.log(userName);
    this.setState((prevState) => {
      let newUser = { ...prevState.userName };
      newUser = userName;
      return { userName: newUser };
    });
  };
  onGetUserNameByIdError = (res) => {
    console.error(res);
  };
  onFormInput = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    console.log(newValue);
    let inputName = currentTarget.name;
    this.setState((prevState) => {
      let formData = { ...prevState.formData };
      formData[inputName] = newValue;

      return { formData };
    });
  };
  submitLoginData = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      email: this.state.formData.email,
      password: this.state.formData.password,
      tenantId: this.state.tenantId,
    };
    userService
      .userLogin(data)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
  };
  onLoginSuccess = (res) => {
    console.log(res, "Login Completed.");
    this.props.history.push("/", { type: "LOGIN", payload: null });
  };
  onLoginError = (res) => {
    console.error(res);
  };
  render() {
    return (
      <div className="jumbotron">
        <div className="row justify-content-md-center">
          <div className="col-md-3 col-md-offset-4 border mt-3">
            <div>
              <h2 className="text-center bg-dark text-white">Welcome</h2>
            </div>
            <h2 className="text-center mb-3">Sign in to continue.</h2>
            <div>
              <p>
                {this.props.userLogin ? this.state.userName : "Please Login!"}
              </p>
            </div>
            <div className="account-wall text-center">
              <img
                className="profile-img mb-4"
                src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                alt=""
              />
              <form className="form-signin">
                <input
                  id="inputEmail"
                  name="email"
                  type="email"
                  className="form-control mb-4 border"
                  placeholder="Email"
                  required
                  autoFocus
                  value={this.state.formData.email}
                  onChange={this.onFormInput}
                />
                <input
                  id="inputPassword"
                  name="password"
                  type="password"
                  minLength="8"
                  maxLength="64"
                  className="form-control mb-4 border"
                  placeholder="Password"
                  required
                  value={this.state.formData.passWord}
                  onChange={this.onFormInput}
                />
                <button
                  id="loginBtn"
                  className="btn btn-lg btn-primary btn-block mb-5"
                  type="submit"
                  onClick={this.submitLoginData}
                >
                  Log in
                </button>
                <div className="mb-3">need to sign up?</div>
                <button
                  id="registerBtn"
                  className="btn btn-lg btn-white btn-block border"
                  type=""
                >
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
