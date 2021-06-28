import React from "react";
import userService from "../services/userService";

class Content extends React.Component {
  buttonClicked() {
    var payload = {
      email: "danielm1013@gmail.com",
      password: "!QAZ2wsx",
      tenantId: "U01N8MYLM8C",
    };
    userService
      .logIn(payload)
      .then(this.onLogInSuccess)
      .catch(this.onLogInError);
  }
  onLogInSuccess = () => {
    console.log("Success");
  };
  onLogInError = () => {
    console.log("Failed");
  };

  render() {
    return (
      <button className="btn btn-secondary" onClick={this.buttonClicked}>
        Click me! &raquo;
      </button>
    );
  }
}

export default Content;
