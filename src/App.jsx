import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import currentUser from "./services/homePageService";
//import signOutUser from "./services/homePageService";
import SiteNav from "./components/SiteNav";
import Jumbo from "./components/Jumbo";
//import Content from "./components/Content";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Friends from "./components/Friends";
import List from "./components/List";
import Products from "./components/Products";
import Update from "./components/Update";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  componentDidMount() {
    currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  }
  onCurrentUserSuccess = (response) => {
    console.log(response);
    //toast["success"]("Success!" + response); //not rendering ID
    // this.props.history.push("/jumbo");
  };

  onCurrentUserError = (err) => {
    console.log(err);
    this.props.history.push("/login");
  };
  render() {
    return (
      <React.Fragment>
        <SiteNav {...this.props}></SiteNav>
        <main role="main">
          <div className="container routes">
            <Route path="/jumbo" exact={true} component={Jumbo}></Route>
            <Route path="/login" exact={true} component={Login}></Route>
            <Route path="/register" exact={true} component={Register}></Route>
            <Route path="/friends" exact={true} component={Friends}></Route>
            <Route
              path="/list"
              exact={true}
              component={List}
              {...this.props}
            ></Route>
            <Route path="/products" exact={true} component={Products}></Route>
            <Route
              path="/update"
              exact={true}
              component={Update}
              {...this.props}
            ></Route>
          </div>
        </main>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
