import React from "react";
import "./App.css";
import * as friendService from "./friendService";
import * as productService from "./productService";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import SiteNav from "./SiteNav";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LogInForm";
import Home from "./Home";
import CreateContact from "./CreateContact";
import Friends from "./Friends";
//import SingleFriend from "./SingleFriend";
import EditContact from "./EditContact";
import Footer from "./Footer";
import { withRouter } from "react-router-dom";
import ProductForm from "./ProductForm";

class App extends React.Component {
  render() {
    // const data = {
    //   email: "ledwynm@sabio.com",
    //   password: "Sabio1234!",
    //   tenantId: "U01KN0UH2DN",
    // };

    // friendService.logIn(data);

    return (
      <BrowserRouter>
        <SiteNav />
        <div style={{ marginTop: "80px " }}>
          <Route
            path="/RegisterForm"
            exact={true}
            component={RegisterForm}
          ></Route>

          <Route path="/LogInForm" exact={true} component={LogInForm}></Route>

          <Route path="/Home" exact={true} component={Home}></Route>

          <Route
            path="/CreateContact"
            exact={true}
            component={CreateContact}
          ></Route>

          <Route path="/Friends" exact={true} component={Friends}></Route>

          <Route
            path="/EditContact"
            exact={true}
            component={EditContact}
          ></Route>

          <Route
            path="/ProductForm"
            exact={true}
            component={ProductForm}
          ></Route>
        </div>
        <Footer />
      </BrowserRouter>
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
