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
import Friends from "./components/friends/Friends";
import Cars from "./components/Cars";
import FriendsForm from "./components/friends/FriendsForm";
import "react-toastify/dist/ReactToastify.css"

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SiteNav />
        <main role="main" style= {{marginTop: "120px"}}>
          <Route path="/" exact component={Login} />
          <Route path="/homepage" exact component={HomePage} />
          <Route path="/friendsform" exact component={FriendsForm} />
          <Route path="/friends" exact component={Friends} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/jumbo" exact component={Jumbo} />
          <Route path="/content" exact component={Content} />
          <Route path="/product" exact component={Product} />
          <Route path="/cars" exact component={Cars} />
        </main>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
