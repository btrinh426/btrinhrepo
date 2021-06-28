import React from "react";
import * as userService from "../services/userService";
class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl:
        "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      tenantId: "SabioNation",
    },
  };
  onFormInput = (e) => {
    let newValue = e.currentTarget.value;
    let inputName = e.currentTarget.name;
    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    });
  };
  addUser = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let data = this.state.formData;
    userService
      .registerUser(data)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.error(res);
      });
  };
  render() {
    let registgerUserStyle = {
      margin: "0 auto",
      fontSize: "x-large",
    };
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="container-fluid">
            <div className="row bg-white p-3">
              <p className="font-weight-bolder" style={registgerUserStyle}>
                Register User
              </p>
            </div>
          </div>
          <div className="bg-light container-fluid">
            <div className="w-75 container">
              <form>
                <div className="form-group mb-5 pt-5">
                  <label htmlFor="inputFirstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    id="inputFirstName"
                    placeholder="Enter your firstname"
                    value={this.state.formData.firstName}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-5">
                  <label htmlFor="inputLastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    id="inputLastName"
                    placeholder="Enter your lastname"
                    value={this.state.formData.lastName}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-5">
                  <label htmlFor="inputEmail">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="inputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={this.state.formData.email}
                    onChange={this.onFormInput}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group mb-5">
                  <label htmlFor="inputPassword">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="more than 8 characters"
                    value={this.state.formData.password}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-5">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="re-enter password"
                    value={this.state.formData.passwordConfirm}
                    onChange={this.onFormInput}
                  />
                </div>
                <button className="btn btn-primary mb-5" onClick={this.addUser}>
                  Submit Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
