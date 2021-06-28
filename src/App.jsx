import React, { Component } from "react";
import {BrowserRouter, Route, NavLink} from "react-router-dom";
import Footer from "./Footer";
import Nav from "./SiteNav";
import Register from "./Register";
import Login from "./Login";
import Homepage from "./Homepage";
import * as defaultContent from "./services/userService";

import "./App.css";

class App extends Component {

  componentDidMount(){
    // let payload = {
    //   "email": "sabiozac@example.com",
    //   "password": "Password!1",
    //   "tenantId": "U01HLGH2RKJ"
    // }
    
    // const onLoginSuccess = (response) =>
    // {
    //   console.log(response);
    // } 
    // const onLoginError = (response) =>
    // {
    //   console.warn({error: response})
    // }
    // defaultContent.logIn(payload)
    //   .then(onLoginSuccess)
    //   .catch(onLoginError);
  }



  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav></Nav>
        </div>
        <main role="main" className="pt-5 mt-2">
          <Route path="/register" exact component={Register} ></Route>
          <Route path="/login" exact component={Login} ></Route>
          <Route path="/homepage" exact component={Homepage} ></Route>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

export default App;
