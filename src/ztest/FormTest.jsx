import React from "react";
// import { register } from "../../services/userService";

class FormTest extends React.Component {
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
      defaultCheck1: true,
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue =
      currentTarget.type === "checkbox"
        ? currentTarget.checked
        : currentTarget.value;
    let inputName = currentTarget.name;
    // console.log(newValue, currentTarget);
    console.log(inputName);

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

  onButtonClicked = (e) => {
    e.preventDefault();
    console.log("... Register > onButtonClicked firing ...");

    // register(this.state.registerFormData)
    //   .then(this.onRegisterSuccess)
    //   .catch(this.onRegisterFail);
  };

  //   onRegisterSuccess = (data) => {
  //     console.log("... Register > onRegisterSuccess firing ...", data);
  //   };
  //   onRegisterFail = (err) => {
  //     console.log("... Register > onRegisterFail firing ...", err);
  //   };

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
                  value={this.state.registerFormData.firstName}
                />
              </div>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="defaultCheck1"
                    onChange={this.onFormFieldChanged}
                    checked={this.state.registerFormData.defaultCheck1}
                    value="8899"
                  />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Default checkbox
                  </label>
                </div>
              </div>
              <div className="form-group col-md-6 ">
                <input
                  type="text"
                  className="form-control align-bottom"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={this.onFormFieldChanged}
                  value={this.state.registerFormData.lastName}
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
                  value={this.state.registerFormData.inputEmailUsername}
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

            <div className="form-row">
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
                  value={this.state.registerFormData.avatarUrl}
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
                  value={this.state.registerFormData.password}
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
                  value={this.state.registerFormData.passwordConfirm}
                />
              </div>
              <div className="form-group col-md-4">
                <button
                  type="submit"
                  className="btn btn-primary float-right"
                  onClick={this.onButtonClicked}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FormTest;
