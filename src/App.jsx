import React, { Component } from "react";
import {BrowserRouter, Route} from "react-router-dom";
import NavBarA from './components/NavBarA'
import BJumboIntro from "./components/JumoIntro";
import CContainer from "./components/CFooter";
import DFooter from "./components/DFooter";
// import ELogin from "./components/Login";
import "./App.css";
import ProductForm from "./components/ProductForm"
import NavBar from "./components/NavBar"
import ProductsForm from "./components/ProductsForm";
import RegisterB from "./components/RegisterB"
import Login from "./components/Login";
import Home from "./components/Home"
import FriendsForm from "./components/FriendsForm"
import NavC from "./components/NavBarC"
import Friends from "./components/Friends"

import Cars from "./components/Cars";
class ClickApp extends Component {
 
  render() {
    return (
      <React.Fragment>
      <BrowserRouter>    

      <div style={{width:""}}>
      <NavBar></NavBar>
      </div>
     
      <div style={{float:"left"}}>
      <NavC></NavC>
      </div>
     

      <Route path="/home" exact component ={Home}></Route>
      <Route path='/userform' exact component = {ProductForm} ></Route>     
      <Route path="/userregister" exact component = {RegisterB}></Route>    
      
      <Route path="/login" exact component = {Login}></Route> 

      <Route path='/navbar' exact component = {NavBarA} ></Route>       
      <Route path='/jumbo' exact component = {BJumboIntro} ></Route>     
      <Route path='/container' exact component = {CContainer}></Route>
      <Route path='/footer' exact component = {DFooter}></Route>
      <Route path='/product' exact component={ProductsForm}></Route>
      <Route path='/friendforms' exact component = {FriendsForm}></Route>
     <Route path="/friends" exact component={Friends}></Route>
     <Route path="/cars" exact component={Cars}></Route>
      

      

{/* <div> <ProductForm></ProductForm> </div>    */}
 </BrowserRouter> 
      </React.Fragment>
    );
  }
}

export default ClickApp;

