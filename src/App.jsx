import React, { Component } from "react";
import { withRouter, Route, NavLink } from "react-router-dom";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Jumbo from "./components/Jumbo";
import SiteNav from "./components/SiteNav";
import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Friends from "./components/Friends";
import AddFriends from "./components/AddFriends";
import ProductForm from "./components/ProductForm";
import AddEditJobs from "./components/AddEditJobs";
import Jobs from "./components/Jobs";
import Cars from "./components/Cars";

import "./App.css";

class App extends Component {
  render() {
    console.log("App Rendering ...");

    return (
      // <BrowserRouter>  //** because App is already wrapped in BrowserRouter theu index.js
      <React.Fragment>
        <SiteNav {...this.props}></SiteNav>
        <hr />

        <main role="main">
          {/* <div className="text-center">
            <NavLink to="/jumbo"> Go To Jumbo</NavLink>
          </div>
          <div className="text-center">
            <NavLink to="/content"> Go To Content</NavLink>
          </div>
          <div className="text-center">
            <NavLink to="/login"> Go To Login</NavLink>
          </div>
          <div className="text-center">
            <NavLink to="/register"> Go To Register</NavLink>
          </div>
          <div className="text-center">
            <NavLink to="/"> Go to Home</NavLink>
          </div> */}
          {/* <div className="text-center">
            <NavLink to="/products"> Go to Product Form</NavLink>
          </div> */}
          <div className="text-center">
            <NavLink to="/cars"> Go to Cars</NavLink>
          </div>

          <hr />
          <Route path="/jumbo" exact={true} component={Jumbo}></Route>
          {/* when the code reaches these Route lines, it checks and if the path in the URL matches the path in R line, it changes the view to that! */}
          <Route path="/content" exact={true} component={Content}></Route>
          <Route path="/login" exact={true} component={Login}></Route>
          <Route path="/register" exact={true} component={Register}></Route>
          <Route path="/friends" exact={true} component={Friends}></Route>
          <Route path="/products" exact={true} component={ProductForm}></Route>
          <Route path="/cars" exact={true} component={Cars}></Route>
          <Route path="/jobs" exact={true} component={Jobs}></Route>
          <Route
            path="/add-friends"
            exact={true}
            component={AddFriends}
          ></Route>
          <Route
            path="/friends/:id(\d+)/edit"
            //* ":" works as a placeHolder
            exact={true}
            component={AddFriends}
          ></Route>
          <Route
            path="/add-editjobs"
            exact={true}
            component={AddEditJobs}
          ></Route>
          <Route
            path="/jobs/:id(\d+)/edit"
            exact={true}
            component={AddEditJobs}
          ></Route>
          <Route path="/" exact={true} component={Homepage}></Route>
        </main>
        <hr />
        <Footer />
      </React.Fragment>
      // </BrowserRouter>
    );
  }
}

export default withRouter(App);
