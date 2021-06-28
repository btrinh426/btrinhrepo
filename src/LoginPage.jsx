import React from "react";
import userService from "./services/userService";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

class LoginPage extends React.Component {
  state = { email: "", password: "", tenantId: "" };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      return newState;
    });
    // console.log(e.target);
    // const name = e.target.name;
    // const value = e.target.value;
    // this.setState({ [name]: value });
  };

  onClickHandler = (e) => {
    e.preventDefault();

    // const firstName = this.state.firstName;
    // const lastName = this.state.lastName;
    const data = {
      email: this.state.email,
      password: this.state.password,
      tenantId: this.state.tenantId,
    };
    console.log(data);

    //     //... code omitted.
    userService
      .logIn(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };
  onActionSuccess = (response) => {
    console.log(response);
    // this.setState(() => {
    //   let newState = {
    //     email: "",
    //     password: "",
    //     tenantId: "",
    //   };

    //   return newState;
    // });
    toast.success("Login Successful");
    this.props.history.push("/home");
  };
  onActionError = (errResponse) => {
    console.log(errResponse);
    toast.error(
      "Login fail, Please check you input or click register to create new user"
    );
  };
  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">User Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={this.onFormFieldChanged}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              onChange={this.onFormFieldChanged}
              value={this.state.password}
              name="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Tenent Id</label>
            <input
              className="form-control"
              id="tenantId"
              placeholder="Enter Tenent Id"
              onChange={this.onFormFieldChanged}
              name="tenantId"
              value={this.state.tenantId}
            />
          </div>

          <button
            type="submit"
            onClick={this.onClickHandler}
            className="btn btn-primary"
          >
            Submit
          </button>
          <div>
            <NavLink
              to="/form"
              exact
              className="btn btn-primary"
              style={{ marginTop: "20px" }}
            >
              Register
            </NavLink>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginPage;
