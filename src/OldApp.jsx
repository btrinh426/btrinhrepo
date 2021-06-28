import React, { Component } from "react";
import Footer from "./Components/NewFooter";
import NavBar from "./Components/NewNavBar";
import { BrowserRouter } from "react-router-dom";
import "react-toastify";
import "./App.css";


class OldApp extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar></NavBar>
          <main role="main">
          </main>
          <Footer></Footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default OldApp;
