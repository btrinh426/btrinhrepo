import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import NavbarTop from "./components/NavbarTop";
import NavbarSide from "./components/NavbarSide";
import Register from "./components/Register";
import Login from "./components/Login";
// import Friends from "./components/Friends";
// import Jobs from "./components/Jobs";
// import Events from "./components/Events";

import Footer from "./components/Footer";

class App extends Component {
  state = {
    currentUser: {},
  };

  componentDidMount() {
    console.log("Main App Class component mounted.");
    // this.handleClickAjaxCall();
  }

  render() {
    return (
      <BrowserRouter>
        <div id="myNavbarTop">
          <NavbarTop></NavbarTop>
        </div>
        <main className="row pl-0 ml-0" id="mainWindow" style={{ marginTop: "60px" }} role="main">
          <div className="col ml-0 pl-3 pt-3 pr-3 text-light" id="myNavbarSide">
            <NavbarSide></NavbarSide>
          </div>
          <Route
            path="/register"
            exact
            render={() => <Register currentUser={this.state.currentUser}></Register>}
          ></Route>
          <Route path="/login" exact component={Login}></Route>
          {/* <Route path="/friends" exact component={Friends}></Route>
          <Route path="/jobs" exact component={Jobs}></Route>
          <Route path="/events" exact component={Events}></Route> */}
          {/* <div>
            <button className="btn btn-secondary m-2 btn-lg" id="button_learnMore" onClick={this.handleClickJumbo}>
                Show Jumbo
            </button>
            <button className="btn btn-secondary m-2 btn-lg" id="button_learnMore" onClick={this.handleClickContent}>
              Show Content
            </button>
            <button className="btn btn-secondary m-2 btn-lg" id="button_ajaxCall" onClick={this.handleClickAjaxCall}>
                Make Ajax Call
            </button>
          </div>   */}
        </main>
        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

export default App;
