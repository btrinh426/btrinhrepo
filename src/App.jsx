import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import Jumbo from "./components/Jumbo";
import Content from "./components/Content";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav />

          <main role="main">
            <Content />
            {/* <Route path="/Jumbo" exact component={Jumbo} /> */}
          </main>

          <Jumbo></Jumbo>

          <Route path="/jumbo" exact={true} component={Jumbo} />
          <Route
            path="/home"
            componentexact={true}
            render={() => <h1>This is the Home page.</h1>}
          ></Route>

          <Route
            path="/link"
            componentexact={true}
            render={() => <h1>This is the Link page.</h1>}
          ></Route>

          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
