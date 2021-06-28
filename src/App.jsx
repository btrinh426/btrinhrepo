import React, { Component } from "react";
import * as userService from "./services/userService";
import { Route } from "react-router-dom";
import "./App.css";
import Form from "./Component/Form";
import Cars from "./Component/Cars";
import SiteNav from "./Component/SiteNav";
import { ToastContainer, toast } from "react-toastify";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <main role="main">
          <div>
            <Route path="/form" exact={true} component={Form}></Route>
            <Route path="/cars" exact={true} component={Cars}></Route>
          </div>
        </main>

        <footer className="container">
          <p>&copy; Sabio 2019-2020</p>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
