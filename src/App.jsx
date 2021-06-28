import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import UserServices from "./services/Sabio API Ajax/userServices";

import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import Friends from "./components/Friends";
import ObjectTalk from "./components/ObjectTalk";
import Cars from './components/Map Cars/Cars';

import "./App.css";

class App extends Component {

  state = {
    isLoggedIn: undefined,
    userData: undefined,
    friend: undefined
  };

  componentDidMount() {
    if (this.state.isLoggedIn === undefined) {
      UserServices.get()
        .then(this.onUserGetSuccess)
        .catch(this.onError);
    }
  }

  componentDidUpdate(){
    const historyArray = this.historyToArray();
    const onNotLoggedInPg = (historyArray[0] === "login" || historyArray[0] === "register");

    if(this.state.isLoggedIn && onNotLoggedInPg)
    {this.props.history.push("/home/");}

    if(!this.state.isLoggedIn && !onNotLoggedInPg)
    {this.props.history.push("/login/");}
  }

  onUserGetSuccess = (response) => {
    this.setState({ isLoggedIn: true, userData: response });
    this.props.history.push("/home/");
  };

  onError = (response) => {
    console.log(response);
    this.setState({ isLoggedIn: false });
    this.props.history.push("/login/");
  };

  historyToArray(){
    const hist = this.props.history.location.pathname;
    return hist.split("/").filter(i => {return i != ""});
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          
          {/* <SiteNav app = {this}></SiteNav>

          <div style={{marginTop:"80px"}}></div>
          {
            this.historyToArray()[0] === "login" ? <Login app = {this}></Login> : 
            this.historyToArray()[0] === "register" ? <Register app = {this}></Register> : 
            null
          }
          
          {
            (this.historyToArray()[0] === "friends" || this.historyToArray()[1] === "friends") && <Friends app = {this}></Friends>
          }

          <Footer></Footer> */}

          <Cars></Cars>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
