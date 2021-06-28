import React from "react";
import * as userService from "./services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class HomePage extends React.Component {
  state = {
    name: "",
    id: "",
  };

  componentDidMount() {
    userService
      .current()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);

    console.log("componentDidMount");
  }

  onCurrentUserSuccess = (response) => {
    console.log({ currentUser: response.data.item.name });

    let newUser = { ...this.state };

    newUser = response.data.item;

    this.setState({ name: newUser.name, id: newUser.id });

    let userId = this.state.id;

    userService
      .byId(userId)
      .then(this.onUserIdsuccess)
      .catch(this.onUserIdError);

    console.log(this.state);

    console.log(userId);
  };

  onCurrentUserError = (response) => {
    console.log({ error: response });
  };

  onUserIdsuccess = (response) => {
    console.log({ userById: response.data.item });
    toast("Success");
  };

  onUserIdError = (response) => {
    console.log({ error: response });
    toast("Error");
  };

  onClickLogout = () => {
    userService.logout().then(this.onLogoutSuccess).catch(this.onLogoutError);
  };

  onLogoutSuccess = (response) => {
    console.log({ logout: response.data });
    toast("Logout Success");
  };

  onLogoutError = (response) => {
    console.log({ error: response });
    toast("Logout Fail");
  };

  render() {
    // let userName = this.state.name;

    return (
      <React.Fragment>
        <div>Welcome</div>
        {this.state.name}
      </React.Fragment>
    );
  }
}

export default HomePage;
