import React from "react";
import UserService from "../UserService";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class LoginForm extends React.Component {
  state = {
    loginInfo: {
      email: " ",
      password: " ",
      tenantId: "123456789",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let loginInfo = { ...this.state.loginInfo };

      loginInfo[inputName] = newValue;

      return { loginInfo };
    });
  };

  buttonClicked = (e) => {
    e.preventDefault();
    UserService.logIn({ ...this.state.loginInfo })
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
  };

  onLoginSuccess = () => {
    console.log(this.state.loginInfo);
    toast.success("Welcome back oh mighty Dumpster Boss!");
  };

  onLoginError = () => {
    console.log("Did you forget how to type or something?");
    toast.error("What's wrong with you? Try again or register!");
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ backgroundColor: "orange" }}>
          <style type="text/css">{`.navbar {display: none}`}</style>
          <div
            style={{
              textAlign: "center",
              fontFamily: "fantasy",
              padding: "50px",

              backgroundImage: `url("https://www.npr.org/assets/news/2016/12/dumpster-fire-WEB.gif")`,
              backgroundSize: "cover",
              width: "100%",
              height: "75%",
            }}
          >
            <h1>WELCOME BACK TO THE DUMPSTER FIRE!</h1>
            <div
              className="container"
              style={{
                fontFamily: "sans-serif",
                fontSize: "20px",
                color: "yellow",
                marginLeft: "80px",
                marginTop: "20px",
              }}
            >
              Here at <b>Dumpster Fire Friends</b> - our motto is simple:
              <br />
              <em>
                {" "}
                Your whole life is a dumpster fire!
                <br />
                Let's all watch it burn together!
              </em>
            </div>
            <div className="container login-form">
              <div className="form-content">
                <div className="col-3">
                  <div className="col-mx-auto-md-6">
                    <div className="form-group">
                      <div
                        style={{
                          padding: "5px",
                          color: "red",
                          align: "center",
                          fontSize: "30px",
                        }}
                      >
                        SIGN IN!
                      </div>

                      <div className="form-group">
                        <div
                          style={{
                            margin: "5px",
                            color: "black",
                            align: "center",
                            fontSize: "20px",
                          }}
                        >
                          EMAIL
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={this.onFormFieldChanged}
                          value={this.state.loginInfo.email}
                        />
                      </div>

                      <div
                        style={{
                          margin: "5px",
                          color: "black",
                          align: "center",
                          fontSize: "20px",
                        }}
                      >
                        PASSWORD
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={this.onFormFieldChanged}
                        value={this.state.loginInfo.password}
                      />
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={this.buttonClicked}
                        style={{
                          margin: "20px 10px 15px 25px",
                          padding: "0 15px 0 15px",
                          color: "white",
                          fontSize: "25px",
                        }}
                      >
                        ENTER
                      </button>
                    </div>
                    <div
                      className="newMemberRegister"
                      style={{
                        fontFamily: "sans-serif",

                        marginLeft: "15px",
                      }}
                    >
                      <br />
                      Not a Dumpster Fire member yet? How pathetic!
                      <br />
                      Register <NavLink to="/RegistrationForm">
                        here
                      </NavLink>{" "}
                      before everyone finds out!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
