import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import ProductForm from "./components/ProductForm";
import FriendsForm from "./components/AddFriends";
import Friends from "./components/Friends";
import Footer from "./components/Footer";
import Cars from "./components/Cars";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <TopNavBar />
        <div style={{ marginTop: "80px" }}>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={RegisterForm}></Route>
          <Route path="/addproduct" exact component={ProductForm}></Route>
          <Route path="/home" exact component={Homepage}></Route>
          <Route path="/addfriend" exact component={FriendsForm}></Route>
          <Route path="/editfriend" exact component={FriendsForm}></Route>
          <Route path="/friends" exact component={Friends}></Route>
          <Route path="/cars" exact component={Cars}></Route>
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
