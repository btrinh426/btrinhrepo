import React from "react";
import * as friendService from "./friendService";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

class Home extends React.Component {
  state = {
    name: "",
    image: "",
    Redirect: false,
  };

  componentDidMount() {
    friendService
      .currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  }

  getUserById = (id) => {
    friendService
      .currentUserWithId(id)
      .then(this.onCurrentUserWithIdSuccess)
      .catch(this.onCurrentUserWithIdError);
  };

  logUserOut = () => {
    friendService.logOut().then(this.onLogOutSuccess).catch(this.onLogOutError);
  };

  onCurrentUserSuccess = (response) => {
    console.log("displaying current user:" + response.data.item.id);
    this.getUserById(response.data.item.id);
  };

  onCurrentUserError = () => {
    console.log("error, did not obtain currentUser");
    this.setState({ Redirect: true });
    if (Redirect) {
      return <Redirect to="/LoginForm" />;
    }
  };

  onCurrentUserWithIdSuccess = (response) => {
    console.log("grabbed id: " + response.data.item.id);
    this.setState({
      name: response.data.item.firstName + " " + response.data.item.lastName,
      image: response.data.item.avatarUrl,
    });
  };

  onCurrentUserWithIdError = (response) => {
    console.log("couldn't grab id, " + response);
  };

  onLogOutSuccess = (response) => {
    // console.log("Logged out: " + response.data.item.id);
    toast.success("Logged out successfully");
  };

  onLogOutError = (response) => {
    toast.error("Couldn't log out!");
  };

  render() {
    return (
      <>
        <div style={{ margin: "100px" }}>{this.state.image}</div>
        <ToastContainer />
        <div style={{ margin: "100px" }}>
          <h1>Welcome {this.state.name}!</h1>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-light"
            onClick={this.logUserOut}
          >
            <NavLink to="/LoginForm">Log Out</NavLink>
          </button>
        </div>
      </>
    );
  }
}

export default Home;
