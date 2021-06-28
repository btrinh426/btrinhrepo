import React from "react";
import { withRouter, Route, NavLink } from "react-router-dom";
import Home from "./services/Starter Components/Home";
import RegistrationForm from "./services/Starter Components/RegistrationForm";
import LoginForm from "./services/Starter Components/LoginForm";
import Jobs from "./services/Starter Components/Jobs";
import Blogs from "./services/Starter Components/Blogs";
import TechCo from "./services/Starter Components/TechCo";
import Friends from "./services/Starter Components/Friends";
import ProductForm from "./services/Starter Components/ProductForm";
import Cars from "./services/Starter Components/Cars";
import Logout from "./services/Starter Components/Logout";
import UserService from "./services/userService";
import AddFriends from "./services/Starter Components/AddFriends";
import { toast } from "react-toastify";

import "./App.css";
import Footer from "./Components/Footer";

class App extends React.Component {
  onLogOutClick = (e) => {
    UserService.logout().then(this.onLogOutSuccess).catch(this.onLogOutError);
  };

  onLogOutSuccess = () => {
    console.log("logout success");
    toast.success("Come back soon, we'll keep the dumpster lit for you.");
  };

  onLogOutError = () => {
    console.log("logout error");
    toast.error("Logout error! Who taught you to logout of things?!");
  };

  render() {
    return (
      <React.Fragment>
        <nav
          className="navbar navbar-expand-sm py-1 bg-dark navbar-dark"
          style={{
            padding: "20px",
            color: "white",
          }}
        >
          <h4
            style={{
              marginLeft: "10px",
              marginRight: "30px",
              textShadow: "4px 4px green",
            }}
          >
            DUMPSTER FIRE FRIENDS
          </h4>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <button type="button" className="nav-link link-button">
                  <NavLink to="/Home" style={{ color: "orange" }}>
                    HOME
                  </NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Friends" style={{ color: "orange" }}>
                    FRIENDS
                  </NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Blogs" style={{ color: "orange" }}>
                    BLOGS
                  </NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/TechCo" style={{ color: "orange" }}>
                    TECH COMPANIES
                  </NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Jobs" style={{ color: "orange" }}>
                    JOBS
                  </NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Events" style={{ color: "orange" }}>
                    EVENTS
                  </NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink
                    to="/ProductForm"
                    style={{
                      color: "orange",
                    }}
                  >
                    PRODUCTS
                  </NavLink>
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink
                    to="/Cars"
                    style={{
                      color: "orange",
                    }}
                  >
                    CARS
                  </NavLink>
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link link-button"
                  onClick={this.onLogOutClick}
                >
                  <NavLink
                    to="/Logout"
                    style={{
                      color: "white",
                    }}
                  >
                    LOGOUT
                  </NavLink>
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <Route path="/Home" exact={true} component={Home}></Route>
          <Route path="/LoginForm/" exact={true} component={LoginForm}></Route>
          <Route
            path="/RegistrationForm"
            exact={true}
            component={RegistrationForm}
          ></Route>
          <Route path="/Jobs" exact={true} component={Jobs}></Route>
          <Route path="/Blogs" exact={true} component={Blogs}></Route>
          <Route path="/TechCo" exact={true} component={TechCo}></Route>
          <Route path="/Friends" exact={true} component={Friends}></Route>
          <Route
            path="/ProductForm"
            exact={true}
            component={ProductForm}
          ></Route>
          <Route path="/Cars" exact={true} component={Cars}></Route>
          <Route path="/Logout" exact={true} component={Logout}></Route>
          <Route path="/AddFriends" exact={true} component={AddFriends}></Route>
        </div>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
