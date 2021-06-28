import React, { Component } from "react";
import SiteNav from "./Components/SiteNav/SiteNav";
import Jumbo from "./Components/Jumbo/Jumbo";
import Content from "./Components/Content/Content";
import Footer from "./Components/Footer/Footer";
import * as userService from "./services/UserService";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Delete from "./Components/Alerts/Delete";



import "./App.css";

class App extends Component {
  
  componentDidMount(){
    const data = {email: "mgcraig78@gmail.com", password: "1a$3TYx%4", tenantId: "U01GYCKSGAV"};
    userService.logIn(data)
    .then(this.onLoginSuccess)
    .catch(this.onLoginError);
  }
  
  render() {
    return (
        <React.Fragment>
        <Pagination />
        <SiteNav />
        <Jumbo />
        <Content />
        <Delete />
        <Footer />
        </React.Fragment>
    );
  }

  onLoginSuccess = (response)=>{
    console.log(response)
  }
  onLoginError = (errResponse)=>{
    console.log(errResponse)
  }
  
}


export default App;
