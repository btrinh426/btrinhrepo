import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageService from "../../services/ImageService.jsx";

class UsersLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

    this.props.history.push("/", { data, status: "login" });
  };
  onRegistrationClicked = (e) => {
    e.preventDefault();

    this.props.history.push("/register", { status: "register" });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div>
            <img
              src={ImageService.fryLogin}
              // style={{ height: "150px" }}
              alt=""
            />
          </div>
          <div className="col-6 pt-5">
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
              <div className="p-2 d-inline">
                <button
                  type="button"
                  className="btn btn-primary p-2"
                  id="login"
                  name="login"
                  onClick={this.onLoginClicked}
                >
                  Submit
                </button>
              </div>
              <div className="p-2 d-inline">
                <button
                  type="button"
                  className="btn btn-link"
                  id="register"
                  onClick={this.onRegistrationClicked}
                >
                  Register Here
                </button>
              </div>
            </form>
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

export default UsersLogin;
