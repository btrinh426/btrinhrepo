import React, { Component } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";

import "./App.css";
import Content from "./components/Content";
import Registration from "./components/Registration"
import Login from "./components/Login"
import HomePage from "./components/HomePage";
import userServices from "./services/userServices";
import ProductForm from "./components/ProductForm";


class App extends Component {
  
  createCurrentUser = () => {
    let isLoggedIn = this.props.isLoggedIn

    if (isLoggedIn === true) {
      userServices.currentUser()
        .then(this.grabCurrentUserInfoSuccess)
        .catch(this.grabCurrentUserInfoError)
      this.props.history.push("/homepage")
    }

  }

  grabCurrentUserInfoSuccess  = response => {
    console.log(response)
  }

  grabCurrentUserInfoError = response => {
    console.log("You goofed up")
  }
  render() {

    this.createCurrentUser()

    return (
      <React.Fragment>
        
        <BrowserRouter>
        
        <Switch>
        <Route path="/Content" exact={true} component={Content}></Route>
        <Route path="/registration" exact={true} component={Registration}/> 
        <Route path="/login" exact={true} component={Login} />
        <Route path="/homepage" component={HomePage} /> 
        </Switch>
        
        <div className="section">
        
      
      <ProductForm/>
       
        
          
        </div>        
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
