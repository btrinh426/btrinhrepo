import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import SiteNav from "./components/SiteNav";
import Jumbo from "./components/Jumbo";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav />
          <main role="main">
            <Route path="/jumbo" exact component={Jumbo} />
            <Route path="/" exact component={Content} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
            <Route path="/home" exact component={Home} />
          </main>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
