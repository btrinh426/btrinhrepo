import React, { Component } from "react"
import { toast,} from "react-toastify";

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

 


    
  
</nav>

) 
  }
}
  


export default SiteNav
