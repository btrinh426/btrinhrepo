import React, { Component } from "react";
import "./App.css";
import * as userService from "./services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, NavLink, Link, Switch } from "react-router-dom";

class Home extends Component {
  //   state = {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: "",
  //     passwordConfirm: "",
  //     avatarURL: "",
  //     tenantId: "1423",
  //   };

  render() {
    return (
      <div>
        <h1 className="homeHeader">Welcome {this.props.fName.firstName}</h1>
      </div>
    );
  }
}

export default Home;
