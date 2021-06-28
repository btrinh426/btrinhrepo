import React, { Component } from "react";
import SiteNav from "./Components/SiteNav";
import Jumbo from "./Components/Jumbo";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import { Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SiteNav></SiteNav>
        <div style={{ marginTop: "200px" }}>
          <Route path="/Jumbo" component={Jumbo}></Route>
          <Route path="/Content" exact={true} component={Content}></Route>
        </div>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default App;
