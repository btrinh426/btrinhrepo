import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./navigation/SiteNav";
import Login from "./components/pages/Login";
import Registration from "./components/Registration";
import Friends from "./components/pages/Friends";
import Blogs from "./components/Blogs";
import Techco from "./components/Techco";
import Jobs from "./components/pages/Jobs";
import Events from "./components/Events";
import Home from "./components/pages/Home";
import Footer from "./footer/Footer";
import { withRouter } from "react-router-dom";
import FriendForm from "./components/EditFriends";
import JobsForm from "./components/JobsForm";
import Cars from "./Assessment/Cars";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <>
        <Navigation></Navigation>

        <div>
          <Route path="/" exact={true} component={Home}></Route>
          <Route path="/friends" component={Friends}></Route>
          <Route path="/cars" component={Cars} />
          <Route path="/addfriend" exact={true} component={FriendForm}></Route>
          <Route
            path="/editfriend/:friendId(\d+)"
            exact={true}
            component={FriendForm}
          />
          <Route path="/blogs" component={Blogs}></Route>
          <Route path="/techco" component={Techco}></Route>
          <Route path="/jobs" component={Jobs}></Route>
          <Route path="/addjob" component={JobsForm} />
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
