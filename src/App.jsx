import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SiteNav from "./SiteNav";
import Jumbo from "./Jumbo";
import Content from "./Content";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import Form from "./codechallenge/Form";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div>
            <Route path="/jumbo" exact={true} component={Jumbo}></Route>
            <Route path="/content" exact={true} component={Content}></Route>
            <Route path="/register" exact={true} component={Register}></Route>
            <Route path="/login" exact={true} component={Login}></Route>
            <Route path="/form" exact={true} component={Form}></Route>
          </div>
          <SiteNav style={{ position: "absolute" }}></SiteNav>

          <Footer></Footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
