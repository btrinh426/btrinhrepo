import React from "react";
// import App from "./App";

class SiteNav extends React.Component {
  state = {};

  onClickHome = (e) => {
    e.preventDefault();
    this.props.history.push("/home/");
  };

  render() {
    return (
      <React.Fragment>
        {/* <App></App> */}
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
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
                <button
                  className="nav-link link-button"
                  onClick={this.onClickHome}
                >
                  Home <span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item active">
                <button className="nav-link link-button">
                  Register <span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item active">
                <button className="nav-link link-button">
                  Friends <span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item active">
                <button className="nav-link link-button">
                  Events <span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item active">
                <button className="nav-link link-button">
                  Blogs <span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item active">
                <button className="nav-link link-button">
                  Jobs <span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item active">
                <button className="nav-link link-button">
                  Tech Companies <span className="sr-only">(current)</span>
                </button>
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
}

export default SiteNav;
