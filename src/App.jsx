import React, { Component } from "react";
import SiteNav from "./component/SiteNav";
import Footer from "./component/Footer";
import { NavLink, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import Register from "./component/user/Register";
import { BrowserRouter } from "react-router-dom";
import Login from "./component/user/Login";
import Friends from "./component/Friends";
import AddFriends from "./component/addFriends";
import UpdateFriend from "./component/UpdateFriend";
import Jobs from "./component/jobs";
import AddJob from "./component/AddJob";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SiteNav></SiteNav>

        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/AddFriend" component={AddFriends} />
          <Route path="/Register" component={Register} />

          <Route path="/friends/:friendId/edit" component={UpdateFriend} />

          <Route path="/Login" component={Login} />
          <Route path="/Jobs" component={Jobs} />
          <Route path="/AddJob" component={AddJob} />

          <Route path="/friends" component={Friends} exact />
          <Route
            path="/friends?friendName-:searchFriendName"
            component={Friends}
            exact
          />
        </Switch>
        <Footer></Footer>
      </BrowserRouter>
    );
  }
}

export default App;
