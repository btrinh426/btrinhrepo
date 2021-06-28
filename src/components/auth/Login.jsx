import React from "react";
import * as userService from "../../services/userService";

class Login extends React.Component {
  state = {
    loginFormData: {
      email: "sss@email.com",
      password: "*******",
      tenantId: "U019A93FF7A",
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log(newValue, currentTarget);

    this.setState(() => {
      let loginFormData = { ...this.state.loginFormData };
      loginFormData[inputName] = newValue;

      console.log("newState ", loginFormData);
      return { loginFormData };
    });
  };

  onLoginClickHandled = () => {
    console.log("... Login > onLoginClickHandled firing ...");
    userService
      .login(this.state.loginFormData)
      .then(this.onLoginSuccess)
      .catch(this.onLoginFail);
  };

  onLoginSuccess = (data) => {
    console.log("... Login > onLoginSuccess firing ...", { data });
    this.props.history.push("/home");
  };

  onLoginFail = (err) => {
    console.log("... Login > onLoginFail firing ...", { err });
  };

  onRegisterClickHandled = () => {
    console.log("... Login > onRegisterClickHandled firing ...");
    this.props.history.push("/register");
  };

  render() {
    return (
      <div
        className="container card mt-4"
        id="cardLogin"
        // style="max-width: 600px;"
        // style={{ max-width: "600px"}}
      >
        <div className="card-body">
          <div
            className="row-inline"
            // style="background-color: rgb(177, 107, 27);"
          >
            <h1>Welcome to API Testing Grounds</h1>
          </div>
          <div className="row col">
            <p>
              Please be mindful of exploding code! It just might blow up on
              you!!
            </p>
          </div>

          <form id="loginForm">
            <div className="row col-12">
              <div className="form-row  align-items-center">
                <div className="form-group col-md-10">
                  <input
                    type="email"
                    className="form-control"
                    // id="inputLoginEmail"
                    name="email"
                    placeholder="username@example.com"
                    onChange={this.onFormFieldChanged}
                    value={this.state.loginFormData.inputLoginEmail}
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    // don't need id anymore
                    // id="inputLoginPassword"
                    name="password"
                    placeholder="Password"
                    onChange={this.onFormFieldChanged}
                    value={this.state.loginFormData.inputLoginPassword}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-4">
              <button
                type="button"
                className="btn btn-dark btn-lg"
                id="btnLoadLogin"
                onClick={this.onLoginClickHandled}
              >
                Login
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="btn btn-light btn-lg btnLoadRegisterNew"
                id="btnLoadRegisterNew"
                onClick={this.onRegisterClickHandled}
              >
                Register New User
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* 
                <form id="loginForm"></form>


                    <div className="row col-12"></div>

                        <div className="form-row  align-items-center"></div>

                            <div className="form-group col-md-10"></div>


                                <!-- <label for="inputLoginEmail">Email</label> --> 
                                <input type="email" clclassNameass="form-control" id="inputLoginEmail"
                                    name="inputLoginEmail" placeholder="username@example.com"/>
                            </div>

                            <div class="form-group col-md-6"></div>


                                <!-- <label for="inputLoginPassword">Password</label> -->
                                <input type="password" class="form-control" id="inputLoginPassword"
                                    name="inputLoginPassword" placeholder="Password"/>
                            </div>
                        </div>

                    </div>
                </form>


                <div className="row">
                    <div className="col-4">
                        <button type="button" className="btn btn-dark btn-lg"
                            id="btnLoadLogin">Login</button>
                    </div>
                    <div className="col-6">
                        <button type="button" className="btn btn-light btn-lg btnLoadRegisterNew"
                            id="btnLoadRegisterNew">Register New User</button>
                    </div>

                </div>
*/

export default Login;
