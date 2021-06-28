import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserFriends,
  faComments,
  faGlobe,
  faBriefcase,
  faCalendarAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import debug from "sabio-debug";
const _logger = debug.extend("NavbarSide");

class NavbarSide extends Component {
  componentDidMount() {
    _logger("componentDidMount");
  }

  clickHomeButton = (e) => {
    e.preventDefault();
    // _logger("Clicked home link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath !== "") {
      this.props.history.push("/");
    }
  };

  clickFriendsButton = (e) => {
    e.preventDefault();
    // _logger("Clicked Friends link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath !== "friends") {
      this.props.history.push("/friends");
    }
  };

  clickBlogsButton = (e) => {
    e.preventDefault();
    // _logger("Clicked Blogs link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath !== "blogs") {
      this.props.history.push("/blogs");
    }
  };

  clickTechCompaniesButton = (e) => {
    e.preventDefault();
    // _logger("Clicked Tech Companies link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath !== "techCo") {
      this.props.history.push("/techCo");
    }
  };

  clickJobsButton = (e) => {
    e.preventDefault();
    // _logger("Clicked Jobs link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath !== "jobs") {
      this.props.history.push("/jobs");
    }
  };

  clickEventsButton = (e) => {
    e.preventDefault();
    // _logger("Clicked Events link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath !== "events") {
      this.props.history.push("/events");
    }
  };

  clickRegisterButton = (e) => {
    e.preventDefault();
    // _logger("Clicked Register link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath !== "register") {
      this.props.history.push("/register");
    }
  };

  render() {
    _logger("render");
    return (
      <React.Fragment>
        <div style={{ textAlign: "center" }}>
          <img
            className="card-img-top img-fluid"
            style={{ maxHeight: "10rem", maxWidth: "10rem", borderRadius: "100%" }}
            id="avatarSlot"
            src={this.props.currentUser.avatarUrl}
            alt="Avatar caption"
          />
        </div>
        <div
          className="p-2"
          id="nameSlot"
          style={{ fontSize: "large", textAlign: "center" }}
        >{`Welcome, ${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`}</div>
        <div className="pt-2 pb-2" style={{ fontSize: "large" }}>
          Main Navigation
        </div>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Button color="link" className="nav-link text-light homeLink" onClick={this.clickHomeButton}>
              <span>
                <FontAwesomeIcon icon={faHome} />{" "}
              </span>{" "}
              Home{" "}
            </Button>
          </li>
          <li className="nav-item">
            <Button color="link" className="nav-link text-light friendsLink" onClick={this.clickFriendsButton}>
              <span>
                <FontAwesomeIcon icon={faUserFriends} />{" "}
              </span>{" "}
              Friends{" "}
            </Button>
          </li>
          <li className="nav-item">
            <Button color="link" className="nav-link text-light blogsLink" onClick={this.clickBlogsButton}>
              <span>
                <FontAwesomeIcon icon={faComments} />{" "}
              </span>{" "}
              Blogs{" "}
            </Button>
          </li>
          <li className="nav-item">
            <Button color="link" className="nav-link text-light companiesLink" onClick={this.clickTechCompaniesButton}>
              <span>
                <FontAwesomeIcon icon={faGlobe} />{" "}
              </span>{" "}
              Tech Companies{" "}
            </Button>
          </li>
          <li className="nav-item">
            <Button color="link" className="nav-link text-light jobsLink" onClick={this.clickJobsButton}>
              <span>
                <FontAwesomeIcon icon={faBriefcase} />{" "}
              </span>{" "}
              Jobs{" "}
            </Button>
          </li>
          <li className="nav-item">
            <Button color="link" className="nav-link text-light eventsLink" onClick={this.clickEventsButton}>
              <span>
                <FontAwesomeIcon icon={faCalendarAlt} />{" "}
              </span>{" "}
              Events{" "}
            </Button>
          </li>
          <li className="nav-item">
            <Button
              color="link"
              className="nav-link text-light registerLink"
              style={{ fontStyle: "italic" }}
              onClick={this.clickRegisterButton}
            >
              <span>
                <FontAwesomeIcon icon={faStar} />{" "}
              </span>{" "}
              Register New User{" "}
            </Button>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
export default withRouter(NavbarSide);
