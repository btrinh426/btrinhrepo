import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import HomePage from "./Components/HomePage";
import SiteNav from "./Components/SiteNav";
import Register from "./Components/Register";
import Login from "./Components/Login";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div>
            <SiteNav></SiteNav>
          </div>
          <div></div>
          <br></br>
          <br></br>
          <div>
            /
            <center>
              <NavLink to="/Register">Register User</NavLink>
            </center>
          </div>
          <div>
            <Route path="/Register" exact={true} component={Register}></Route>
          </div>

          <div>
            <center>
              <NavLink to="/Login">Login</NavLink>
            </center>
          </div>

          <div>
            <Route path="/Login" exact={true} component={Login}></Route>
          </div>

          <p></p>

          <div>
            <center>
              <NavLink to="/HomePage">Home Page</NavLink>
            </center>
          </div>

          <div>
            <center>
              <Route path="/HomePage" exact={true} component={HomePage}></Route>
            </center>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
