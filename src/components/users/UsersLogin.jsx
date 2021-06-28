import React from "react";
import * as usersService from "../../services/usersService.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UsersLogin extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    email: "",
    password: "",
    isLoggedIn: false
  };
}


  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};

      newState[inputName] = newValue;

      return newState;
    });
  };

  onLoginClicked = (e) => {
    e.preventDefault();
    let data = { ...this.state };

    usersService.login(data).then(this.onLoginSuccess).catch(this.onLoginError);
  };

  onLoginError = (response) => {
    console.log("onLoginError is firing", response);

    let errors = response.response.data.errors

    console.log("errors", errors)
    let notify = () => toast.error('Unable to perform login', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

    notify();
  };

  onLoginSuccess = (response) => {
    console.log("onLoginSuccess is firing", response);
    let notify = () => toast.success('Login successful!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

    notify();

    this.setState( {isLoggedIn: true})

    this.props.history.push("/home");
        
  };

  // componentDidUpdate(){

  //   console.log("Login Update is firing", this.state)

  // }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6 p-1">
            <h1 className="p-2">Login</h1>
            <form className="p-2">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  placeholder="email@example.com"
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={this.onFormFieldChanged}
                  placeholder=""
                  value={this.state.password}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                id="login"
                name="login"
                onClick={this.onLoginClicked}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

export default UsersLogin;
