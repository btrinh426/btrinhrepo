import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import SiteNav from "./components/SiteNav";
import Jumbo from "./components/Jumbo";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";
import ProductForm from "./components/ProductForm";
import Friends from "./components/Friends";
import FriendCard from "./components/FriendCard";
import AddOrEditFriends from "./components/AddOrEditFriends";
import CarsCard from "./components/CarsCard";
import CarsFilter from "./components/CarsFilter";
import CarsSearch from "./components/CarsSearch";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav />
          <main role="main">
            <Route path="/jumbo" exact component={Jumbo} />
            <Route path="/" exact component={Content} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
            <Route path="/home" exact component={Home} />
            <Route path="/productForm" exact component={ProductForm} />
            <Route path="/friends" exact component={Friends} />
            <Route path="/carsCard" exact component={CarsCard} />
            <Route path="/carsSearch" exact component={CarsSearch} />
            <Route path="/carsFilter" exact component={CarsFilter} />
            <Route path="/friendCard" exact component={FriendCard} />

            <Route
              path="/addOrEditFriends"
              exact
              component={AddOrEditFriends}
            />
            <Route
              path="/friends/:id/edit"
              exact
              component={AddOrEditFriends}
            />
          </main>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
