import React, { Component } from "react";
import Footer from "./components/footer";
import Homepage from "./components/Homepage";
import {withRouter, Route} from "react-router-dom";
import Form from "./components/RegisterForm";
import Login from "./components/Login";
import FriendsRegister from "./components/FriendsRegister";
import FriendsAll from "./components/FriendsAll";
import UserHome from "./components/UserHome";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Homepage/>
          <Route path="/" exact={true} />
          <Route path="/userhome" exact={true} component={UserHome}/>
          <Route path="/friendsall" exact={true} component={FriendsAll}/>
          <Route path="/friendsregister/:friendId/+d" exact={true} component={FriendsRegister}/>
          <Route path="/form" exact={true} component={Form} />
          <Route path="/login" exact={true} component={Login} />
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
