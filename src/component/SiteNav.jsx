import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SiteNav extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark sabio">
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
                <Link to="/Register">
                  <button className="nav-link link-button">
                    Register <span className="sr-only">(current)</span>
                  </button>
                </Link>
                <Link to="/Login">
                  <button className="nav-link link-button">
                    Login <span className="sr-only">(current)</span>
                  </button>
                </Link>
                <Link to="/Friends">
                  <button className="nav-link link-button">
                    Friends <span className="sr-only">(current)</span>
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">Link</button>
              </li>
              <li className="nav-item">
                <button className="nav-link disabled">Disabled</button>
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
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
export default SiteNav;
