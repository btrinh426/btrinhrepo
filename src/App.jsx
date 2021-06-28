import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import SabioFooter from "./firstTask/Footer";
import TopNav from "./firstTask/SiteNav";
import JumTron from "./firstTask/Jumbo";
import MainCont from "./firstTask/Content";

import RegForm from "./starterTasks/NewRegForm";
import LoginForm from "./starterTasks/UserLogin";
import HomePage from "./starterTasks/HomePage";
import Friends from "./starterTasks/Friends";
import FriendCreate from "./starterTasks/CreateFriend";
import FriendCard from "./starterTasks/FriendCard";
import NewProduct from "./starterTasks/ProductAssessment";

import UpdateFriend from "./starterTasks/UpdateFriendForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <TopNav {...this.props} />

        <main role="main">
          <div className="container mt-5">
            <Route path="/content" exact={true} component={MainCont}></Route>
            <Route path="/homePage" exact={true} component={HomePage}></Route>
            <Route path="/friends" exact={true} component={Friends}></Route>
            <Route
              path="/friends/new"
              exact={true}
              component={UpdateFriend}
            ></Route>
            <Route
              path="/productAssessment"
              exact={true}
              component={NewProduct}
            ></Route>

            <Route
              path="/friends/:id/edit"
              exact={true}
              component={UpdateFriend}
            ></Route>
            <Route
              path="/userlogin"
              exact={true}
              {...this.props}
              component={LoginForm}
            ></Route>
            <Route path="/jumbo" exact={true} component={JumTron}></Route>
            <Route
              path="/registration"
              exact={true}
              component={RegForm}
            ></Route>
          </div>
        </main>
        <SabioFooter></SabioFooter>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
