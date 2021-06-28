import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import SiteNav from "./SiteNav";
import Jumbo from "./Jumbo";
import Content from "./Content";
import Footer from "./Footer";
import * as userService from "./userService";

import "./App.css";

class App extends React.Component {
  render() {
    // let onClickHandler = () => {
    const data = {
      email: "ledwynm@sabio.com",
      password: "Sabio1234!",
      tenantId: "U01KN0UH2DN",
    };

    userService.logIn(data);
    //   .then(this.onActionSuccess)
    //   .catch(this.onActionError);
    // //};

    // let onActionSuccess = (response) => {
    //   console.log("user logged in");
    // };

    // let onActionError = (response) => {
    //   console.log("failed to execute");
    // };

    return (
      <BrowserRouter>
        <div>
          <div>
            <NavLink to="/placeholder">Hello,</NavLink>
          </div>
          <div>
            <NavLink to="/placeholder">choose a Link below to begin.</NavLink>
          </div>

          <div>
            <NavLink to="/SiteNav">Go to SiteNav</NavLink>
          </div>
          <div>
            <NavLink to="/Jumbo">Go to Jumbo</NavLink>
          </div>
          <div>
            <NavLink to="/Content">Go to Content</NavLink>
          </div>
          <div>
            <NavLink to="/Footer">Go to Footer</NavLink>
          </div>
          {/* <div>
            <NavLink to="/userService">Log in</NavLink>
          </div> */}

          <Route
            path="/SiteNav"
            exact={true}
            render={() => <SiteNav></SiteNav>}
          ></Route>
          <Route
            path="/Jumbo"
            exact={true}
            render={() => <Jumbo></Jumbo>}
          ></Route>
          <Route
            path="/Content"
            exact={true}
            render={() => <Content></Content>}
          ></Route>

          <Route
            path="/Footer"
            exact={true}
            render={() => <Footer></Footer>}
          ></Route>

          {/* <Route
            path="/userService"
            exact={true}
            render={() => <userService></userService>}
          ></Route> */}

          {/* <SiteNav></SiteNav> */}
          {/* <Jumbo></Jumbo> */}
          {/* <Content></Content> */}
          {/* <Footer></Footer> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
