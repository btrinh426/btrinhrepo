import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./navigation/SiteNav";
import Login from "./components/pages/Login";
import Registration from "./components/Registration";
import Friends from "./components/pages/Friends";
import Blogs from "./components/Blogs";
import Techco from "./components/Techco";
import Jobs from "./components/Jobs";
import Events from "./components/Events";
import Home from "./components/pages/Home";
import Footer from "./footer/Footer";
import { withRouter } from "react-router-dom";
import Edit from "./components/EditFriends";
import Widgets from "./Assessment/Widgets";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <>
        <Navigation></Navigation>
        <div className="container">
          <div className="row"></div>
        </div>
        <div>
          <Route path="/" exact={true} component={Home}></Route>
          <Route path="/friends" component={Friends}></Route>
          <Route path="/widgets" component={Widgets}></Route>
          <Route path="/addeditfriend" component={Edit} />
          <Route path="/blogs" component={Blogs}></Route>
          <Route path="/techco" component={Techco}></Route>
          <Route path="/jobs" component={Jobs}></Route>
          <Route path="/events" component={Events}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/registration" component={Registration}></Route>
        </div>
        <Footer></Footer>
      </>
    );
  }
}

export default withRouter(App);
