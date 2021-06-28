import React, { Component } from "react";
import * as userService from "../Service/userService";
//import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";

export class Homepage extends Component {
  state ={
      nameById: 2
  }

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
    this.props.history.push("/login")
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

  loginClicked = ()=> {
    this.props.history.push("/login")
  }

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
              onClick={this.loginClicked}
              // {...this.props}
              
            >
              {/* {this.state.currentUser} */}
              Login
            </Button>
         
    
            <Button variant="primary"  onClick={this.loggedOutClicked}>
              Logout
            </Button>
            <ToastContainer />
         
        </div>
      </nav>
    );
  }
}

export default Homepage;
