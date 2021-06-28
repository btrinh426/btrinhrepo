import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Footer from "./Footer";
import SiteNav from "./SiteNav";
import Jumbo from "./Jumbo";
import Content from "./Content";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Friends from "./Friends";
import ProductForm from "./ProductForm";
// import * as userServices from "./services/userServices"

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav></SiteNav>
          <main role="main" style={{ marginTop: "80px" }}>
            <div></div>

            <div>
              <NavLink to="/jumbo"> Go to Jumbo</NavLink>
            </div>
            <div>
              <NavLink to="/content">Go to Content</NavLink>
            </div>
            <div>
              <NavLink to="/register">Register</NavLink>
            </div>
            <div>
              <NavLink to="/login">Login</NavLink>
            </div>
            <div>
              <NavLink to="/home">Home</NavLink>
            </div>
            <div>
              <NavLink to="/friends">Friends</NavLink>
            </div>
            <div>
              <NavLink to="/productForm">ProductForm</NavLink>
            </div>
          </main>
          <div>
            <Route path="/sitenav" exact={true} component={SiteNav}></Route>
            <Route path="/jumbo" exact={true} component={Jumbo}></Route>
            <Route path="/content" exact={true} component={Content}></Route>
            <Route path="/register" exact={true} component={Register}></Route>
            <Route path="/login" exact={true} component={Login}></Route>
            <Route path="/home" exact={true} component={Home}></Route>
            <Route path="/friends" exact={true} component={Friends}></Route>
            <Route
              path="/productForm"
              exact={true}
              component={ProductForm}
            ></Route>
          </div>
          <Footer></Footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
