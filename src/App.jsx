import React, { Component } from "react";
import {BrowserRouter, Route, NavLink} from "react-router-dom";
import SiteNav from "./components/siteNav";
import Jumbo from "./components/jumbo";
import Content from "./components/content";
import Footer from "./components/footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
        <NavLink to="/siteNav">SiteNav</NavLink>
        <Route path="/siteNav" exact={true} component={SiteNav}>
        {/* <SiteNav></SiteNav> */}
        </Route>
        <main role="main">
          <div>
            <NavLink to="/jumbo">Jumbo</NavLink>
            <Route path="/jumbo" exact={true} component={Jumbo}></Route>
            {/* <Jumbo></Jumbo> */}
          </div>
          <div>
            <NavLink to="/content">Content</NavLink>
            <Route path="/content" exact={true} component={Content}></Route>
            {/* <Content></Content> */}
          </div>
        </main>
        <NavLink to="/footer">Footer</NavLink>
        <Route path="/footer" exact={true} component={Footer}></Route>
        {/* <Footer></Footer> */}
      </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
