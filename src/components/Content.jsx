import React from "react";
import axios from "axios";

class Content extends React.Component {
  state = {
    formData: {
      firstName: "Emilio",
      lastName: "Dinson",
      email: "",
      color: "Red",
      agree: false,
    },
  };

  componentDidMount() {
    console.log("componentDidMount");
  }

  login = () => {
    const payload = {
      email: "user@google.com",
      password: "password",
      tenantId: "U01GA18K2E5",
    };

    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/users/login",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };

    return axios(config);
  };

  onClickHandler = () => {
    console.log("Test Button was clicked");

    // this.login()
    //     .then(this.onActionSuccess)
    //         .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log("Login Successful");
    console.log(response);
  };

  onActionError = (errResponse) => {
    console.error("Login Failed");
    console.log(errResponse);
  };

  onFormFieldChanged = (e) => {
    console.log(e.currentTarget.name);
    let currentTarget = e.currentTarget;
    let newValue =
      currentTarget.type === "checkbox"
        ? currentTarget.checked
        : currentTarget.value;
    let inputName = currentTarget.name;
    //console.log({newValue, currentTarget})

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      //   console.log("newState", formData, { formData });
      return { formData };
    });
  };

  onButtonClicked = (e) => {
    console.log("i was clicked", e.currentTarget);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 p-5">
            <form>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
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

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.lastName}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.email}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlSelect1"
                  className="form-label"
                >
                  Favorite Color
                </label>
                <select
                  className="form-control"
                  onChange={this.onFormFieldChanged}
                  name="color"
                  value={this.state.formData.color}
                >
                  <option value="">Select Color</option>
                  <option>Red</option>
                  <option>Green</option>
                  <option>Blue</option>
                </select>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="agree"
                    checked={this.state.formData.agree}
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.agree}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheckbox1"
                  >
                    Can't check this
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onButtonClicked}
              >
                Click Me
              </button>
            </form>
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

export default Content;
