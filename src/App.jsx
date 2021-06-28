import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import SiteNav from "./components/SiteNav";
import Jumbo from "./components/Jumbo";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import "rc-pagination/assets/index.css";
import Register from "./components/Register";
import Login from "./components/Login";
import FriendForm from "./components/FriendForm";
import ProductForm from "./components/ProductForm";
import FriendsList from "./components/FriendsList";
import ProductList from "./components/ProductList";
import Cars from "./components/Cars";

class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <Route path="/siteNav" exact={true} component={SiteNav}></Route>
        <Route path="/jumbo" exact={true} component={Jumbo}></Route>
        <Route path="/register" exact={true} component={Register}></Route>
        <Route path="/login" exact={true} component={Login}></Route>
        <Route path="/footer" exact={true} component={Footer}></Route>
        <Route path="/welcome" exact={true} component={Welcome}></Route>
        <Route path="/FriendForm" exact={true} component={FriendForm}></Route>
        <Route path="/productForm" exact={true} component={ProductForm}></Route>
        <Route path="/friendsList" exact={true} component={FriendsList}></Route>
        <Route path="/productList" exact={true} component={ProductList}></Route>
        <Route path="/cars" exact={true} component={Cars}></Route>
      </BrowserRouter>
    );
  }
}

export default App;
