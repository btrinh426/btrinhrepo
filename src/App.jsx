import React, { Component } from "react";
import SiteNav from "./Components/SiteNav";
// import Jumbo from "./Components/Jumbo";
import Login from "./Components/Login";
import { Route } from "react-router-dom";
import Content from "./Components/Content";
import Homepage from "./Components/Homepage";
import SideBar from "./Components/SideBar";
import Friend from "./Components/Friend";
import Friends from "./Components/Friends";
import Presidents from "./Components/Presidents";
// import SideBarHomepage from "./Components/SideBarHomepage";
// import * as userService from "./services/userService";
import "./App.css";
import { withRouter } from "react-router-dom";


class App extends Component {
  // componentDidMount() {
  //   const data = { email: "user@google.com", password: "Reactpassword123!", tenantId: "bootcamp2" };
  //   const payload = data;

  //   //... code omitted.

  //   userService.logIn(payload)
  //     .then(this.onSuccess)
  //     .catch(this.onError);
  // }

  // onSuccess = (response) => {
  //   console.log("I was clicked on", response, new Date());
  //   // do something
  // }

  // onError = (errResponse) => {
  //   console.log("There was an error on", errResponse, new Date());
  //   // do something
  // }
  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;
    console.log("App", { currentPath, previousPath })
  }

  render() {
    console.log("rendering app")
    return (
      <React.Fragment>
        <SiteNav></SiteNav>
        <main role="main">
          <div className="row">
            <SideBar></SideBar>
            <Route path="/" exact={true} component={Login}></Route>
            <Route path="/registration" exact={true} component={Content}></Route>
            {/*<Route path="/homepage" exact={true} component={SideBarHomepage}></Route>*/}
            <Route path="/friends/new" exact={true} component={Friend}></Route>
            <Route path="/friends/:friendId(\d+)/edit" exact={true} component={Friend}></Route>
            <Route path="/friends" exact={true} component={Friends}></Route>
            <Route path="/presidents" exact={true} component={Presidents}></Route>
            <Route path="/homepage" exact={true} component={Homepage}></Route>
            {/*<Jumbo></Jumbo>*/}
            {/*<Content></Content>*/}
          </div>
        </main>
      </React.Fragment>


      // <center>
      //     <NavLink to="/SiteNav">Render SiteNav </NavLink>
      //     <NavLink to="/Content">Render Jumbo </NavLink>
      //     <NavLink to="/Content">Render Content </NavLink>
      //     <NavLink to="/Footer">Render Footer </NavLink>
      //   </center>


      //   <Route path="/SiteNav" exact={true} component={SiteNav}></Route>
      //  <Route path="/Jumbo" exact={true} component={Jumbo}></Route>
      //   <Route path="/Content" exact={true} component={Content}></Route>
      //   <Route path="/Footer" exact={true} component={Footer}></Route>
    );
  }
}

export default withRouter(App);

