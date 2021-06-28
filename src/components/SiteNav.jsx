import React, { Component } from "react"
import { toast, ToastContainer} from "react-toastify";

import * as userService from "../Service/userService"
//import Button from "react-bootstrap/Button";

export class SiteNav extends Component
{
  submitHandler = (e) => {
    e.preventDefault();
    userService.loggedOut()
      .then(this.onLoggedOutSuccess)
      .catch(this.onLoggedOutError);

    // make axios call. Bring in the file and call the method
  };

  onLoggedOutSuccess = (response) => {
    console.log(response);
    toast.success(response)
  };

  onLoggedOutError = (response) => {
    console.log(response);
    toast.error(response)  
  };

  loggedOutClicked = () => {
    console.log("I was clicked!!!");
  };


  submitHandler = (e) => {
    e.preventDefault();
    userService.login(this.state.loginInfo)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);

    // make axios call. Bring in the file and call the method
  };

  onLoginSuccess = (response) => {
    console.log(response);
    toast.success(response)
  };

  onLoginError = (response) => {
    console.log(response);
    toast.success(response)  
  };

  loginClicked = () => {
    console.log("I was clicked!!!");
  };

  render(){
    
    return(

    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">

  <button className="link-button navbar-brand">HOME</button>
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarsExampleDefault"
    aria-controls="navbarsExampleDefault"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>

  </button>
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

            <button
            
              variant="Secondary"
              onClick={this.loginClicked}
              // {...this.props}
              
            >
              {/* {this.state.currentUser} */}
              Login
            </button>
         
    
            <button 
             
            variant="Secondary"  onClick={this.loggedOutClicked}>
              Logout
            </button>
            <ToastContainer />
         
        </div>
      </nav>
    );
  }
}
  


export default SiteNav
