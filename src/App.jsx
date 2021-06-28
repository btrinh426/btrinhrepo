import React, { Component } from "react";
import SiteNav from "./component/SiteNav";
import Footer from "./component/Footer";
import { NavLink, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import Register from "./component/user/Register";
import { BrowserRouter } from "react-router-dom";
import Login from "./component/user/Login";
import Friends from "./component/Friends";
import CreatFreinds from "./component/createFriends";
import UpdateFriend from "./component/UpdateFriend";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SiteNav></SiteNav>

        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/CreatFreinds" component={CreatFreinds} exact />
          <Route path="/Register" component={Register} />

          <Route path="/friends/:friendId/edit" component={UpdateFriend} />
          <Route path="/Login" component={Login} />
          <Route path="/Friends" component={Friends} />
        </Switch>
        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

export default App;
