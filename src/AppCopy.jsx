import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SiteNav from "./components/Sitenav";
import Jumbo from "./components/Jumbo";
import Content from "./components/Content";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SiteNav />

        <main role="main">
          <Jumbo></Jumbo>
          <Route path="/jumbo" exact={true} component={Jumbo}></Route>

          <Content></Content>
          <Route path="/content" exact={true} component={Content}></Route>
        </main>

        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
