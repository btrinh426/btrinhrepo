import React from "react";
import "./App.css";
import * as friendService from "./friendService";
import * as userService from "./userService";
import * as productService from "./productService";
import * as jobService from "./jobService";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import SiteNav from "./SiteNav";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LogInForm";
import Home from "./Home";
import CreateContact from "./CreateContact";
import Friends from "./Friends";
import CreateJob from "./CreateJob";
import Jobs from "./Jobs";
import Cars from "./Cars";
//import SingleFriend from "./SingleFriend";
// import EditContact from "./EditContact";
import Footer from "./Footer";
import { withRouter } from "react-router-dom";
import ProductForm from "./ProductForm";

class App extends React.Component {
  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    console.log("App", { currentPath, previousPath });
  }

  render() {
    return (
      <React.Fragment>
        <SiteNav />
        <div style={{ marginTop: "80px " }}>
          <Route
            path="/registerform"
            exact={true}
            component={RegisterForm}
          ></Route>

          <Route path="/loginform" exact={true} component={LogInForm}></Route>

          <Route path="/home" exact={true} component={Home}></Route>

          <Route path="/friends" exact={true} component={Friends}></Route>

          <Route
            path="/friends/new"
            exact={true}
            component={CreateContact}
          ></Route>

          <Route
            path="/friends/:id/edit"
            exact={false}
            component={CreateContact}
          ></Route>

          <Route path="/jobs" exact={true} component={Jobs}></Route>

          <Route path="/jobs/new" exact={true} component={CreateJob}></Route>

          <Route
            path="/jobs/:id/edit"
            exact={false}
            component={CreateJob}
          ></Route>

          <Route
            path="/productform"
            exact={true}
            component={ProductForm}
          ></Route>

          <Route path="/cars" exact={true} component={Cars}></Route>

          {/* <Route path="/cars/new" exact={true} component={Cars}></Route> */}
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);

/* <Route
                path="/fruits"
                exact={true}
                render={() => (
                  <WelcomeMessage
                    user={this.state.currentUser}
                    extra={"I Love routing"}
                    end="GoodBye."
                  ></WelcomeMessage>
                )}
              ></Route> */
