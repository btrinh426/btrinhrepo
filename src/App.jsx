import React, { Component } from "react";
import { BrowserRouter, Route, Router, NavLink } from 'react-router-dom';
import "./App.css";
import SiteNav from "./components/SiteNav";
import Jumbo from "./components/Jumbo";
import Content from "./components/Content";
import Footer from "./components/Footer";



class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div>
            <header>
              <NavLink to="/siteNav">Go to Navbar  </NavLink>
              <NavLink to="/jumbo">Go to Jumbotron  </NavLink>
              <NavLink to="/content">Go to Content  </NavLink>
              <NavLink to="/footer">Go to Footer</NavLink>
            </header>
          </div>
          <Route path="/siteNav" component={SiteNav}></Route>
          <main role="main">
          <Route path="/jumbo" component={Jumbo}></Route>
          <Route path="/content" component={Content}></Route>
          </main>
          <Route path="/footer" component={Footer}></Route>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App;
