import React, { Component } from "react";

import "./App.css";
import SiteNav from "./components/SiteNav.jsx";
import Login from "./pages/Login.jsx";

import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Friends from "./components/Friends.jsx";
import Footer from "./components/Footer.jsx";
import { withRouter } from "react-router-dom";
import EditProfile from "./pages/EditProfile.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  state = { currentUser: {} };

  render() {
    return (
      <Router>
        <SiteNav />

        <Switch>
          {/* <Route
            path="/logout"
            Component={Logout}
            exact
            render={(routeProps) => (
              <Logout {...routeProps} user={this.state.currentUser} />
            )}
            /> */}
          <Route
            path="/people/:inputId/edit" // for going to edit
            Component={EditProfile}
            exact={true}
            render={(routeProps) => (
              <EditProfile {...routeProps} user={this.state.currentUser} />
            )}
          />

          <Route
            path="/people/new" // form to add a new person
            Component={EditProfile}
            render={(routeProps) => (
              <EditProfile {...routeProps} user={this.state.currentUser} />
            )}
          />

          <Route
            path="/login"
            Component={Login}
            render={(routeProps) => (
              <Login {...routeProps} user={this.state.currentUser} />
            )}
          />
          <Route
            path="/register"
            Component={Register}
            exact
            render={(routeProps) => (
              <Register {...routeProps} user={this.state.currentUser} />
            )}
          />
          <Route
            path="/people"
            Component={Friends}
            exact={true}
            render={(routeProps) => (
              <Friends {...routeProps} user={this.state.currentUser} />
            )}
          />
          <Route
            path="/"
            Component={Home}
            exact
            render={(routeProps) => (
              <Home {...routeProps} user={this.state.currentUser} />
            )}
          />
          {/* {...routeProps} cy pps fm Route Comp...{...this.props} ... cy pps fm Friends Comp...user={this.state.currentUser}  ...passing into Friends Comp a property from the state object
               cy pps (passed down) from Route Comp, cy pps from App Comp ... capture property of currentUser in state which, if changed, rerenders child Comps
                farthest right wins
                ajax call in App, which updates state in App/then passes down to children (Comp) users */}
        </Switch>

        <Footer />
      </Router>
    );
  }
}

export default withRouter(App); //you might use withRouter if the parent doesn't have router props
