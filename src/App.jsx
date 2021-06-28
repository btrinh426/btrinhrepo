import React, { Component } from "react";
import "./App.css";
import {withRouter} from "react-router-dom";
import SiteNave from "./navagation/SiteNave";






class App extends Component {
 
  
  
  render() {

   
    
  

    return (
      
      <React.Fragment>
      <SiteNave {...this.props}></SiteNave>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
