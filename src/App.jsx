import React, { Component } from "react";
import Footer from "./Components/Footer";
import SiteNav from "./Components/SiteNav";
import Content from "./Components/Content";
import Jumbo from "./Components/Jumbo";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main role="main" style={{ marginTop: "120px" }}>
          <Route path="/jumbo" exact={true} component={Jumbo}></Route>
          <Route path="/content" exact={true} component={Content}></Route>
        </main>
        <SiteNav></SiteNav>
        <Jumbo></Jumbo>
        <Content></Content>
        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

export default App;
