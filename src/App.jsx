import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import SiteNav from "./component/SiteNav";
//import Jumbo from "./component/Jumbo"
import Footer from "./component/Footer";
import Register from "./component/Register";
import Login from "./component/Login";
import "./App.css";
import UserNameDom from "./component/UserNameDom";
import Friends from "./component/Friends";
import Events from "./component/Events";
import AddUpdateFriends from "./component/AddUpdateFriends";
import Logout from "./component/Logout";

class App extends Component {
  state = {
    isLoggedIn: true,
  };
  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let prevPath = prevProps.location.pathname;
    console.log("DidUpdate App.jsx", { currentPath, prevPath });
    if (currentPath === "/login" && prevPath === "/logout") {
    }
  }
  render() {
    return (
      <React.Fragment>
        <SiteNav {...this.props} />
        <Switch>
          <Route path="/register" exact={true} component={Register}></Route>
          <Route path="/" exact={true} component={UserNameDom}></Route>
          <Route
            path="/login"
            exact={true}
            render={(props) => (
              <Login {...props} userLogin={this.state.isLoggedIn} />
            )}
          ></Route>
          <Route
            path="/logout"
            exact={true}
            render={(props) => (
              <Logout {...props} userLogout={this.state.isLoggedIn} />
            )}
          ></Route>
          <Route path="/friends" exact={true} component={Friends}></Route>
          <Route
            path="/friends/:friendId(\d+)/edit"
            component={AddUpdateFriends}
          ></Route>
          <Route path="/addfriend" component={AddUpdateFriends}></Route>
          <Route path="/friends" component={Friends}></Route>
          <Route path="/events" exact={true} component={Events}></Route>
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
