import React from "react";
import * as userService from "./Components/userService";

class AxiosComponent extends React.Component {
  onClickHandler = () => {
    UserService.logIn(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {};

  onActionError = (errResponse) => {};
}

userService.logIn(payload);

userService.register(payload);

userService.getById(payload);

export default AxiosComponent;
