import React from "react";
import * as userService from "../services/userService";
import { BrowserRouter } from "react-router-dom";
import { withRouter } from "react-router-dom";
//import LoginControl from "./LoginControl";

class SiteNav extends React.Component {
  state = {
    isLoggedIn: false,
  };
  componentDidMount() {
    console.log("NAv mounted");

    userService
      .getCurrentUser()
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }

  onActionSuccess = (response) => {
    console.log("it worked!");

    this.setState(() => {
      return {
        isLoggedIn: true,
      };
    });
  };

  onActionError = (errResponse) => {
    console.log("youre not logged in - site nav");
  };

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="http://localhost:3000/home">
                Home
              </a>
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
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="http://localhost:3000/friends"
                    >
                      Friends
                    </a>
                  </li>
                  <li className="nav-item">Blogs</li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="http://localhost:1932/Starter%20Tasks/TechCompanies.html"
                    >
                      Tech Companies
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="http://localhost:1932/Starter%20Tasks/Jobs.html"
                    >
                      Jobs
                    </a>
                  </li>
                  <li className="nav-item">Events</li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="http://localhost:1932/Starter%20Tasks/Register.html"
                    >
                      Register
                    </a>
                  </li>
                </ul>
              </div>
              <LoginControl {...this.props} />
            </div>
          </nav>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
class LoginControl extends SiteNav {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick() {
    //this.setState({ isLoggedIn: true });
    console.log("Login clicked");
    this.props.history.push("/login");
  }

  handleLogoutClick() {
    // this.setState({ isLoggedIn: false });
    userService
      .logUserOut()
      .then(this.onLogoutSuccess)
      .catch(this.onLogoutError);
  }
  onLogoutSuccess = (response) => {
    console.log("you logged out");

    this.setState(() => {
      return {
        isLoggedIn: false,
      };
    });
  };

  onLogoutError = (errResponse) => {
    console.log("logout error");
  };

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return <div>{button}</div>;
  }
}
function LoginButton(props) {
  return (
    <button className="btn btn-outline-success" onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button className="btn btn-outline-success" onClick={props.onClick}>
      Log Out
    </button>
  );
}
export default withRouter(SiteNav);
