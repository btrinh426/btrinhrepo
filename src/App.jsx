import React, { Component } from "react";

import "./App.css";
import Footer from "./components/Footer.jsx";
import Content from "./components/Content.jsx";
import Jumbo from "./components/Jumbo.jsx";
import SiteNav from "./components/SiteNav.jsx";

import About from "./components/About.jsx";
import Users from "./components/Users.jsx";
import Home from "./components/Home.jsx";
import {withRouter} from "react-router-dom";



import { BrowserRouter, NavLink, Route, Link, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SiteNav />

        <Jumbo />

        <BrowserRouter>
          <div>
            <NavLink className="p-1" to="./Page1.jsx">
              Goes to Page1 Class Component
            </NavLink>
            <a href="/something/else" className="p-3">
              an a tag = network/ page refresh`
            </a>
          </div>
          <div>
            <NavLink className="p-1" to="./Page2.jsx">
              Goes to Page2 Class Component
            </NavLink>
          </div>
          <div>
            <Route path="/something/else" component={Footer}></Route>
          </div>

          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home changes the url directly</Link>
                </li>
                <li>
                  <Link to="/about">About changes the url directly</Link>
                </li>
                <li>
                  <Link to="/users">Users changes the url directly</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>

        <Content />

        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
