import React, { Component } from "react";
// import Footer from "./components/Footer";
import SiteNav from "./components/SiteNav";
import { Route } from "react-router-dom";
import "./App.css";
import LogIn from "./components/LogIn";
import Registration from "./components/Registration";
import Home from "./components/Home";
import AddFriend from "./components/AddFriend";
import Friends from "./components/Friends";
import AddJob from "./components/AddJob";
import JobList from "./components/JobList";
// import Student from "./components/Student";
// import CodeTalk from "./components/CodeTalk";
import CodeTalkProps from "./components/CodeTalkProps";
import Cars from "./components/Cars";
import AddCar from "./components/AddCar";




class App extends Component {

  render() {
    return (
      <React.Fragment>
        <SiteNav />
        <main role="main">

          <Route path="/Registration" exact={true} component={Registration}></Route>
          <Route path="/LogIn" exact={true} component={LogIn}></Route>
          <Route path="/Home" exact={true} component={Home} ></Route>
          <Route path="/AddFriend" exact={true} component={AddFriend} ></Route>
          <Route path="/Friends" exact={true} component={Friends} ></Route>
          <Route path="/Friend/:id(\d+)/Edit" exact={true} component={AddFriend} ></Route>
          <Route path="/AddJob" exact={true} component={AddJob} ></Route>
          <Route path="/JobList" exact={true} component={JobList} ></Route>
          <Route path="/CodeTalkProps" exact={true} component={CodeTalkProps} ></Route>
          <Route path="/Cars" exact={true} component={Cars} ></Route>
          <Route path="/AddCar" exact={true} component={AddCar} ></Route>
          <Route path="/Car/:id(\d+)/Edit" exact={true} component={AddCar} ></Route>
        
        
          


        </main>
        
      </React.Fragment>
    );
  }
}

export default App;
