import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Events from "./pages/Events";
import AddFriend from "./pages/AddFriend";
import Friends from "./pages/Friends";
import Jobs from "./pages/Jobs";
import TechCompanies from "./pages/TechCompanies";

import "./App.css";

class App extends Component {
  state = {
    currentUser: {},
    isLoggedIn: false,
  };

  setCurrentUser = (user) => {
    this.setState({ currentUser: user });
  };

  render() {
    return (
      <Router>
        <Nav
          user={this.state.currentUser}
          setCurrentUser={this.setCurrentUser}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Home user={this.state.currentUser} exact />}
          />
          <Route path="/about" component={About} />
          <Route
            path="/products"
            render={(routeProps) => (
              <Products {...routeProps} user={this.state.currentUser} />
            )}
          />
          <Route
            path="/signup"
            render={(routeProps) => <Signup {...routeProps} />}
          />
          <Route
            path="/login"
            render={(routeProps) => (
              <Login {...routeProps} setCurrentUser={this.setCurrentUser} />
            )}
          />
          <Route path="/blogs" component={Blogs} />
          <Route path="/events" component={Events} />
          <Route path="/friends" exact component={Friends} />
          <Route
            path="/addFriend"
            render={(renderProps) => <AddFriend {...renderProps} />}
          />
          <Route
            path="/friends/:friendId/edit"
            render={(renderProps) => <AddFriend {...renderProps} />}
          />
          <Route path="/jobs" component={Jobs} />
          <Route path="/techCompanies" component={TechCompanies} />
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);
