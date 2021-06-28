import React from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../services/userService';
import "../Nav.css";

const Nav = () => {

    // const onLogOutClicked = () => {
    //   console.log(this.props)
    //   userService.logout()
    //   this.props.history.push('/login')
    // }

    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
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
                <Link to="/" className="nav-link link-button">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
               <Link to="/about" className="nav-link link-button">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link link-button">Product</Link>
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
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <Link className="dropdown-item" to='/pages/blogs'>Blogs</Link>
    <Link className="dropdown-item" to='/pages/events'>Events</Link>
    <Link className="dropdown-item" to='/pages/blogs'>Something else here</Link>
  </div>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link link-button">Signup</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link link-button">Login</Link>
            </li>
            <li className="nav-item">
              <button onClick={userService.logout} className="nav-link link-button">Log Out</button>
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
    );
  };
  
export default Nav;
