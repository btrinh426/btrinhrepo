import React, { Component } from "react";
import Footer from "./pageParts/Footer";
import SiteNav from "./pageParts/SiteNav";
import Jumbo from "./pageParts/Jumbo";
import Content from "./pageParts/Content";
import * as userService from "./services/userService";


import "./App.css";

class App extends Component {

  componentDidMount(){
    console.log("inside componenet mount!");
    
    const data = {email: "tylerar@dukes.jmu.edu",
    password: "0Bubble$",
    tenantId: "U01LG539DPD"
    };

    //... code omitted.

    userService.logIn(data)
    .then(this.onActionSuccess)
    .catch(this.onActionError);

}

onActionSuccess = (response) => {
 console.log("it worked!");
}

onActionError= (errResponse) => {
 console.log("it didnt work");
}

  render() {
    return (
      <React.Fragment>
        <SiteNav></SiteNav>
       

        <main role="main">
          
          <Jumbo></Jumbo>
          <Content></Content>
        </main>

        <Footer className="container"></Footer>
      </React.Fragment>
    );
  }
}

export default App;
