import React from "react";
import axios from "axios";
import * as userServices from "./services/userServices";
import Swal from "sweetalert2";

class Login extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
      tenantId: "U01DAP99MFS",
    },
  };

  onLoginUser = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onLoginClick = (e) => {
    e.preventDefault();
    const data = { ...this.state.formData };

    userServices
      .logIn(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };
  onActionSuccess = () => {
    Swal.fire("Good job!", "You Are Now Logged In!", "success");
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
              User Login
            </h2>
            <div className="container" style={{ marginTop: "100px" }}>
              <div className="form-group" style={{ width: "18rem" }}>
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.onLoginUser}
                  value={this.state.formData.email}
                  placeholder="ex: joe_shmoe@gmail.com"
                />
              </div>
              <div className="form-group" style={{ width: "18rem" }}>
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.onLoginUser}
                  value={this.state.formData.password}
                  placeholder="enter password here "
                />
              </div>
              <div>
                <button
                  name="login"
                  type="submit"
                  className="btn btn-primary btn-sm"
                  onClick={this.onLoginClick}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
