import React from "react";
import UserService from "../userService";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class RegistrationForm extends React.Component {
  getRandomNumber = (min, max) => {
    min = Math.ceil(1000000);
    max = Math.floor(9999999);
    return Math.floor(Math.random() * (max - min) + min);
  };
  state = {
    registrationData: {
      firstName: " ",
      lastName: " ",
      email: " ",
      password: " ",
      passwordConfirm: " ",
      avatarUrl: " ",
      tenantId: this.getRandomNumber(),
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let registrationData = { ...this.state.registrationData };

      registrationData[inputName] = newValue;

      return { registrationData };
    });
  };

  buttonClicked = (e) => {
    e.preventDefault();
    UserService.register({ ...this.state.registrationData })
      .then(this.onRegisterSuccess, this.props.history.push("/LoginForm"))

      .catch(this.onRegisterError);
  };

  onRegisterSuccess = () => {
    toast.success("Welcome to the Dumpster Fire baby!");
  };

  onRegisterError = () => {
    console.log("error");
    toast.error("Oh snap! What did you do?");
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
                textShadow: "2px 2px gray",
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
                      value={this.state.registrationData.firstName}
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
                      value={this.state.registrationData.lastName}
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
                      value={this.state.registrationData.email}
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
                      value={this.state.registrationData.password}
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
                      value={this.state.registrationData.passwordConfirm}
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
                      value={this.state.registrationData.avatarUrl}
                    />
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "10px", marginLeft: "45px" }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                I agree to the terms and conditions of this site.*
                <label
                  className="form-check-label"
                  htmlFor="flexCheckDefault"
                />
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

/*
componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = this.prevProps.location.pathname;

    console.log({ currentPath, previousPath });
  }
*/
