import React, { Component } from "react";
import Footer from "./Components/Footer";
import SiteNav from "./Components/SiteNav";
import Content from "./Components/Content";
import Jumbo from "./Components/Jumbo";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { logIn } from "./services/userServices";
import "./App.css";

class App extends Component {
  componentDidMount() {
    var payload = {
      email: "joe@example.com",
      password: "Testing1!@",
      tenantId: "U012YNYNGAW",
    };

    return logIn(payload);
  }

  render() {
    return (
      <BrowserRouter>
        <SiteNav />
        <main role="main">
          <Route path="/home" render={() => <Jumbo />}></Route>
          <Route
            path="/content"
            render={() => (
              <React.Fragment>
                <Jumbo />
                <Content />
              </React.Fragment>
            )}
          ></Route>
        </main>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
