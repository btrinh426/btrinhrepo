import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavSite from "./components/NavSite";
import Form from "./components/Form";
import Cars from "./components/Cars";
import CarsMap from "./components/CarsMap";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <NavSite />
          <Route exact path="/cars" component={Cars} />
          <Route exact path="/form" component={Form} />
          <footer className="container">
            <p>&copy; Sabio 2019-2020</p>
          </footer>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
