import React, { Component } from "react";
import * as userService from "../Service/userService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";

export class Homepage extends Component {
  // state ={
  //     nameById:{userId}
  // }

  submitHandler = (e) => {
    e.preventDefault();
    userService
      .loggedOut()
      .then(this.onLoggedOutSuccess)
      .catch(this.onLoggedOutError);

    // make axios call. Bring in the file and call the method
  };
  onLoggedOutSuccess = (response) => {
    console.log(response);
    toast.success("Logged out", response);

    // do something
  };

  onLoggedOutError = (response) => {
    console.log(response);
    toast.error("Logout failed", response);

    // do something
  };

  loggedOutClicked = () => {
    console.log("I was clicked!!!");
    toast.success("i was clicked");
    userService
      .loggedOut()
      .then(this.onLoggedOutSuccess)
      .catch(this.onLoggedOutError);
  };
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button className="nav-link link-button">Friends</button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">Blogs</button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">Tech-Companies</button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">Jobs</button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">Events</button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">Register</button>
            </li>
          </ul>

          <Button 
        variant="primary" 
        type="submit"
        {...this.props} 
        onClick={this.loginClicked}>
        {this.state.currentUser}
          Login
        </Button>

          <Form onClick={this.loggedOutClicked}>
            <Button variant="primary" type="submit">
              Logout
            </Button>
            <ToastContainer />
          </Form>
        </div>
      </nav>
    );
  }
}

export default Homepage;
