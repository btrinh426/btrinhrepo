import React from "react";
import * as userService from "../services/userService";

class Homepage extends React.Component {
  state = {
    name: "",
  };

  componentDidMount() {
    // axios call to get current
    const user = this.state.formData;
    userService.getCurrent(user).then(this.onGetSuccess).catch(this.onGetError);
  }

  onGetSuccess = (response) => {
    console.log("sucessfully getting user", response);
    // make other axios call

    userService
      .getId(response.data.item.id)
      .then(this.onGetIdSuccess)
      .catch(this.onGetIdError);
  };

  onGetIdSuccess = (response) => {
    console.log("sucessfully getting ID", response);
    this.setState({
      name: response.data.item.firstName,
    });
  };

  onGetIdError = (errResponse) => {
    console.log(errResponse);
  };

  onGetError = (errResponse) => {
    console.log(errResponse);
  };

  onLogoutClick = () => {
    let ticks = new Date().getSeconds();
    console.log("logout is firing", ticks);
    this.props.history.push("/logout");

    userService.logout().then(this.onLogoutSuccess).catch(this.onLogoutError);
  };

  onLogoutSuccess = (response) => {
    console.log(response.data);
    this.props.history.push("/");
  };

  onLogoutError = (errResponse) => {
    console.log(errResponse);
  };

  render() {
    return (
      <div className="welcome">
        <h1>Welcome {this.state.name} !</h1>

        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={this.onLogoutClick}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default Homepage;
