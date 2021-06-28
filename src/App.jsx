import React, { Component } from "react";
import Login from "./LoginPage";
import Register from "./Register";
import GetFriends from "./getFriends";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>

       <Register {...this.props}/>
       <Login {...this.props}/>
       <GetFriends {...this.props}/>
      </React.Fragment>
    );
  }
}

export default App;