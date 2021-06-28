import React, { Component } from "react";

import "./App.css";
import SiteNav from "./components/SiteNav.jsx";
import Login from "./pages/Login.jsx";
import JobsCreate from "./pages/JobsCreate";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Friends from "./components/Friends.jsx";
import Jobs from "./components/Jobs";
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
            path="/people/:personId(\d+)/edit" // for url nav to edit friend (\we want a digit, not a dog:)
            exact={true} //i need an exact match
            render={(routeProps) => (
              <EditProfile {...routeProps} user={this.state.currentUser} />
            )} // this is how we pass data into our component called EditProfile
          />
          {/* SEARCH...Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    in Friends (at App.jsx:52)
    in Route (at App.jsx:48) */}
          <Route
            path="/friends/"
            exact={true} //i need an exact match
            render={(routeProps) => (
              <Friends {...routeProps} user={this.state.currentUser} />
            )} 
          />

          <Route
            path="/people"
            exact={true}
            render={(routeProps) => (
              <Friends {...routeProps} user={this.state.currentUser} />
            )}
          />
          <Route
            path="/people/add" // form to add a new person
            render={(routeProps) => (
              <EditProfile {...routeProps} user={this.state.currentUser} />
            )}
          />

          <Route
            path="/login"
            render={(routeProps) => (
              <Login {...routeProps} user={this.state.currentUser} />
            )}
          />

          <Route
            path="/jobcreate"
            exact={true}
            render={(routeProps) => (
              <JobsCreate {...routeProps} user={this.state.currentUser} />
            )}
          />

          <Route
            path="/jobs"
            exact={true}
            render={(routeProps) => (
              <Jobs {...routeProps} user={this.state.currentUser} />
            )}
          />

          <Route
            path="/register"
            exact
            render={(routeProps) => (
              <Register {...routeProps} user={this.state.currentUser} />
            )}
          />

          <Route
            path="/home"
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
