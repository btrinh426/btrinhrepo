import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import HomePage from "./Components/HomePage";
import SiteNav from "./Components/SiteNav";
import Register from "./Components/Register";
import Login from "./Components/Login";
import CreateFriends from "./Components/CreateFriends";
import FriendsList from "./Components/FriendsList";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <SiteNav></SiteNav>

          <div>
            <center>
              <NavLink to="/Login">Login</NavLink>
            </center>
          </div>

          <div>
            <center>
              <NavLink to="/HomePage">Home Page</NavLink>
            </center>
          </div>

          <div>
            <center>
              <NavLink to="/friend/create">Create a Friend</NavLink>
            </center>
          </div>

          <div>
            <center>
              <NavLink to="/FriendsList">Friends List</NavLink>
            </center>
          </div>
          <Route path="/Register" exact={true} component={Register}></Route>
          <Route path="/Login" exact={true} component={Login}></Route>
          <Route path="/HomePage" exact={true} component={HomePage}></Route>
          <Route
            path="/Friends/Create"
            exact={true}
            component={CreateFriends}
          ></Route>
          <Route
            path="/Friends/:friendId/edit"
            exact={true}
            component={CreateFriends}
          ></Route>
          <Route
            path="/FriendsList"
            exact={true}
            component={FriendsList}
          ></Route>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
