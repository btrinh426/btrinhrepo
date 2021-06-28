import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import "./App.css";
import SiteNav from "./components/SiteNav";
import Jumbo from "./components/Jumbo";
// import Content from "./components/Content";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";

class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <div>
          {/* <Welcome /> */}
          <NavLink to="/">Go Home</NavLink>
          <Route path="/" exact={true} component={Welcome}></Route>
        </div>
        <div>
          {/* <SiteNav /> */}
          <NavLink to="/siteNav">Go to SiteNav</NavLink>
          <Route path="/siteNav" exact={true} component={SiteNav}></Route>
        </div>
        <div>
          {/* <Jumbo /> */}
          <NavLink to="/jumbo">Go to Jumbo</NavLink>
          <Route path="/jumbo" exact={true} component={Jumbo}></Route>
        </div>
        <div>
          {/* <Footer /> */}
          <NavLink to="/footer">Go to Footer</NavLink>
          <Route path="/footer" exact={true} component={Footer}></Route>
        </div>

      </BrowserRouter >
    );
  }
}

export default App;
