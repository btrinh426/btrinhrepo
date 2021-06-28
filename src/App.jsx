import React, { Component } from "react";
import SiteNav from "./Components/SiteNav/SideNav";
import Navbar from "./Components/SiteNav/NavBar";
import Home from "./Components/Home/Home";
import Form from "./Components/Forms/Form";
import Login from "./Components/Forms/Login";
import LoggedIn from "./Components/Content/LoggedIn";
import Blogs from "./Components/Content/Blogs";
import Events from "./Components/Content/Events";
import Friends from "./Components/Content/Friends";
import RenderFriends from "./Components/Content/RenderFriends";
import Jobs from "./Components/Content/Jobs";
import Tech from "./Components/Content/Tech";
import Register from "./Components/Forms/Register";
//import Footer from "./Components/Footer/Footer";
import Content from "./Components/Content/Content";
import "rc-pagination/assets/index.css";
import { withRouter, BrowserRouter, Route, Switch } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <SiteNav />
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/Home" component={Home} />
          <Route path="/Form" component={Form} />
          <Route path="/Register" component={Register} />
          <Route path="/Content" component={Content} />
          <Route path="/LoggedIn" component={LoggedIn} />
          <Route path="/Blogs" component={Blogs} />
          <Route path="/Events" component={Events} />
          <Route path="/Friends/:friendId/edit" component={Friends} />
          <Route path="/Friends/new" component={Friends} />
          <Route path="/Jobs" component={Jobs} />
          <Route path="/Tech" component={Tech} />
          <Route path="/Friends/view" component={RenderFriends} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
