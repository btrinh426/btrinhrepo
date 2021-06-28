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
import FriendForm from "./components/FriendForm";

import Products from "./components/Products";
//import Update from "./components/Update";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  componentDidMount() {
    currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  }
  onCurrentUserSuccess = (response) => {};
  onCurrentUserError = (err) => {
    console.log(err);
    this.props.history.push("/login");
  };
  render() {
    return (
      <React.Fragment>
        <SiteNav {...this.props}></SiteNav>
        <main role="main" style={{ marginTop: "120px" }}>
          <div className="container routes">
            <Route path="/jumbo" exact={true} component={Jumbo}></Route>
            <Route path="/login" exact={true} component={Login}></Route>
            <Route path="/register" exact={true} component={Register}></Route>
            <Route
              path="/friends"
              exact={true}
              component={Friends}
              {...this.props}
            ></Route>
            <Route
              path="/friends/:id/edit"
              exact={true}
              component={FriendForm}
              {...this.props}
            ></Route>
            <Route
              path="/friends/new"
              exact={true}
              component={FriendForm}
              {...this.props}
            />

            <Route path="/products" exact={true} component={Products}></Route>
          </div>
        </main>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
