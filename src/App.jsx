import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SiteNav from "./components/SiteNav";
import Registration from "./components/Registration"
import Login from "./components/Login"
import Jumbo from "./components/Jumbo";
import Content from "./components/Content";
import Product from "./components/Product";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css"

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SiteNav />
        <main role="main" style= {{marginTop: "120px"}}>
          <Route path="/registration" exact component={Registration} />
          <Route path="/login" exact component={Login} />
          <Route path="/jumbo" exact component={Jumbo} />
          <Route path="/content" exact component={Content} />
          <Route path="/product" exact component={Product} />
        </main>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
