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
import mapingPractice from "./Components/mapingPractice";
import mappingPractice from "./Components/mappingPractice2";
// import Cars from "./Components/Cars";
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
                {/* <Cars></Cars> */}
                <Route path="/jumbo" exact={true} component={Jumbo}></Route>
                <Route path="/content" exact={true} component={Content}></Route>
                <Route
                  path="/registration"
                  exact={true}
                  component={Registration}
                ></Route>
                <Route path="/login" exact={true} component={Login}></Route>
                <Route path="/test" exact={true} component={Test}></Route>
                <Route path="/home" exact={true} component={Home}></Route>
                <Route path="/sidebar" exact={true} component={SideBar}></Route>

                <Route
                  path="/productform"
                  exact={true}
                  component={ProductForm}
                ></Route>
                <Route
                  path="/practice"
                  exact={true}
                  component={mapingPractice}
                ></Route>
                <Route
                  path="/practice2"
                  exact={true}
                  component={mappingPractice}
                ></Route>

                <Route
                  path="/friends"
                  exact={true}
                  component={ViewFriends}
                ></Route>
                <Route
                  path="/friends/new"
                  exact={true}
                  component={FriendForm}
                ></Route>
                <Route
                  path="/friends/:friendId(\d+)/edit" //only accepts numbers as a prameter
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
