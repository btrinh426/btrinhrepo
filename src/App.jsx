import React, { Component } from "react";
import SiteNav from "./components/SiteNav";
import Jumbo from "./components/Jumbo";
import Content from "./components/Content";
import Footer from "./components/Footer";
import {BrowserRouter, Route, NavLink} from 'react-router-dom';

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav></SiteNav>
          
          <main role="main">
            <Jumbo></Jumbo>
            <Content></Content>
          </main>

          <Footer></Footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
