import React, { Component } from "react";
import AddWidgetForm from "./components/AddWidgetForm";
import Widgets from "./components/Widgets"
import Cars from "./components/Cars"
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Route path="/widgets" exact={true} component={Widgets} />
        <Route path="/addwidget" exact={true} component={AddWidgetForm} />
        <Route path="/cars" exact={true} component={Cars} />

        <main role="main">

        </main>

        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
