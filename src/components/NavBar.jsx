import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
        <button className="link-button navbar-brand">FriendshipWorld</button>
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
              <button className="nav-link link-button">
                Home <span className="sr-only">(current)</span>
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={this.onLoginClicked}
                className="nav-link link-button"
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link disabled">Register</button>
            </li>
            <div className="nav-item dropdown">
              {/* <a
                className="nav-link dropdown-toggle"
                id="dropdown01"
                href=""
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Professionals
              </a> */}
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
