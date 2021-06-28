import React from "react";
import * as userService from "../services/userService";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

class NewForm extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
      tenantId: "123456",
    },
  };
  onLoginClicked = (e) => {
    e.preventDefault();
    console.log("login clicked");
    userService
      .logIn(this.state.formData)
      .then(this.onActionSuccess)
      .catch(this.onFailure);
  };
  onActionSuccess = (response) => {
    toast.success("Login successful.");
    console.log(response.data);
    this.props.history.push("/homepage");
  };
  onFailure = () => {
    toast.warn("Login unsuccessful.");
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;

      return { formData };
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1>Login</h1>
          <form>
            <label>Email address</label>
            <input
              className="form-control"
              onChange={this.onFormFieldChanged}
              name="email"
              value={this.state.formData.email}
              type="email"
              placeholder="Enter email"
            />

            <label>Password</label>
            <input
              className="form-control"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.password}
              name="password"
              type="password"
              placeholder="Password"
            />
            <button
              onClick={this.onLoginClicked}
              type="submit"
              className="btn btn-primary"
            >
              Login
            </button>
          </form>
          No login?<NavLink to="/register">Register here.</NavLink>
          <p>
            <NavLink to="/addfriend">Widget (archived)</NavLink>
          </p>
        </div>
      </React.Fragment>
    );
  }
}
export default NewForm;
