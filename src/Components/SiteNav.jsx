import React from "react";
import { Route, NavLink } from "react-router-dom";
import Home from "../services/Starter Components/Home";
import RegistrationForm from "../services/Starter Components/RegistrationForm";
import LoginForm from "../services/Starter Components/LoginForm";
import Jobs from "../services/Starter Components/Jobs";
import Blogs from "../services/Starter Components/Blogs";
import TechCo from "../services/Starter Components/TechCo";
import Friends from "../services/Starter Components/Friends";
import ProductForm from "../services/Starter Components/ProductForm";
import Logout from "../services/Starter Components/Logout";

class SiteNav extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav
          className="navbar navbar-expand-sm bg-dark navbar-dark"
          style={{
            padding: "20px",
          }}
        >
          <h5>DUMPSTER FIRE FRIENDS</h5>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <button type="button" className="nav-link link-button">
                  <NavLink to="/Home">HOME</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Friends">FRIENDS</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Blogs">BLOGS</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/TechCo">TECH COMPANIES</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Jobs">JOBS</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Events">EVENTS</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/ProductForm">PRODUCTS</NavLink>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">
                  <NavLink to="/Logout">LOGOUT</NavLink>
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <Route path="/Home" exact={true} component={Home}></Route>
          <Route path="/LoginForm" exact={true} component={LoginForm}></Route>
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
          <Route path="/Logout" exact={true} component={Logout}></Route>
        </div>
      </React.Fragment>
    );
  }
}

export default SiteNav;

/*
import React from "react";

class PageNavigation extends React.Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark sabio" />
        <button className="link-button navbar-brand">NAVBAR</button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto" />
          <li className="nav-item active">
            <button className="nav-link link-button">
              HOME <span className="sr-only">(current)</span>
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link link-button">FRIENDS</button>
          </li>
          <li className="nav-item">
            <button className="nav-link link-button">BLOGS</button>
          </li>
          <li className="nav-item">
            <button className="nav-link disabled">TECH CO.</button>
          </li>
          <li className="nav-item">
            <button className="nav-link disabled">JOBS</button>
          </li>
          <li className="nav-item">
            <button className="nav-link disabled">EVENTS</button>
          </li>
          <li className="nav-item">
            <button className="nav-link disabled">REGISTER</button>
          </li>
          <li className="nav-item">
            <button className="nav-link disabled">LOGOUT</button>
          </li>
        </div>
      </div>
    );
  }
}

export default PageNavigation;
*/
