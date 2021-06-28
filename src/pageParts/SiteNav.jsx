import React from "react";
//import * as userService from "../services/userService";
import { NavLink } from "react-router-dom";

//import LoginControl from "./LoginControl";

class SiteNav extends React.Component {
  /*state = {
    isLoggedIn: false,
  };*/

  componentDidMount() {
    console.log("NAv mounted");
    //console.log(this.props.isLoggedIn);
  }

  handleLoginClick = (e) => {
    console.log("Login clicked");
    this.props.history.push("/login");
  };

  handleLogoutClick = (e) => {
    console.log("logout clicked");
    this.props.logout();
    this.props.history.push("/home");
  };

  onClick = (e) => {
    console.log("getting in here");
    let newLocation = e.currentTarget.name;
    console.log(newLocation);
    this.props.history.push(newLocation);
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="navbar-brand">
              <NavLink to="/home" name="/home" onClick={this.onClick}>
                Home
              </NavLink>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {this.props.isLoggedIn ? (
                  <React.Fragment>
                    <li className="nav-item navbar-brand">
                      <NavLink
                        to="/friends"
                        name="/friends"
                        onClick={this.onClick}
                      >
                        Friends
                      </NavLink>
                    </li>
                    <li className="nav-item navbar-brand">
                      <NavLink to="/blogs" name="/blogs" onClick={this.onClick}>
                        Blogs
                      </NavLink>
                    </li>
                    <li className="nav-item navbar-brand">
                      <NavLink
                        to="/companies"
                        name="/companies"
                        onClick={this.onClick}
                      >
                        Tech Companies
                      </NavLink>
                    </li>
                    <li className="nav-item navbar-brand">
                      <NavLink to="/jobs" name="/" onClick={this.onClick}>
                        Jobs
                      </NavLink>
                    </li>
                    <li className="nav-item navbar-brand">
                      <NavLink
                        to="/events"
                        name="/events"
                        onClick={this.onClick}
                      >
                        Events
                      </NavLink>
                    </li>
                    <li className="nav-item navbar-brand">
                      <NavLink
                        to="/register"
                        name="/register"
                        onClick={this.onClick}
                      >
                        Register
                      </NavLink>
                    </li>
                  </React.Fragment>
                ) : (
                  <p></p>
                )}
              </ul>
            </div>
            {this.props.isLoggedIn ? (
              <button
                className="btn btn-outline-success"
                onClick={this.handleLogoutClick}
              >
                Log Out
              </button>
            ) : (
              <React.Fragment>
                <button
                  className="btn btn-outline-success"
                  name="loginClick"
                  onClick={this.handleLoginClick}
                >
                  Login
                </button>
              </React.Fragment>
            )}
            {/* <LoginControl isLoggedin={this.props.isLoggedIn} /> */}
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

// class LoginControl extends SiteNav {
//   constructor(props) {
//     super(props);
//     this.handleLoginClick = this.handleLoginClick.bind(this);
//     this.handleLogoutClick = this.handleLogoutClick.bind(this);
//   }

//   handleLoginClick() {
//     //this.setState({ isLoggedIn: true });
//     console.log("Login clicked");
//     this.props.history.push("/login");
//   }

//   handleLogoutClick() {
//     // this.setState({ isLoggedIn: false });
//     userService
//       .logUserOut()
//       .then(this.onLogoutSuccess)
//       .catch(this.onLogoutError);
//   }
//   onLogoutSuccess = (response) => {
//     console.log("you logged out");

//     this.setState(() => {
//       return {
//         isLoggedIn: false,
//       };
//     });
//   };

//   onLogoutError = (errResponse) => {
//     console.log("logout error");
//   };

//   render() {
//     const isLoggedIn = this.props.isLoggedIn;
//     console.log(this.props.isLoggedIn);
//     let button;
//     if (isLoggedIn) {
//       button = <LogoutButton onClick={this.handleLogoutClick} />;
//       console.log("in the true?");
//     } else {
//       button = <LoginButton onClick={this.handleLoginClick} />;
//     }

//     return <div>{button}</div>;
//   }
// }
// function LoginButton(props) {
//   return (
//     <button className="btn btn-outline-success" onClick={props.onClick}>
//       Login
//     </button>
//   );
// }

// function LogoutButton(props) {
//   return (
//     <button className="btn btn-outline-success" onClick={props.onClick}>
//       Log Out
//     </button>
//   );
// }
export default SiteNav;
