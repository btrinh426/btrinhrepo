import React from "react";
// import App from "./App";
import { NavLink } from "react-router-dom";

class SiteNav extends React.Component {
  state = {};

  onClickHome = (e) => {
    e.preventDefault();
    this.props.history.push("/home/");
  };

  render() {
    return (
      <React.Fragment>
        <nav
          className="navbar navbar-expand-md navbar-light  fixed-top"
          style={{ backgroundColor: "#40b3ff" }}
        >
          <button className="link-button navbar-brand">Sabio Warmup</button>
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
            {/* <div>
              <NavLink to="/jumbo"> Go to Jumbo</NavLink>
            </div>
            <div>
              <NavLink to="/content">Go to Content</NavLink>
            </div> */}
            <div style={{ marginLeft: "10px" }}>
              <NavLink to="/register">Register</NavLink>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <NavLink to="/login">Login</NavLink>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <NavLink to="/home">Home</NavLink>
            </div>

            <div style={{ marginLeft: "10px" }}>
              <NavLink to="/friends/new">Add</NavLink>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <NavLink to="/friends">Friends</NavLink>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <NavLink to="/cars">Cars</NavLink>
            </div>
            <form
              style={{ marginLeft: "655px" }}
              className="form-inline my-2 my-lg-0"
            >
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
