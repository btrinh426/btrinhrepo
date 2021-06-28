import React, { Component } from "react";
import {Route} from "react-router-dom"
import "./App.css";
import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./components/Home"
import People from "./components/People"
import ProductForm from "./components/ProductForm"
import AddEditFriend from "./components/AddEditFriend"


class App extends Component {
  
  render() {
    return (    
      <React.Fragment>
        <Route path="/addedit" exact component={AddEditFriend}></Route>
        <Route path="/Products" exact component={ProductForm}></Route>
        <Route path="/register" exact={true} component={Register}></Route>
        <Route path="/login" exact={true} component={Login}></Route>
        <Route path="/home" exact={true} component={Home}></Route>
        <Route path="/people" exact={true} component={People}></Route>
      </React.Fragment>
    );
  }
}


export default App;
