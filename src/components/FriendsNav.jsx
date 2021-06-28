import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class FriendNav extends Component {
  state = { search: "" };

  onChange = (e) => {
    this.setState({ search: e.target.value });
  };
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark friendNav">
        <div className="container-fluid" />
        <a className="navbar-brand friends" href=" ">
          Friends
        </a>
        <NavLink to="/addoredit">
          <button className="btn btn-outline-success addFriend" type="submit">
            +Friend
          </button>
        </NavLink>
        <form className="d-flex" />
        <input
          className="form-control me-2 friendSearch"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={this.onChange}
        />
        <button className="btn btn-outline-success search" type="submit">
          Search
        </button>
      </nav>
    );
  }
}

export default FriendNav;
