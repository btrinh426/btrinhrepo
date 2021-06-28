import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import Blogs from "./components/Blogs";
import Content from "./components/Content";
import Companies from "./components/Companies";
import Events from "./components/Events";
import Footer from "./components/Footer";
import Friends from "./components/Friends";
import FriendsIndex from "./components/FriendsIndex";
import Home from "./components/Home";
import Login from "./components/Login";
import Jobs from "./components/Jobs";
import Jumbotron from "./components/Jumbo";
import SiteNav from "./components/Navbar";
import Register from "./components/Register";
import RegisterFriend from "./components/FriendsRegister";

import "./App.css";
import "rc-pagination/assets/index.css";
import ProductForm from "./components/ProductForm";

class App extends Component {
  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;
    console.log("App", { currentPath, previousPath });
  }
  render() {
    return (
      <>
        <nav className="NavLink mt-5">
          <SiteNav></SiteNav>
        </nav>
        <>
          <main role="main">
            <Route path="/blogs" component={Blogs} />
            <Route path="/content" component={Content} />
            <Route path="/events" component={Events} />
            <Route path="/friends" component={Friends} />
            <Route path="/friends-index" component={FriendsIndex} />
            <Route path="/home" component={Home} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/jumbo" component={Jumbotron} />
            <Route path="/login" component={Login} />
            <Route path="/product-form" component={ProductForm} />
            <Route path="/register" component={Register} />
            <Route path="/register-friend" component={RegisterFriend} />
            <Route path="/tech-companies" component={Companies} />
          </main>
        </>
        <Footer></Footer>
      </>
    );
  }
}

export default withRouter(App);
