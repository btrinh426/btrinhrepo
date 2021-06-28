import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
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
    console.log(response.data.item);
    let userData = response.data.item;
    //userData.roles = "admin";
    console.log(userData);
    this.setState((prevState) => {
      return { userData };
    });
  };
  onGetCurrentError = (err) => console.warn(err);

  routes = [
    {
      path: "/homepage",
      component: Homepage,
    },
    { path: "/register", component: RegisterNew },
    { path: "/events", component: Events },
    { path: "/friends", component: Friends },
    { path: "/friends/new", component: FriendFormNew },
    {
      path: "/friends/:id/edit",
      component: FriendFormNew,
    },
    { path: "/productform", component: ProductForm },
    { path: "/fileupload", component: FileUpload },
    { path: "/jobform/new", component: JobForm, adminOnly: true },
    { path: "/jobform/:id/edit", component: JobForm },
    { path: "/jobs", component: Jobs },
    { path: "/login", component: LoginNew },
  ];

  routeComponents = this.routes.map(({ path, component, adminOnly }, key) => (
    <Route
      exact
      path={path}
      component={component}
      key={key}
      adminOnly={adminOnly}
    />
  ));

  // userComponents = this.routeComponents.filter(
  //   (route) => route.adminOnly === undefined
  // );

  render() {
    return (
      <React.Fragment>
        <div>
          <Nav></Nav>
        </div>
        <main role="main" className="pt-5 mt-2">
          {this.routeComponents}
        </main>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
