import React from "react";
import "../App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as userService from "../services/userService";

class Register extends React.Component {
  
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: ""
    }
  }; // that we coordinate with the names of the
  //properties of state

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value; //  capture prop val in real time i.e.  this.state.formData.firstName
    let inputName = currentTarget.name; //  assn prop name to the "string" input keystrokes
    console.log(newValue, currentTarget);

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue; // bind state to each form field
      // as characters are entered
      return { formData };
    });
  };

  onSubmitClick = (e) => {
    e.preventDefault();
    let payload = { ...this.state.formData };
    //console.log(payload);
    //console.log("clicked");

    userService
      .register(payload)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  onRegisterSuccess = (res) => {
    console.log("logged in", res);
    toast.success("Registration Successful", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.props.history.push("/login");    // take me to my Login page
  };

  onRegisterError = (errRes) => {
    console.log(errRes);
    toast.error("Failed To Register. Check Spelling", {
      position: "top-center",
      autoClose: 3000,
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
        <div className="container main flex-column bkground">
          <div className="container parent-container d-flex">
            <div className="container bkground">
              <div className="row">
                <div className="col-md-4" id="register">
                  <h2>Registration</h2>
                  <form>                   
                    <div className="mb-3">
                      <label htmlFor="inputFirstName" className="firstname">
                        First Name
                      </label>
                      <input
                        className="form-control clear-fields"
                        type="text"
                        name="firstName"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formData.firstName}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="inputLastName" className="lastname">
                        Last Name
                      </label>
                      <input
                        className="form-control clear-fields"
                        type="text"
                        name="lastName"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formData.lastName}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="InputEmail1" className="email">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control clear-fields"
                        aria-describedby="emailHelp"
                        name="email"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formData.email}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="inputAvatar" className="avatarinput">
                        Avatar URL
                      </label>
                      <input
                        className="form-control clear-fields"
                        type="text"
                        name="avatarUrl"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formData.avatarUrl}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="inputAvatar" className="form-label">
                        tenantId
                      </label>
                      <input
                        className="form-control clear-fields"
                        type="text"
                        name="tenantId"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formData.tenantId}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="InputPassword" className="password">
                        Password
                      </label>
                      <input
                        type="new-password"
                        className="form-control clear-fields"
                        name="password"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formData.password}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label
                        htmlFor="InputPasswordAgain"
                        className="form-label"
                      >
                        Confirm Password
                      </label>
                      <input                      
                        type="new-password"
                        className="form-control clear-fields"
                        name="passwordConfirm"
                        onChange={this.onFormFieldChanged}
                        value={this.state.formData.passwordConfirm}
                      />
                    </div>
                    <p className="font-italic passwordagain d-none">
                      Please re-enter your Password
                    </p>

                    <button
                      id="submitBtn"
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.onSubmitClick}
                    >
                      Submit
                    </button>
                    <p>
                      <strong></strong>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
