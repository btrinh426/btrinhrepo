import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import Blogs from "./components/Blogs";
import Cars from "./components/Cars";
import Content from "./components/Content";
import Companies from "./components/Companies";
import Events from "./components/Events";
import Footer from "./components/Footer";
import Friends from "./components/Friends";
import Home from "./components/Home";
import Login from "./components/Login";
import Jobs from "./components/Jobs";
import Jumbotron from "./components/Jumbo";
import SiteNav from "./components/Navbar";
import Register from "./components/Register";
import AddFriend from "./components/AddFriend";
import AddJob from "./components/AddJob";

import "./App.css";
import "rc-pagination/assets/index.css";

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
            <Route path="/cars" component={Cars} />
            <Route path="/content" component={Content} />
            <Route path="/events" component={Events} />
            <Route path="/friends" component={Friends} />
            <Route path="/home" component={Home} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/job/add" component={AddJob} />
            <Route path="/jumbo" component={Jumbotron} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/friend/new" exact={true} component={AddFriend} />
            <Route
              path="/friend/:friendId(\d+)/edit"
              exact={true}
              component={AddFriend}
            />
            <Route path="/tech-companies" component={Companies} />
          </main>
        </>
        <Footer></Footer>
      </>
    );
  }
}

export default withRouter(App);
