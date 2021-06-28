import React from "react";
import Swal from "sweetalert2";

import * as appService from "../services/userService";

class Home extends React.Component {
  state = {
    currentUser: "",
    currentId: "",
  };

  componentDidMount() {
    console.log("component did mount");
    this.getUser();
  }

  getUser = () => {
    appService
      .getCurrentUser()
      .then(this.onGetUserSuccess)
      .catch(this.onGetUserError);
  };

  getUserById = (id) => {
    appService
      .getUserById(id)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetByIdError);
  };

  onGetByIdSuccess = (response) => {
    console.log(response.data.item);
    this.setState({
      currentUser: response.data.item.firstName,
      currentId: response.data.item.id,
    });
  };

  onGetByIdError = (response) => {
    console.log(response);
  };

  onGetUserSuccess = (response) => {
    this.getUserById(response.data.item.id);
    console.log(response);
  };

  onGetUserError = (response) => {
    console.log(response);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User not logged in!",
      footer: "Please do that.",
    });
    this.props.history.push("/login");
  };

  render() {
    return (
      <div style={{ padding: 20 }}>
        <h1 className="text-center">Welcome {this.state.currentUser}!</h1>
      </div>
    );
  }
}

export default Home;
