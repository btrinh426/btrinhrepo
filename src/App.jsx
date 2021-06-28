import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import HomePage from "./Components/HomePage";
import SiteNav from "./Components/SiteNav";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Friends from "./Components/Friends";
import FriendsList from "./Components/FriendsList";

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
          <div>/</div>
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

          <div>
            <center>
              <NavLink to="/Friends">Friends</NavLink>
            </center>
          </div>

          <div>
            <Route path="/Friends" exact={true} component={Friends}></Route>
          </div>

          <div>
            <center>
              <NavLink to="/FriendsList">Friends List</NavLink>
            </center>
          </div>

          <div>
            <Route
              path="/FriendsList"
              exact={true}
              component={FriendsList}
            ></Route>
          </div>

          <p></p>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
