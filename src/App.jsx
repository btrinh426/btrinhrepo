import React, { Component } from "react";
import {BrowserRouter, Route} from "react-router-dom"
import "./App.css";
import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./components/Home"


class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
      
        <Route path="/register" exact={true} component={Register}></Route>
        <Route path="/login" exact={true} component={Login}></Route>
        <Route path="/home" exact={true} component={Home}></Route>


      
      </BrowserRouter>
    );
  }
}


export default App;
