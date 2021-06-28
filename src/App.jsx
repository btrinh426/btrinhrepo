import React, { Component } from "react";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import {BrowserRouter, Route, NavLink} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import MainContent from "./components/MainContent";
import Services from "./scripts/services"
import Misc from "./scripts/misc"

import "./App.css";
import ProductForm from "./components/ProductForm"

class App extends Component {

  state= {
    isLoggedIn: undefined,
    userCurrentData: undefined,
    friendsArray: undefined
  };

  componentDidMount () {
    if(this.state.isLoggedIn === undefined){
      Services.userGetCurrent()
          .then((response) => {this.setState({isLoggedIn: true, userCurrentData: response});})
          .catch(() => {this.setState({isLoggedIn: false});});
    }
  };

  componentDidUpdate(){
    // const historyArray = this.props.history.location.pathname.split("/").filter(i => {return i != ""});
    // console.log(!(historyArray[1] === "friendsDisplay" || historyArray[1] === "friendAdd" || historyArray[1] === "friendEdit"));
    //   if(!(historyArray[1] === "friendsDisplay" || historyArray[1] === "friendAdd" || historyArray[1] === "friendEdit") && this.state.friendsArray){
    //     this.setState(Misc.objModify("friendsArray", [], {... this.state}, null));
    //   }
  }

  render() {
    return (
      <BrowserRouter>
        {this.state.isLoggedIn === undefined ? null :
        
        <React.Fragment>

          <SiteNav 
            pushHistory={str => {this.props.history.push(str);}}
            getHistory={() => {return this.props.history.location.pathname}}
            setAppState={p=>{this.setState(p)}}
            getAppState={this.state}
          ></SiteNav>

          <MainContent
            pushHistory={str => {this.props.history.push(str)}} 
            getHistory={() => {return this.props.history.location.pathname}}
            setAppState={p=>{this.setState(p)}}
            getAppState={this.state}
          ></MainContent>

          <Route path="/productForm"><ProductForm></ProductForm></Route>


          <Footer></Footer>

        </React.Fragment>
      }
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
