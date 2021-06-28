import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SiteNav from "./components/SiteNav";

import Footer from "./components/Footer";

import Product from "./components/Product";

import "./App.css";
import "rc-pagination/assets/index.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav />

          <main
            role="main"
            style={{
              marginTop: "220px",
              marginLeft: "100px",
              marginRight: "100px",
            }}
          >
            <Route path="/product" exact component={Product} />
          </main>

          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
