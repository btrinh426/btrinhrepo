import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import * as userService from "../services/userService";

class Home extends React.Component {
  state = {
    currentUser: { firstName: "", lastName: "" },
  };

  componentDidMount() {
    userService
      .currentUser()
      .then(this.onCurrentSuccess)
      .catch(this.onCurrentError);
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  onCurrentSuccess = (response) => {
    // console.log({ user: response.data });
    // // toastr.success("Successfully logged in")
    // this.setState({
    //   loginData: {
    //     email: "",
    //     password: "",
    //     loggedIn: true,
    //   },
    // });

    console.log({ user: response.data.item });
    let userId = response.data.item.id;

    // TODO: how do I hide register and login button?
    // $("#registerButton").hide();
    // $("#loginButton").hide();

    userService
      .getUser(userId)
      .then(this.onGetUserSuccess)
      .catch(this.onGetUserError);
  };

  onCurrentError = (errResponse) => {
    toast.warn("No user logged in.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.warn({ error: errResponse.config });
  };

  onGetUserSuccess = (response) => {
    // console.log({ user: response.data });
    // Swal.fire("Success");
    // // toastr.success("Successfully logged in")
    // this.setState({
    //   loginData: {
    //     email: "",
    //     password: "",
    //     loggedIn: true,
    //   },
    // });
    console.log({ user: response.data.item });

    // display user info in render

    //setState
    // Swal.fire(
    //   `Hello ${response.data.item.firstName} ${response.data.item.lastName}.\nYou are logged in.`
    // );
    // this.setState({
    //   loginData: {
    //     email: "",
    //     password: "",
    //     loggedIn: true,
    this.setState(
      {
        currentUser: {
          firstName: response.data.item.firstName,
          lastName: response.data.item.lastName,
        },
      },
      () => this.props.changeName(response.data.item.firstName)
    );
  };

  onGetUserError = (errResponse) => {
    console.warn({ error: errResponse.config });
    toast.error("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>
          Hello {this.state.currentUser && this.state.currentUser.firstName}{" "}
          {this.state.currentUser && this.state.currentUser.lastName}
        </h1>
      </React.Fragment>
    );
  }
}

export default Home;
