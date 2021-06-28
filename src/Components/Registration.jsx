import React from "react";

class Registration extends React.Component {
  //noValidate inside needs-validation turns off validation
  //change class and for to className and htmlFor
  //add closing tag for input fields
  render() {
    return (
      <div className="registration">
        <div className="container">
          <h1 align="center">Registration Form</h1>
          <form className="needs-validation">
            <div className="form-row">
              <div className="col-md-4 mb-3">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  id="firstName"
                  placeholder="First name"
                  value={this.state.formData.firstName}
                  required
                ></input>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last name"
                  required
                ></input>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-4 mb-3">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="email"
                  required
                ></input>
              </div>
              <div className="col-md-4 mb-3">
                <label>Avatar</label>
                <input
                  type="text"
                  className="form-control"
                  id="avatar"
                  placeholder="URL"
                  required
                ></input>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-4 mb-3">
                <label htmlFor="inputPass">Password</label>
                <input
                  type="password"
                  id="inputPass"
                  className="form-control"
                  aria-describedby="passwordHelpBlock"
                ></input>
                <small id="passwordHelpBlock" className="form-text text-muted">
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </small>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="confirmPass">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPass"
                  className="form-control"
                  aria-describedby="passwordHelpBlock"
                ></input>
                <small id="passwordHelpBlock" className="form-text text-muted">
                  Passwords Must Match
                </small>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Registration;
