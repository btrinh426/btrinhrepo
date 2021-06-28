import React, { Component } from "react";

import "./App.css";

import Footer from "./components/Footer";

import SiteNav from "./components/SiteNav";

import Jumbo from "./components/Jumbo";

import FirstThreeCircles from "./components/Circles1-3";

import NextThreeCircles from "./components/Circles4-6";

import LastThreeCircles from "./components/Circles7-9";

import Login from "./components/Login";

import Register from "./components/Register";

import Friends from "./components/Friends";

import { withRouter } from "react-router-dom";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    console.log("App", { currentPath, previousPath });
  }

  render() {
    console.log("rendering app");
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav></SiteNav>
          <div></div>

          <main role="main">
            <div className="jumbotron">
              <div className="container">
                <Jumbo></Jumbo>
                {/* <h1 className="display-3">Hello, world!</h1>
              <p>
                This is a template for a simple marketing or informational
                website. It includes a large callout called a jumbotron and
                three supporting pieces of content. Use it as a starting point
                to create something more unique.
              </p>
              <p>
                <button className="btn btn-primary btn-lg">
                  Learn more &raquo;
                </button>
              </p> */}
              </div>
            </div>

            <div className="container">
              <div className="row">
                <Route
                  path="/Circles1-3"
                  exact={true}
                  component={FirstThreeCircles}
                ></Route>
                <Route
                  path="/Circles4-6"
                  exact={true}
                  component={NextThreeCircles}
                ></Route>
                <Route
                  path="/Circles7-9"
                  exact={true}
                  component={LastThreeCircles}
                ></Route>
                <Route path="/Login" exact={true} component={Login}></Route>
                <Route
                  path="/Register"
                  exact={true}
                  component={Register}
                ></Route>
                <Friends></Friends>
              </div>
              <hr />
            </div>
          </main>

          <footer className="container">
            <Footer></Footer>
            {/* <p>&copy; Sabio 2019-2020</p> */}
          </footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default withRouter(App);
