import React from "react";
import UserService from "../UserService";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class RegistrationForm extends React.Component {
  state = {
    formData: {
      firstName: " ",
      lastName: " ",
      email: " ",
      password: " ",
      passwordConfirm: " ",
      avatarUrl: " ",
      tenantId: "123456789",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
    this.buttonClicked = this.buttonClicked.bind(this);
  };

  buttonClicked = (e) => {
    e.preventDefault();
    UserService.register({ ...this.state.formData })
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  onRegisterSuccess = () => {
    console.log("success");
    toast.success("Welcome to the Dumpster Fire baby!");
  };

  onRegisterError = () => {
    console.log("error");
    toast.error("Yikes, what did you do?");
  };

  render() {
    return (
      <React.Fragment>
        <style type="text/css">{`.navbar {display: none}`}</style>
        <div style={{ backgroundColor: "orange" }}>
          <div
            className="container register-form"
            style={{
              backgroundImage: `url("https://www.npr.org/assets/news/2016/12/dumpster-fire-WEB.gif")`,
              backgroundSize: "cover",
              width: "100vw",
              height: "100vh",
            }}
          >
            <div
              style={{
                fontFamily: "fantasy",
                fontSize: "50px",
                float: "center",
              }}
            >
              DUMPSTER FIRE FRIENDS!
            </div>
            <div
              className="container"
              style={{
                fontFamily: "sans-serif",
                fontSize: "20px",
                color: "red",
                marginLeft: "5px",
              }}
            >
              Join now for life-long dumpster fire benefits like, ummm, uh...
              <br />
              Oh, hey look, a dumpster is on fire!
            </div>
            <div className="form-content">
              <div className="col-4">
                <div className="col-mx-auto-md-6">
                  <div className="form-group col-mx-auto-md-6">
                    <div
                      style={{
                        padding: "5px",
                        color: "dark-gray",
                        float: "left",
                        textDecoration: "underline",
                        marginTop: "10px",
                        marginBottom: "30px",
                      }}
                    />
                    *REGISTER TO LOGIN:
                  </div>
                  <div>
                    <h6
                      style={{
                        margin: "5px",
                        color: "dark-gray",
                        align: "center",
                      }}
                    >
                      FIRST NAME
                    </h6>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.firstName}
                    />
                  </div>

                  <div className="form-group">
                    <h6
                      style={{
                        margin: "5px",
                        color: "dark-gray",
                        align: "center",
                      }}
                    >
                      LAST NAME
                    </h6>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.lastName}
                    />
                  </div>

                  <div className="form-group">
                    <h6
                      style={{
                        margin: "5px",
                        color: "dark-gray",
                        align: "center",
                      }}
                    >
                      EMAIL
                    </h6>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.email}
                    />
                  </div>

                  <div className="form-group">
                    <h6
                      style={{
                        margin: "5px",
                        color: "dark-gray",
                        align: "center",
                      }}
                    >
                      PASSWORD
                    </h6>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.password}
                    />
                  </div>

                  <div className="form-group">
                    <h6
                      style={{
                        margin: "5px",
                        color: "dark-gray",
                        align: "center",
                      }}
                    >
                      CONFIRM PASSWORD
                    </h6>
                    <input
                      type="password"
                      className="form-control"
                      name="passwordConfirm"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.passwordConfirm}
                    />
                  </div>

                  <div className="form-group">
                    <h6
                      style={{
                        margin: "5px",
                        color: "dark-gray",
                        align: "center",
                      }}
                    >
                      PERSONAL IMAGE
                    </h6>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="*www.your-image-link.com*"
                      name="avatarUrl"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.avatarUrl}
                    />
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "10px", marginLeft: "45px" }}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                I agree to the terms and conditions of this site.*
                <label class="form-check-label" for="flexCheckDefault" />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.buttonClicked}
                  style={{
                    margin: "20px 0 20px 20px",
                    padding: "3px 50px 3px 50px",
                  }}
                >
                  REGISTER
                </button>
              </div>
              <div
                style={{
                  fontSize: "15px",
                  marginLeft: "20px",
                }}
              >
                Already lighting dumpsters? Log in{" "}
                <NavLink to="/LoginForm">here.*</NavLink>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegistrationForm;
