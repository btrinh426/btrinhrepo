import React from "react";
import userService from "./services/userService";
// import "rc-pagination/assets/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./RegisterUser";

class Content extends React.Component {
  // onClickHandler = () => {
  //   const data = {
  //     email: "weicooler@aol.com",
  //     password: "Zw553375!@#$",
  //     tenantId: "Sabio",
  //   };

  //   userService
  //     .logIn(data)
  //     .then(this.onActionSuccess)
  //     .catch(this.onActionError);
  // };

  // onActionSuccess = (response) => {
  //   console.log(response);
  // };

  // onActionError = (errResponse) => {
  //   console.log(errResponse);
  // };

  // componentDidMount() {
  //   this.onClickHandler();
  // }

  // notify = () => toast("Wow so easy!");

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default Content;
