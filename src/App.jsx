import React, { Component } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import SiteNav from "./components/SiteNav";
import Friends from "./components/Friends";
import Blogs from "./components/Blogs";
import TechCos from "./components/TechCos";
import Jobs from "./components/Jobs";
import Events from "./components/Events";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Form from "./codechallenge/Form";
import Dashboard from "./components/Dashboard";
import FriendsForm from "./components/FriendsForm";
import Cars from "./assessment/Cars";
// import PublicHomePage from "./PublicHomePage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div style={{ marginTop: "60px" }}>
            {/* <Route exact path="/">
              {" "}
              {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
            </Route> */}
            <Route path="/dashboard" exact={true} component={Dashboard}></Route>
            <Route path="/friends" exact={true} component={Friends}></Route>
            <Route
              path="/friends/new"
              exact={true}
              component={FriendsForm}
            ></Route>
            <Route
              path="/friends/:friendId(\d+)"
              exact={true}
              component={FriendsForm}
            ></Route>
            <Route path="/blogs" exact={true} component={Blogs}></Route>
            <Route path="/techcos" exact={true} component={TechCos}></Route>
            <Route path="/jobs" exact={true} component={Jobs}></Route>
            <Route path="/events" exact={true} component={Events}></Route>
            <Route path="/register" exact={true} component={Register}></Route>
            <Route path="/login" exact={true} component={Login}></Route>
            <Route path="/form" exact={true} component={Form}></Route>
            <Route path="/cars" exact={true} component={Cars}></Route>
          </div>
          <SiteNav style={{ position: "absolute" }}></SiteNav>
          <Footer></Footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
