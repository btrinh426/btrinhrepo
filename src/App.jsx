import React, { Component } from "react";
import Footer from "./pageParts/Footer";
import SiteNav from "./pageParts/SiteNav";
import Friends from "./pageParts/Friends";
//import Content from "./pageParts/Content";
import Login from "./pageParts/Login";
//import * as userService from "./services/userService";
import { BrowserRouter, Route /*, NavLink*/ } from "react-router-dom";
import Home from "./pageParts/Home";
import Register from "./pageParts/Register";
import "./App.css";

class App extends Component {
  componentDidMount() {
    console.log("inside componenet mount!");

    /* const data = {
      email: "tylerar@dukes.jmu.edu",
      password: "0Bubble$",
      tenantId: "U01LG539DPD",
    };

    userService
      .logIn(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }

  onActionSuccess = (response) => {
    console.log("it worked!");
  };

  onActionError = (errResponse) => {
    console.log("it didnt work");*/
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SiteNav />

          <main
            role="main"
            style={{ backgroundImage: "url(/2.jpg)", backgroundSize: `cover` }}
          >
            <Route path="/home" exact={true} component={Home}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/friends" component={Friends}></Route>
            <Footer />
            add more Stuff
          </main>
        </div>
        {/* <div className="App">
          <div className="container">
            <SiteNav />
          </div>
          <div className="container" style={{ marginBottom: "100px" }}>
            <Route path="/home" component={Home}></Route> <hr />
            <div className="container">
              <Register />
            </div>
          </div>
          <div className="container">
            <Footer />
          </div>
    </div>*/}
      </BrowserRouter>
    );
  }
}

export default App;
