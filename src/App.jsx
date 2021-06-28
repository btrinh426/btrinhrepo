import React, { Component } from "react";
import SiteNav from "./Components/SiteNav";
import Jumbo from "./Components/Jumbo";
import Content from "./Components/Content";
import Footer from "./Components/Footer";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import Registration from "./Components/Registration";
import Test from "./Components/Test";
import Login from "./Components/Login";
import Home from "./Components/Home";
import SideBar from "./Components/SideBar";
import ProductForm from "./Components/ProductForm";
import ViewFriends from "./Components/ViewFriends";
import FriendForm from "./Components/FriendForm";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SiteNav></SiteNav>
        <div style={{ marginTop: "125px" }}>
          <div className="container-fluid">
            <div className="row flex-xl-nowrap">
              <SideBar {...this.props}></SideBar>
              <main
                className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content"
                role="main"
              >
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

                <Route
                  path="/ProductForm"
                  exact={true}
                  component={ProductForm}
                ></Route>
                <Route
                  path="/Friends"
                  exact={true}
                  component={ViewFriends}
                ></Route>
                <Route
                  path="/AddNewFriend"
                  exact={true}
                  component={FriendForm}
                ></Route>
                <Route
                  path="/EditFriend/:friendId(\d+)" //only accepts numbers as a prameter
                  exact={true}
                  component={FriendForm}
                ></Route>
              </main>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
