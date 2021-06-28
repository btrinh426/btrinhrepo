import React from "react";
import { Redirect, NavLink, Link } from "react-router-dom";
import { current, logout } from "../services/usersService";
import { toast } from "react-toastify";

class Home extends React.Component {
  state = {
    isLoggedIn: false,
    currentUser: { name: "" },
  };

  componentDidMount() {
    current().then(this.onCurrentSuccess).catch(this.onCurrentError);
  }

  onCurrentSuccess = (response) => {
    console.log(response);

    var current = response.data.item.name;
    console.log(current);

    // var newUser = { ...this.state.currentUser };
    // newUser.name = current;
    // var newState = { isLoggedIn: true, currentUser: newUser };
    // this.setState(newState);

    this.setState((prevState) => {
      let isLoggedIn = { ...prevState.isLoggedIn };
      let currentUser = { ...prevState.currentUser };
      isLoggedIn = true;
      currentUser.name = current;

      return { isLoggedIn, currentUser };
    });

    console.log(this.state.isLoggedIn);
  };
  onCurrentError = (response) => {
    console.log(response.errors);
  };
  onLogoutClick = () => {
    logout().then(this.onLogoutSuccess).catch(this.onLogoutError);
  };
  onLogoutSuccess = (response) => {
    toast.success("Logout Successful!");
    console.log(response);
    //Needs to change isLoggedIn property of state
  };
  onLogoutError = (response) => {
    toast.error("Logout error");
    console.error(response);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <center>Home Page</center>
          <p>{`Welcome ${this.state.currentUser.name}`}</p>
          <button onClick={this.onLogoutClick} type="text/html">
            Logout
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
