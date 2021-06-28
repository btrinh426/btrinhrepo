import React from "react";
import registerUser from "axios";
import Axios from "axios";

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      avatarUrl: this.state.avatarUrl,
      tenantId: this.state.tenantId,
    };
    Axios(user)
      .post(user)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError);
  };

  onRegisterSuccess = () => {
    console.log("success");
  };
  onRegisterError = () => {
    console.log("error");
  };

  render() {
    return <div />;
  }
}
export default Register;
