import React, { Component } from "react";
import {BrowserRouter, Route, NavLink} from "react-router-dom";
import ANavbar from "./services/NavBar";
import BJumboIntro from "./services/JumoIntro";
import CContainer from "./services/CFooter";
import DFooter from "./services/DFooter";
import ELogin from "./services/Login";
import "./App.css";

class ClickApp extends Component {
  
  render() {
    return (
      <React.Fragment>
      <BrowserRouter>    

      
      <Route path='/navbar' exact component = {ANavbar} ></Route>       
      <Route path='/jumbo' exact component = {BJumboIntro} ></Route>     
      <Route path='/container' exact component = {CContainer}></Route>
      <Route path='/footer' exact component = {DFooter}></Route>

      <Route path='/login' exact component = {ELogin}></Route>




      <span style={{padding: '8px'}}>
      <button className="btn btn-success btn-md" ><NavLink  to="/navbar" >NavLink Test </NavLink></button>
 </span>
 <span style={{padding: '8px'}}>
       <button  style={{
    padding: '8px'}}  className="btn btn-success btn-md" ><NavLink to="/jumbo">JumboLink Test </NavLink></button>
</span>
<span style={{padding: '8px'}}>
       <button  style={{
    paddingTop: '8px'}}  className="btn btn-success btn-md" ><NavLink  to="/container">Container Test </NavLink></button>
</span>
<span style={{padding: '8px'}}>
       <button  style={{
    paddingTop: '8px'}}  className="btn btn-success btn-md" ><NavLink  to="/footer">Footer Test </NavLink></button>
</span>

<span style={{padding: '8px'}}>
       <button  style={{
    paddingTop: '8px'}}  className="btn btn-danger btn-sm" ><NavLink  to="/login">Click to Login </NavLink></button>
</span>

 </BrowserRouter> 
      </React.Fragment>
    );
  }
}

export default ClickApp;

