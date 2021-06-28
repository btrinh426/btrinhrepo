import React from "react";
import axios from "axios";
import * as userServices from "./services/userServices";
import Swal from "sweetalert2";

class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "U01DAP99MFS",
    },
  };

  onRegisterUserChange = (e) => {
    console.log("", e.currentTarget);
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    //  userServices.register(formData)
    //  .then(this.onActionSuccess)
    //  .catch(this.onActionError)

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onRegisterClick = (e) => {
    e.preventDefault();
    const data = { ...this.state.formData };

    userServices
      .register(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = () => {
    Swal.fire("Good job!", "You are now a Registered User", "success");
    this.props.history.push("/home/");
  };
  onActionError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: "<a href>Why do I have this issue?</a>",
    });
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="container" style={{ marginLeft: "500px" }}>
            <h2 className="display-3" style={{ marginbottom: "50px" }}>
              Register New User
            </h2>
            <div className="container" style={{ marginTop: "100px" }}>
              <div className="form-group" style={{ width: "18rem" }}>
                <label>First Name</label>
                <input
                  type="firstName"
                  className="form-control"
                  name="firstName"
                  onChange={this.onRegisterUserChange}
                  value={this.state.formData.firstName}
                  placeholder="ex: John"
                />
              </div>
              <div className="form-group" style={{ width: "18rem" }}>
                <label>Last Name</label>
                <input
                  type="lastName"
                  className="form-control"
                  name="lastName"
                  onChange={this.onRegisterUserChange}
                  value={this.state.formData.lastName}
                  placeholder="ex: Smith"
                />
              </div>
              <div className="form-group" style={{ width: "18rem" }}>
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.onRegisterUserChange}
                  value={this.state.formData.email}
                  placeholder="ex: john_smith@gmail.com"
                />
              </div>
              <div className="form-group" style={{ width: "18rem" }}>
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.onRegisterUserChange}
                  value={this.state.formData.password}
                  placeholder="enter password here"
                />
              </div>
              <div className="form-group" style={{ width: "18rem" }}>
                <label>Confirm Password</label>
                <input
                  type="passwordConfirm"
                  className="form-control"
                  name="passwordConfirm"
                  onChange={this.onRegisterUserChange}
                  value={this.state.formData.passwordConfirm}
                  placeholder="Renter password here"
                />
              </div>
              <div className="form-group" style={{ width: "18rem" }}>
                <label>Avatar Url</label>
                <input
                  type="avatarUrl"
                  className="form-control"
                  name="avatarUrl"
                  onChange={this.onRegisterUserChange}
                  value={this.state.formData.avatarUrl}
                />
              </div>

              <button
                name="register"
                type="submit"
                className="btn btn-primary btn-sm"
                onClick={this.onRegisterClick}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
