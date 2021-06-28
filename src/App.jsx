import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./SiteNav";
import Register from "./Register";
import Login from "./Login";
import Homepage from "./Homepage";
import Friends from "./Friends";
import FriendForm from "./FriendForm";
import FriendEdit from "./FriendEdit";
import Events from "./Events";
import ProductForm from "./ProductForm";
import FileUpload from "./FileUpload";
//import * as defaultContent from "./services/userService";

import "./App.css";

class App extends Component {
  componentDidMount() {
    // let payload = {
    //   "email": "sabiozac@example.com",
    //   "password": "Password!1",
    //   "tenantId": "U01HLGH2RKJ"
    // }
    // const onLoginSuccess = (response) =>
    // {
    //   console.log(response);
    // }
    // const onLoginError = (response) =>
    // {
    //   console.warn({error: response})
    // }
    // defaultContent.logIn(payload)
    //   .then(onLoginSuccess)
    //   .catch(onLoginError);
  }

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    //console.log({ currentPath, previousPath });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Nav></Nav>
        </div>
        <main role="main" className="pt-5 mt-2">
          <Route path="/register" exact component={Register}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/homepage" exact component={Homepage}></Route>
          <Route path="/events" component={Events}></Route>
          <Route path="/friends" exact component={Friends}></Route>
          <Route path="/friendform" component={FriendForm}></Route>
          <Route path="/friendedit" component={FriendEdit}></Route>
          <Route path="/productform" exact component={ProductForm}></Route>
          <Route path="/fileupload" exact component={FileUpload}></Route>
        </main>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
