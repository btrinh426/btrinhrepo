import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import "./App.css";

import FooterComponent from "./FooterComponent";
import SiteNavComponent from "./SiteNavComponent";
import JumboComponent from "./JumboComponent";
import ContentComponent from "./ContentComponent";
import * as userService from "./services/userService";

class App extends Component {
  componentDidMount() {
    console.log("componentDidMount");

    const data = {
      email: "user@example.com",
      password: "String1.1!",
      tenantId: "42",
    };

    userService
      .logIn(data)
      .then(function (data) {
        console.log("Login Success", data);
      })
      .catch(function (data) {
        console.warn(data);
      });

    console.log("componentDidMount end");
  }

  render() {
    console.log("rendering");
    return (
      <BrowserRouter>
        <React.Fragment>
          {/* <SiteNavComponent></SiteNavComponent> */}
          <div>
            <NavLink to="/sitenavcomponent">Show SiteNavComponent</NavLink>
          </div>
          <div>
            <Route
              path="/sitenavcomponent"
              exact={true}
              component={SiteNavComponent}
              // render={() => <SiteNavComponent></SiteNavComponent>}
            ></Route>
          </div>
          <main role="main">
            {/* <JumboComponent></JumboComponent> */}
            <div>
              <NavLink to="/jumbocomponent">Show JumboComponent</NavLink>
            </div>
            <div>
              <Route
                path="/jumbocomponent"
                exact={true}
                render={() => <JumboComponent></JumboComponent>}
              ></Route>
            </div>

            {/* <ContentComponent></ContentComponent> */}
            <div>
              <NavLink to="/contentcomponent">Show ContentComponent</NavLink>
            </div>
            <div>
              <Route
                path="/contentcomponent"
                exact={true}
                component={ContentComponent}
              ></Route>
            </div>
          </main>

          {/* <FooterComponent></FooterComponent> */}
          <div>
            <NavLink to="/footercomponent">Show FooterComponent</NavLink>
          </div>
          <div>
            <Route
              path="/footercomponent"
              exact={true}
              component={FooterComponent}
            ></Route>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
