import React, { Component } from "react";
import SiteNav from "./components/SiteNav";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Friends from "./components/Friend/Friends";
import FriendForm from "./components/FriendForm";
import Jobs from "./components/Jobs";
import JobForm from "./components/JobForm";

import Footer from "./components/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";

library.add(faStroopwafel);

class App extends Component {
  state = {
    name: "Mike",
  };

  handleName = (name) => {
    this.setState(() => ({ name }));
  };

  handleLogin = (user) => {
    //setStatre
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div>
            <SiteNav isLogged={this.state.isLogged} />
            <h1 style={{ paddingLeft: "325px" }}>{this.state.name}</h1>
          </div>
          <main role="main">
            <div className="container">
              {/* <Route
                path="/content"
                exact={true}
                render={(routeProps) => <Content {...routeProps} />}
              />  */}
              <Route
                path="/home"
                exact={true}
                render={(routeProps) => (
                  <Home {...routeProps} changeName={this.handleName} />
                )}
              />
              <Route
                path="/register"
                exact={true}
                render={(routeProps) => <Register {...routeProps} />}
              />
              <Route
                path="/login"
                exact={true}
                render={(routeProps) => <Login {...routeProps} />}
              />
              <Route
                path="/friends/:id/edit"
                exact={true}
                render={(routeProps) => <FriendForm {...routeProps} />}
              />
              <Route
                path="/friends/new"
                exact={true}
                render={(routeProps) => <FriendForm {...routeProps} />}
              />
              <Route
                path="/friends"
                exact={true}
                render={(routeProps) => <Friends {...routeProps} />}
              />
              {/* <Route
                path="/jobs/:id/edit"
                exact={true}
                render={(routeProps) => <JobForm {...routeProps} />}
              />
              <Route
                path="/jobs/new"
                exact={true}
                render={(routeProps) => <JobForm {...routeProps} />}
              />
              <Route
                path="/jobs"
                exact={true}
                render={(routeProps) => <Jobs {...routeProps} />}
              /> */}
              <hr />
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
