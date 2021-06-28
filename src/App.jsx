import React from "react";
import { withRouter, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Home from "./Components/Home";
import Buttons from "./Components/Buttons";
import SiteNav from "./Components/SiteNav";
import Friends from "./Components/Friends";
import FriendsForm from "./Components/FriendsForm";
import Cars from "./Components/Cars"
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import debug from "sabio-debug";
import "./App.css";
const _logger = debug.extend("App");
const _loggerPage = _logger.extend("SPA");

class App extends React.Component {
  state = {
    currentUser: {
      isLoggedIn: false,
      userInfo: { firstName: "", lastName: "", email: "" },
    },
  };

  // static getDerivedStateFromProps(props, state) {
  //   let newState = null;

  //   let { state: propState } = props.location;
  //   if (propState)
  //     {
  //     if (propState.type === "LOGIN")
  //       {
  //       let currentUser = {
  //         userInfo: { ...propState.payload },
  //         isLoggedIn: true,
  //       };
  //       newState = { currentUser };
  //     }
  //     else if (propState.type === "LOGOUT" && state.currentUser.isLoggedIn)
  //       {
  //         let currentUser = { isLoggedIn: false }
  //         newState = { currentUser };
  //       }
  //     }
  //     return newState;
  //   };
  // componentDidUpdate(prevProps) {
  //   let currentPath = this.props.location.pathname;
  //   let previousPath = prevProps.location.pathname;
  //   console.log("App", { currentPath, previousPath });

  render() {
    return (
      <>
        <SiteNav {...this.props} currentUser={this.state.currentUser} />
        <main role="main">
          <div className="container">
            <Route
              path="/login"
              exact
              render={() => (
                <Login {...this.props} currentUser={this.state.currentUser} />
              )}
            />

            <Route 
              path="/homepage"
              render={(_props) => (
                <HomePage {...this._props} currentUser={this.state.currentUser} />
                                          
              )}
            />

            
            <Route path="/friends" exact component={Friends}{...this.props} />
            <Route path="/cars" exact component={Cars}{...this.props} />
            <Route path="/friends/:id/edit" exact component={FriendsForm} />
            <Route path="/friends/new" exact component={FriendsForm} />
            {/* <Route path="/register" component={Register} /> */}
            {/* <FriendsForm {...this.props} /> */}
            {/* <Buttons {...this.props} /> */}
            {/* <Home {...this.props} /> */}
            <Footer />
          </div>
        </main>
      </>
    );
  }
}
export default withRouter(App);
