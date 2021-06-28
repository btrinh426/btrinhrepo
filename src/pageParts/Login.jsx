import React from "react";
import * as userService from "../services/userService";
import { BrowserRouter } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  state = {
    formData: {
      email: "Tylerar@dukes.jmu.edu",
      password: "password",
      tenantId: "U01LG539DPD",
    },
    isModalOpen: false,
    hasMadAjax: true,
    arrayOfComp: [],
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    //console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = { ...this.state.formData };
      newState[inputName] = newValue;
      //newState.firstName = newValue;
      //console.log({ newState });
      return { formData: newState };
    });
  };

  onButtonClicked = (e) => {
    e.preventDefault();
    console.log("I was clicked");
    console.log(this.state.formData);
    userService
      .logIn(this.state.formData)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log("it worked!");
    this.props.history.push("/home");
  };

  onActionError = (errResponse) => {
    console.log("it didnt work");
  };

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div className="container col-md-9">
            <div className="row"></div>
            <div className=" container bg-text">
              <form>
                <div>
                  <label htmlFor="uEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.email}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div>
                  <label htmlFor="uPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.password}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onButtonClicked}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
export default withRouter(Login);
