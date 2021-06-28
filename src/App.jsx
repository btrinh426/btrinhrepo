import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import SiteNav from "./Components/SiteNav";
import Register from "./Components/Register";
import Login from "./Components/Login";
import AddFriend from "./Components/AddFriend";
import Friends from "./Components/Friends";

import "./App.css";

class App extends Component {
  state = { currentUser: {} };

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <SiteNav></SiteNav>

          <Route path="/Register" exact={true} component={Register}></Route>
          <Route path="/Login" exact={true} component={Login}></Route>
          <Route path="/HomePage" exact={true} component={HomePage}></Route>
          <Route path="/Friends/Add" exact={true} component={AddFriend}></Route>
          <Route
            path="/Friends/:friendId/edit"
            exact={true}
            render={(routeProps) => (
              <AddFriend {...routeProps} user={this.state.currentUser} />
            )}
          ></Route>
          <Route path="/Friends" exact={true} component={Friends}></Route>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
