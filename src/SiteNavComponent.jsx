import React from "react";
import {
  Route,
  NavLink,
  Link,
  Switch,
  BrowserRouter,
  withRouter,
} from "react-router-dom";
// import Register from "./Register";
// import Login from "./Login";
// import Logout from "./Logout";
import * as userService from "./services/userService";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

function SiteNavComponent(props) {
  // function goRegister() {

  //   <Route
  //                 path="/register"
  //                 exact={true}
  //                 component={Register}
  //                 // render={() => <Register></Register>}
  //               ></Route>

  // }

  //  componentDidUpdate(prevProps) {
  //     let currentPath = this.props.location.pathname;
  //     let previousPath = prevProps.location.pathname;

  //     console.log("App", { currentPath, previousPath });
  //   }

  function logoutClicked(e) {
    e.preventDefault();
    userService
      .getCurrentUsers()
      .then(onGetCurrentUsersSuccess)
      .catch(onGetCurrentUsersFail);
    // userService.logOut()
  }
  function onGetCurrentUsersSuccess() {
    userService.logOut().then(onLogOutSuccess).catch(onLogOutFail);
  }

  function onGetCurrentUsersFail() {
    Swal.fire("No users are logged in");
  }

  function onLogOutSuccess(response) {
    console.log(response);
    props.history.push("/login");
    Swal.fire("You've Successfully Logged Out");
  }

  function onLogOutFail(err) {
    console.error(err);
    props.history.push("/login");
    Swal.fire("You are already logged out");
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary sabio">
        <button className="link-button navbar-brand">Navbar</button>
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
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/">
                <button className="nav-link link-button">
                  Home <span className="sr-only">(current)</span>
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about">
                <button className="nav-link link-button">
                  About <span className="sr-only">(current)</span>
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register">
                <button className="nav-link link-button">Register</button>
              </Link>
            </li>
            <li className="nav-item">
              <NavLink to="/friends">
                <button className="nav-link link-button">Friends</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blogs">
                <button className="nav-link link-button">Blogs</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/techcompanies">
                <button className="nav-link link-button">Tech Companies</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/jobs">
                <button className="nav-link link-button">Jobs</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/events">
                <button className="nav-link link-button">Events</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login">
                <button className="nav-link link-button">Login</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/logout">
                <button
                  className="nav-link link-button"
                  onClick={logoutClicked}
                >
                  Logout
                </button>
                {/* <Route path="/logout" exact={true} component={Logout}></Route> */}
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="http://example.com"
                id="dropdown01"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdown01">
                <button className="dropdown-item  link-button">Action</button>
                <button className="dropdown-item link-button">
                  Another action
                </button>
                <button className="dropdown-item  link-button">
                  Something else here
                </button>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default SiteNavComponent;
