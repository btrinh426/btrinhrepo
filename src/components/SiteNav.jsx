import React, { Component } from "react";
import { Link } from "react-router-dom";
class SiteNav extends Component {
  render() {
    // constructor(props){
    //   super(props)
    // }
    return (
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
              <Link to="/" className="nav-link link-button">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/jumbo" className="nav-link link-button">
                People
              </Link>
            </li>  */}
            {!this.props.user && (
              <li className="nav-item">
                <Link to="/registration" className="nav-link link-button">
                  Registration
                </Link>
              </li>
            )}
            {!this.props.user && (
              <li className="nav-item">
                <Link to="/login" className="nav-link link-button">
                  Login
                </Link>
              </li>
            )}
            {this.props.user && (
              <li className="nav-item">
                <Link to="/logout" className="nav-link link-button">
                  Logout
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/friends" className="nav-link link-button">
                Friends
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blogs" className="nav-link link-button">
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/techCompanies" className="nav-link link-button">
                Tech Companies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/jobs" className="nav-link link-button">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className="nav-link link-button">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/productForm" className="nav-link link-button">
                productForm
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/houses" className="nav-link link-button">
                Houses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/addOrEditHouses" className="nav-link link-button">
                Add or Edit Houses
              </Link>
            </li>

            {this.props.user && (
              <li className="nav-item">
                <Link to="/addoreditfriends" className="nav-link link-button">
                  Add or Edit Friends
                </Link>
              </li>
            )}

            {this.props.user && (
              <li className="nav-item">
                <Link to="/addoreditjobs" className="nav-link link-button">
                  Add or Edit Jobs
                </Link>
              </li>
            )}

            {this.props.user && (
              <li className="nav-item">
                <Link
                  to="/addoredittechcompanies"
                  className="nav-link link-button"
                >
                  Add or Edit Tech Companies
                </Link>
              </li>
            )}

            {/* <li className="nav-item">
              <Link to="/carsPage" className="nav-link link-button">
                Cars Page
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/carsPractice" className="nav-link link-button">
                Cars Practice
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <button className="nav-link disabled">Disabled</button>
            </li> */}
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
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
              >
                Dropdown Example
                <span className="caret"></span>
              </button>
              {/* <ul className="dropdown-menu">
                <li>
                  <a href="#">Tech Companies</a>
                </li>
                <li>
                  <a href="#">CSS</a>
                </li>
                <li>
                  <a href="#">JavaScript</a>
                </li>
              </ul> */}
            </div>
          </form>
        </div>
      </nav>
    );
  }
}
export default SiteNav;
