import React from "react";
import * as userService from "../services/userService";

class SomeComponent extends React.Component {
  onClickHandler = () => {
    const data = { email: "user@google.com", password: "password" };

    userService
      .logIn(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log({ id: response.data.items });
  };

  onActionError = (errResponse) => {
    console.warn({ error: errResponse });
  };

  render() {
    return <div></div>;
  }
}

export default SomeComponent;
