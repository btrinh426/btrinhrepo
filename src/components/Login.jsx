import React from "react";
import { login } from "../services/usersService";
import { toast } from "react-toastify";

class Login extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
    },
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onLoginClick = () => {
    let payload = {
      email: this.state.formData.email,
      password: this.state.formData.password,
      tenantId: "U0222FEF7T2",
    };

    login(payload).then(this.onLoginSuccess).catch(this.onLoginError);
  };
  onLoginSuccess = (response) => {
    toast.success("Login Successful!");
    console.log(response);
  };
  onLoginError = (response) => {
    toast.error("Login Unsuccessful");
    console.error(response);
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-8">
              <form>
                <center>Login</center>
                <div className="mb- mt-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.email}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={this.onFormFieldChange}
                    value={this.state.formData.password}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onLoginClick}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
