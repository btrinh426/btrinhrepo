import React from "react";
import "../App.css";
import { withRouter, Route /*, NavLink*/ } from "react-router-dom";
import UserRegistration from "../pageParts/UserRegistration";
//import background from "/2.jpg";

import * as userService from "../services/userService";
import { ToastContainer, toast } from "react-toastify";

class Register extends React.Component {
  state = {
    formData: {
      firstName: "Tony",
      lastName: "Stark",
      email: "Tylerar@dukes.jmu.edu",
      password: "password",
      passwordConfirm: "password",
      avatarUrl: "url for avatar",
      tenantId: "U01LG539DPD",
    },
    isModalOpen: false,
    hasMadAjax: true,
    arrayOfComp: [],
  };

  onRegisterUser = (data) => {
    console.log("getting in here");
    console.log(data);
    userService
      .registerNewUser(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log("it worked!");
    toast("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  onActionError = (errResponse) => {
    toast("That didn't work", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container row">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* Same as */}
          <ToastContainer />
          <Route
            path="/register"
            render={(props) => (
              <UserRegistration
                {...props}
                onSubmit={this.onRegisterUser}
              ></UserRegistration>
            )}
          />

          {/* <div className=" bg-text container col-md-6">
            <form id="registrationForm">
              <h3>Registration Form</h3>
              <div className="form-group">
                <div className="form-wrapper">
                  <label htmlFor="">
                    First Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.firstName}
                  />
                </div>
                <div className="form-wrapper">
                  <label htmlFor="">
                    Last Name<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    name="lastName"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.lastName}
                  />
                </div>
              </div>
              <div className="form-wrapper">
                <label htmlFor="">
                  Email<span>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.email}
                />
              </div>

              <div className="form-wrapper">
                <label htmlFor="">
                  Password<span>*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  name="password"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.password}
                />
              </div>
              <div className="form-wrapper">
                <label htmlFor="">
                  Confirm Password<span>*</span>
                </label>
                <input
                  type="password"
                  id="passwordConfirm"
                  className="form-control"
                  name="passwordConfirm"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.passwordConfirm}
                />
              </div>

              <div className="form-wrapper">
                <label htmlFor="">Avatar URL</label>
                <input
                  type="text"
                  id="avatarUrl"
                  className="form-control"
                  name="avatarUrl"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.avatarUrl}
                />
              </div>

              <button
                type="submit"
                id="register"
                className="btn btn-secondary"
                onClick={this.onButtonClicked}
              >
                Register Now
              </button>
            </form>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}
export default Register;
