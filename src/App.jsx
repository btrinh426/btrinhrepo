import React, { Component } from "react";
import SiteNav from "./Components/SiteNav";
import Jumbo from "./Components/Jumbo";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import { Route } from "react-router-dom";
import "./App.css";
import Registration from "./Components/Registration";
import Test from "./Components/Test";
import Login from "./Components/Login";
import Home from "./Components/Home";
import SideBar from "./Components/SideBar";
// import Test3 from "./Components/Test3";
import ProductForm from "./Components/ProductForm";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SiteNav></SiteNav>
        <div style={{ marginTop: "125px" }}>
          <Route path="/Jumbo" exact={true} component={Jumbo}></Route>
          <Route path="/Content" exact={true} component={Content}></Route>
          <Route
            path="/Registration"
            exact={true}
            component={Registration}
          ></Route>
          <Route path="/Login" exact={true} component={Login}></Route>
          <Route path="/Test" exact={true} component={Test}></Route>
          <Route path="/Home" exact={true} component={Home}></Route>
          <Route path="/SideBar" exact={true} component={SideBar}></Route>
        </div>
        <Route path="/ProductForm" exact={true} component={ProductForm}></Route>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default App;
