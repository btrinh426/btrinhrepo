import React, { Component } from "react";
import SiteNav from "./component/SiteNav";
import Footer from "./component/Footer";
import { NavLink, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import Register from "./component/user/Register";
import { BrowserRouter } from "react-router-dom";
import Login from "./component/user/Login";
import Friends from "./component/Friends";
import AddFriends from "./component/AddFriends";
import UpdateFriend from "./component/UpdateFriend";
import Jobs from "./component/Jobs";
import AddJob from "./component/AddJob";
import * as ProductService from "./services/productService";
import { toast } from "react-toastify";
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

          <Route path="/Login" component={Login} exact />
          <Route path="/Jobs" component={Jobs} exact />
          <Route path="/Jobs/form" component={AddJob} exact />
          <Route path="/Jobs/:jobId/edit" component={AddJob} exact />

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
