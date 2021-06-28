import React from "react";
import { register } from "../../services/userService";
import manageError from "../../services/errorHandlerHttp";
import { toast } from "react-toastify";

class Register extends React.Component {
  state = {
    registerFormData: {
      inputEmailDomain: "",
      inputEmailUsername: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "U019A93FF7A",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log(newValue, currentTarget);

    this.setState(() => {
      let registerFormData = { ...this.state.registerFormData };
      registerFormData[inputName] = newValue;

      if (inputName === "inputEmailDomain") {
        registerFormData.email =
          registerFormData.inputEmailUsername + "@" + newValue;
      } else if (inputName === "inputEmailUsername") {
        registerFormData.email =
          newValue + "@" + registerFormData.inputEmailDomain;
      }

      //   console.log("newState ", registerFormData);
      return { registerFormData };
    });
  };

  onSubmitClicked = (e) => {
    e.preventDefault();
    console.log("... Register > onSubmitClicked firing ...");

    register(this.state.registerFormData)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterFail);

    this.clearPassword();
  };

  onRegisterSuccess = (data) => {
    console.log("... Register > onRegisterSuccess firing ...", data);

    toast.success("Registration Successful");
    this.props.history.push("/login");
  };
  onRegisterFail = (err) => {
    console.error("... Register > onRegisterFail firing ...", err);

    toast("Error", { position: toast.POSITION.TOP_CENTER });

    const status = err.response.status;
    const statusText = err.response.statusText;
    // const errorList = err.response.data.errors;
    const currentPath = this.props.location.pathname;
    const nextPath = "/login";

    manageError(status, statusText, [], currentPath, nextPath);
  };

  clearPassword = () => {
    console.log("... Register > clearPassword firing ...");
    this.setState(() => {
      let registerFormData = { ...this.state.registerFormData };
      registerFormData.password = "********";
      registerFormData.passwordConfirm = "********";

      console.log(registerFormData);

      return { registerFormData };
    });
  };

  onLoginClicked = (e) => {
    e.preventDefault();
    console.log("... Register > onLoginClicked firing ...");

    this.props.history.push("/login");
  };

  // clearForm = () => {
  //   console.log("... Register > clearForm firing ...");

  //   this.setState(() => {
  //     let registerFormData = { ...this.state.registerFormData };
  //     const tenantId = registerFormData.tenantId;

  //     Object.keys(registerFormData).forEach((key) => {
  //       registerFormData[key] = "";
  //     });

  //     console.log(registerFormData);

  //     registerFormData.tenantId = tenantId;
  //     return { registerFormData };
  //   });
  // };

  // componentWillUnmount() {
  //   console.log("... Register > componentWillUnmount firing ...");
  //   // this.clearForm();  // should not call setState in unmount per:
  //   // https://reactjs.org/docs/react-component.html#componentwillunmount

  //   console.log(this.state);
  // }

  render() {
    return (
      <div className="container card mt-4 col-md-6">
        <div className="card-body">
          <form id="userRegisterForm">
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="First Name"
                  onChange={this.onFormFieldChanged}
                />
              </div>
              <div className="form-group col-md-6 ">
                <input
                  type="text"
                  className="form-control align-bottom"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={this.onFormFieldChanged}
                />
              </div>
            </div>
            <div className="form-row  align-items-center">
              <div className="form-group col-md-6">
                <input
                  type="username"
                  className="form-control"
                  name="inputEmailUsername"
                  placeholder="Username"
                  onChange={this.onFormFieldChanged}
                />
              </div>
              <div className="input-group mb-3 col-md-6">
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                </div>
                <select
                  className="form-control"
                  name="inputEmailDomain"
                  value={this.state.registerFormData.inputEmailDomain}
                  onChange={this.onFormFieldChanged}
                >
                  <option value="">Choose...</option>
                  <option>example.com</option>
                  <option>mickeymouse.com</option>
                  <option>michaelmouse.com</option>
                </select>
              </div>
            </div>

            <div className="form-row d-none">
              <div className="form-group col-md-9">
                <div className="custom-control custom-control-inline">
                  <label htmlFor="inputTenantId" className="col-md-4">
                    Tenant Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="inputTenantId"
                    placeholder="Tenant Id"
                    value="U019A93FF7A"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12 ">
                <input
                  type="text"
                  className="form-control align-bottom"
                  name="avatarUrl"
                  placeholder="https://your.avatarlink.here"
                  onChange={this.onFormFieldChanged}
                />
              </div>
            </div>

            <div className="form-row  align-items-center">
              <div className="form-group col-md-8">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={this.onFormFieldChanged}
                />
              </div>
            </div>
            <div className="form-row  align-items-center">
              <div className="form-group col-md-8">
                <input
                  type="password"
                  className="form-control"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  onChange={this.onFormFieldChanged}
                />
              </div>
              <div className="form-group col-md-4">
                <button
                  type="button"
                  className="btn btn-primary float-right"
                  onClick={this.onSubmitClicked}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-dark float-right"
                  onClick={this.onLoginClicked}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
