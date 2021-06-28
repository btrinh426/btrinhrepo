import React from "react";
import * as usersService from "../services/usersService";

function UserInfo() {
  usersService
    .currentUser()
    .then(this.onGetCurrentSuccess)
    .catch(this.onGetCurrentError);

  this.onGetCurrentError = (response) => {
    console.log("currentUser Error", response);
  };
  this.onGetCurrentSuccess = (response) => {
    console.log("currentUser Success", response);
    let data = response.data.item.id;
    console.log("ID", data);
    usersService
      .getById(data)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetByIdError);
  };

  onGetByIdError = (response) => {
    console.log("getById Error", response);
  };
  onGetByIdSuccess = (response) => {
    console.log("getById Success", response);
    let tempUser = response.data.item;

    console.log("tempUser", tempUser);

    this.setState(tempUser);
  };
}
