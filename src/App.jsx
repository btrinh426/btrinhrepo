import React, { Component } from "react";
import Footer from "./Components/Footer";
import SiteNav from "./Components/SiteNav";
import Content from "./Components/Content";
import Jumbo from "./Components/Jumbo";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Product from "./Components/Product";
import Cars from "./Components/Cars";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SiteNav />
        <main role="main" style={{ marginTop: "120px" }}>
          <Route path="/jumbo" exact={true} component={Jumbo}></Route>
          <Route path="/content" exact={true} component={Content}></Route>
          <Route path="/register" exact={true} component={Register}></Route>
          <Route path="/login" exact={true} component={Login}></Route>
          <Route path="/product" exact={true} component={Product}></Route>
        </main>
        <Cars />
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
