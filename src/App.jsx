import React, { Component } from "react";
import SiteNav from "../src/Content/SiteNav";
import "./App.css";
//import SiteNav from "./Content/Footer";
import Footer from "./Content/Footer";
import Jumbo from "./Content/Jumbo";
import Content from "./Content/Content";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "../src/components/Login";
import Home from "../src/components/Home";
import {login} from "../src/services/appService"


class App extends Component {
  componentDidMount() {
    const payload = {
      email: "eduardo@sabiola.com",
      password: "Gomez2021!",
      tenantId: "U01LFUP9KB4",
    };
   

    login(payload)
    .then(this.onLoginSuccess)
    .catch(this.onLoginError);
  }
 
   
  
  onLoginSuccess = (Response) => console.log(Response);
  onLoginError = (errResponse) => console.warn(errResponse);
  
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            
              <SiteNav></SiteNav>
              
            </nav>
          </div>

          <main className="nav" role="main">
            
           
          
            
            {/* <Route path="/Jumbo" exact={true} component={Jumbo} /> */}
            {/* <Jumbo></Jumbo>  */}
            <div className="container form">
            <Route path="/register" exact={true} component={Register} />
            <Route path="/login" exact= {true} component={Login}/>
            <Route path="/home" exact={true} component={Home}/>
            </div>
            
            <div>
              <Route path="/Content" exact={true} component={Content} />
              {/* <Content></Content> */}
            </div>
          </main>
      <div className="footer">
          <Footer />
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
