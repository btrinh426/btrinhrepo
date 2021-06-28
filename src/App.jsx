import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./SiteNav";
import Register from "./Register";
import Login from "./Login";
import Homepage from "./Homepage";
import Friends from "./Friends";
import FriendForm from "./FriendForm";
import Events from "./Events";
import ProductForm from "./ProductForm";
import FileUpload from "./FileUpload";
import JobForm from "./JobForm";
import Jobs from "./Jobs";
import LoginNew from "./Login2";
import RegisterNew from "./Register2";
import FriendFormNew from "./FriendForm2";
import Cars from "./Cars";
import * as userService from "./services/userService";

import "./App.css";

class App extends Component {
  state = {
    userData: {
      id: 0,
      name: "",
      roles: "",
      siteId: 0,
      tenantId: "",
    },
    routeComps: [],
    routes: [
      {
        path: "/homepage",
        component: Homepage,
      },
      {
        path: "/register",
        component: RegisterNew,
        role: "user",
        roles: ["user"],
      },
      {
        path: "/events",
        component: Events,
        role: "user",
        roles: ["user", "admin"],
      },
      { path: "/friends", component: Friends },
      { path: "/friends/new", component: FriendFormNew },
      {
        path: "/friends/:id/edit",
        component: FriendFormNew,
      },
      { path: "/productform", component: ProductForm },
      { path: "/fileupload", component: FileUpload },
      {
        path: "/jobform/new",
        component: JobForm,
        role: "user",
        roles: ["user", "admin", "anon"],
      },
      { path: "/jobform/:id/edit", component: JobForm },
      { path: "/jobs", component: Jobs },
      { path: "/login", component: LoginNew },
    ],
  };

  componentDidMount() {
    userService
      .currentUser()
      .then(this.onGetCurrentSuccess)
      .catch(this.onGetCurrentError);
  }

  componentDidUpdate(prevProps) {
    //let currentPath = this.props.location.pathname;
    //let previousPath = prevProps.location.pathname;
    //console.log({ currentPath, previousPath });
  }

  onGetCurrentSuccess = (response) => {
    let userData = response.data.item;
    console.log(userData);

    this.setState(
      (prevState) => {
        userData.roles = "admin";
        return { ...prevState, userData };
      },
      () => {
        let routeComps = this.state.routes.filter(
          (route) => route.role === "user"
        );
        // let routeComps = this.state.routes.filter((route) =>
        //   route.role.includes("user")
        // );
        // let routeIdea = this.state.routes.filter(
        //   (routes) => routes.roles.indexOf("user") >= 0
        // );
        console.log(routeComps);
        routeComps = routeComps.map(({ path, role, component }, key) => (
          <Route
            exact
            path={path}
            component={component}
            role={role}
            key={key}
          />
        ));
        console.log(routeComps);
        this.setState((prevState) => {
          return { ...prevState, routeComps };
        });
      }
    );
  };
  onGetCurrentError = (err) => console.warn(err);

  render() {
    return (
      <React.Fragment>
        <div>
          <Nav></Nav>
        </div>
        <main role="main" className="pt-5 mt-2">
          {this.state.routes && this.state.routeComps}
          {this.state.userData.roles && (
            <Route path="/cars" exact component={Cars}></Route> //this works
          )}
        </main>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
