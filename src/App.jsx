import React, { Component } from "react";

import "./App.css";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import Jumbo from "./components/Jumbo";
import Content from "./components/Content";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SiteNav></SiteNav>

        <main role="main">

          <Jumbo></Jumbo>

          <Content></Content>
        </main>

        <Footer></Footer>

      </React.Fragment>
    );
  }
}

export default App;
