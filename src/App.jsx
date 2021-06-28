import React, { Component } from "react";
import {BrowserRouter, Route} from "react-router-dom";
import NavigationBar from "./DocComponents/SiteNav";
import HelloWorld from "./DocComponents/Jumbo";
import MainContent from "./DocComponents/Content";
import CopyRight from "./DocComponents/Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
        <Route component={NavigationBar}></Route>
        <main role="main">
        <Route component={HelloWorld}></Route>
        <Route component={MainContent}></Route>
        </main>
        <Route component={CopyRight}></Route>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
