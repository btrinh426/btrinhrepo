import React from "react";
import * as userService from "../services/userService";
class UserNameDom extends React.Component {
  state = {
    userName: "",
    userId: "",
  };
  componentDidMount() {
    userService
      .getCurrentUser()
      .then(this.onGetCurrentUserSuccess)
      .catch(this.onGetCurrentUserError);
  }
  onGetCurrentUserSuccess = (res) => {
    userService
      .getUserNameById(res.data.item.id)
      .then(this.onGetUserNameByIdSuccess)
      .catch(this.onGetUserNameByIdError);
  };
  onGetCurrentUserError = (res) => {
    console.error(res);
  };
  onGetUserNameByIdSuccess = (res) => {
    let user = res.data.item;
    let userName = user.firstName + " " + user.lastName;
    console.log(user.id);
    console.log(userName);
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.userName = userName;
      return { userName };
    });
  };
  onGetUserNameByIdError = (res) => {
    console.error(res);
  };
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3 p-5">Welcome {this.state.userName}!</h1>
        </div>
      </div>
    );
  }
}

export default UserNameDom;
