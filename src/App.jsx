import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import FriendsDashboard from "./components/FriendsDashboard";
import FriendsAddOrEdit from "./components/FriendsAddOrEdit";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav />

          <main role="main">
            <Route
              path="/register"
              componentexact={true}
              component={Register}
            ></Route>

            <Route
              path="/login"
              componentexact={true}
              component={Login}
            ></Route>

            <Route path="/home" componentexact={true} component={Home}></Route>

            <Route
              path="/friends"
              componentexact={true}
              component={FriendsDashboard}
            ></Route>

            <Route
              path="/friends/add"
              componentexact={true}
              component={FriendsAddOrEdit}
            ></Route>
          </main>

          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
