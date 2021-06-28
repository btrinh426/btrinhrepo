import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import Register from "./components/Register";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav />

          <main role="main">
            <Register />
          </main>

          <Route
            path="/register"
            componentexact={true}
            component={Register}
          ></Route>

          <Route
            path="/home"
            componentexact={true}
            render={() => <h1>This is the Home page.</h1>}
          ></Route>

          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
