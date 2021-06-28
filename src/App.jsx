import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom"; // also NavLinks when need

import "./App.css";
import NavBar from "./NavBar.jsx";
import Jumbo from "./Jumbo.jsx";
import Content from "./Content.jsx";
import Footer from "./Footer.jsx";
import { userLogin } from "./components/userService";
import Form from "./Form.jsx";

class App extends Component {
  componentDidMount() {
    userLogin();
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <NavBar />
          {/* <Route path="/navbar" exact={true} component={NavBar} /> */}

          <main role="main">
            <hr></hr>
            <hr></hr>
            <hr></hr>
            {/* <Route path="/content" exact={true} component={Content} /> */}
            <Content />
            <Route path="/jumbo" exact={true} component={Jumbo} />
            <Route path="/form" exact={true} component={Form} />
          </main>

          {/* <Route path="/footer" exact component={Footer} /> */}
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
