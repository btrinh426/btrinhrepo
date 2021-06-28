import React, { Component } from "react";
import * as userService from "../services/userService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

class Login extends Component {
  state = {
    loginFormData: { email: "", password: "", tenantId: "U0190CX3XPW" }, //***this initial value prevents that warning about switching between controlled and uncotrolled input
    isLoggedIn: false,
  };
  onFromFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newLoginFormData = { ...this.state.loginFormData };
      newLoginFormData[inputName] = newValue;
      // here we use []notation to be able to use variable name ("inputName") to access the related propert of state object.
      console.log({ newLoginFormData });

      return { loginFormData: newLoginFormData };
      //*** hear, REACT checks and if any of the  newState's(/newLoginFormData's) property-names were the same as previous state's prop-names, it replaces them!
    });
  };
  loginRequested = () => {
    let data = this.state.loginFormData;
    console.log("login requested for: ", data);

    userService
      .logIn(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    Swal.fire("you are logged in!");
    this.props.history.push("/login"); //****** I added this just to get a "refresh" out of it, but didn't work!!!!
    this.setState({ isLoggedIn: true }); //****** neither did this!!!!
    // this.componentDidUpdate(); //****** neither did this AND makes it jump to onError()!!!!
    this.refreshPage(); //********* This Worked!
  };

  onActionError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong!");
  };

  refreshPage = () => {
    window.location.reload(false);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="form-row text-center">
            <div className="col-sm-10">
              <h5>Log in</h5>
            </div>
          </div>
          <form>
            <div className="form-row">
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="userEmailAddress"
                  name="email"
                  placeholder="Email"
                  value={this.state.loginFormData.email}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="userPassword"
                  name="password"
                  placeholder="Password"
                  value={this.state.loginFormData.password}
                  onChange={this.onFromFieldChanged}
                />
              </div>
            </div>
          </form>
          <hr />
          <div className="col-md-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.loginRequested}
            >
              Login
            </button>
            {/**** when my btn was part of my form element, it worked, but instantly went back to App and didn't show the msg!!!  */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Login;
