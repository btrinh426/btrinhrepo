import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import SiteNav from "./SiteNav";
import Footer from "./Footer";
import Jumbo from "./Jumbo";
import Content from "./Content";
import userService from "./services/userService"

class App extends Component {
  
  componentDidMount() {
    console.log("Main App Class component mounted.");

    this.handleClickAjaxCall();
  }
  
  handleClickAjaxCall = () => {
    console.log("Make Ajax call...");
    const userData = {
      email: "mjmiklos@yahoo.com",
      password: "Usmc7523!!",
      tenantId: "U01BMEA3V8V",
    };
    userService.userLogin(userData).then(this.onLoginSuccess).catch(this.onLoginError);
  }

  onLoginSuccess = (response) => {
    console.log("Successful login.");
    console.log(response)
    toast.success("Logged in!");
  }

  onLoginError = (error) => {
    console.error("Login error.");
    console.error(error);
    toast.error("Could not log in user.")
  }

  handleClickJumbo() {
    window.location.assign('http://localhost:3000/jumbo');
  }

  handleClickContent() {
    window.location.assign('http://localhost:3000/content');
  }

  render() {
    return (
      <BrowserRouter>
        <SiteNav></SiteNav>
        <main role="main" style={{"marginTop": '60px'}}>
          <div>
            <button className="btn btn-secondary m-2 btn-lg" id="button_learnMore"onClick={this.handleClickJumbo}>
                Show Jumbo
            </button>
              <button className="btn btn-secondary m-2 btn-lg" id="button_learnMore" onClick={this.handleClickContent}>
              Show Content
            </button>
            <button className="btn btn-secondary m-2 btn-lg" id="button_ajaxCall" onClick={this.handleClickAjaxCall}>
                Make Ajax Call
            </button>
          </div>
          <div>
            <Route path="/jumbo" exact component={Jumbo}></Route>
            <Route path="/content" exact component={Content}></Route>
          </div>
        </main>

        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

export default App;
