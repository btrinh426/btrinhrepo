import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer";
import "./App.css";
import NavBar from "./components/navbar";
import Jumbo from "./components/jumbo";
import Content from "./components/content";

class OldApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar />

          <main role="main">
            <Jumbo />
            <Content />
          </main>

          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default OldApp;
