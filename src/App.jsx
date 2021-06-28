import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SiteNav from "./components/SiteNav";
import Jumbo from "./components/Jumbo";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductForm from "./components/ProductForm";
//import Homepage from "./components/Homepage";
// import Test from "./components/Test";
import "./App.css";

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     loggedInStatus: "NOT-LOGGED-IN",
  //     user: {},
  //   };
  // }
  render() {
    return (
      <BrowserRouter>
        <SiteNav />
        <div style={{ marginTop: "80px" }}>
          <Route path="/jumbo" exact component={Jumbo}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/content" exact component={Content}></Route>
          <Route path="/addproduct" exact component={ProductForm}></Route>
          {/* <Route
            path="/"
            exact
            render={(props) => (
              <Homepage {...props} loggedInStatus={this.state.loggedInStatus} />
            )}
          ></Route> */}
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
