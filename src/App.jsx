import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Friends from "./components/Friends";
import CreateFriend from "./components/CreateFriend";
import Jumbo from "./components/Jumbo";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import NavBar from "./components/NavBar";
import ProductForm from "./components/ProductForm";
import Register from "./components/Register";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <NavBar />
          <main style={{ marginTop: "80px" }}>
            <Route path="/" exact={true} component={Home} />
            <Route path="/content" exact={true} component={Content} />
            <Route
              path="/friends/createfriend"
              exact={true}
              component={CreateFriend}
            />
            <Route path="/friends" exact={true} component={Friends} />
            <Route path="/jumbo" exact={true} component={Jumbo} />
            <Route path="/login" exact={true} component={LogIn} />
            <Route path="/ProductForm" exact={true} component={ProductForm} />
            <Route path="/register" exact={true} component={Register} />
          </main>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
