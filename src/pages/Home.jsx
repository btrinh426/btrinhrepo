import React from "react";

import * as userService from "../services/userService";

class Home extends React.Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
  };

  currentLoggedInUser = () => {
    userService.getUser().then(this.getUserSuccess).catch(this.getUserFail);
  };

  getThisUserById = (iD) => {
    userService
      .getUserById(iD)
      .then(this.userByIdSuccess)
      .catch(this.userByIdFail);
  };

  getUserSuccess = (res) => {
    console.log("onGetUsersSuccess", res);
    let id = res.data.item.id;
    this.getThisUserById(id);
  };

  userByIdSuccess = (res) => {
    console.log("by Id Success:", res);
    let newUser = { ...res.data.item };

    this.setState((prevState) => {
      let newState = { ...prevState, ...newUser };

      console.log("newUser", newUser);
      console.log("newState", newState);
      return newState;
    });
  };

  userByIdFail = (res) => {
    console.error("by Id Fail:", res);
  };

  getUserFail = (res) => {
    console.error("get User Fail", res);
  };

  componentDidMount() {
    this.currentLoggedInUser();
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    console.log("clicked on logout");
    userService
      .logOutUser()
      .then(this.onLogoutSuccess)
      .catch(this.onLogoutFail);
  };

  onLogoutSuccess = (res) => {
    console.log("logout success:", new Date());
    this.props.history.push("/login");
  };

  onLogoutFail = (res) => {
    console.error("logout fail", res);
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="text-center">
          Welcome To
          <strong>
            {this.state.firstName} {this.state.lastName}'s
          </strong>
          Home Page
        </h2>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col col-lg-2"></div>
            <div className="col-md-auto">
              <img
                className="card-img-top"
                src={this.state.avatarUrl}
                style={{
                  border: "solid",
                  borderRadius: 15,
                  marginLeft: 75,
                  marginTop: 0,
                  width: 500,
                }}
                alt="..."
              />

              <button
                id="submitBtn"
                type="submit"
                className="btn btn-primary"
                onClick={this.onLogoutClick}
              >
                Logout
              </button>
            </div>
            <div className="col col-lg-2"></div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col-md-auto"></div>
            <div className="col col-lg-2"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
