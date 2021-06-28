import React from "react";
// import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function NavbarSide() {
  const clickHomeButton = (e) => {
    e.preventDefault();
    console.log("Clicked home link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath != "") {
      window.location.assign("/");
    }
  };

  const clickFriendsButton = (e) => {
    e.preventDefault();
    console.log("Clicked Friends link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath != "friends") {
      window.location.assign("/friends");
    }
  };

  const clickBlogsButton = (e) => {
    e.preventDefault();
    console.log("Clicked Blogs link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath != "blogs") {
      window.location.assign("/blogs");
    }
  };

  const clickTechCompaniesButton = (e) => {
    e.preventDefault();
    console.log("Clicked Tech Companies link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath != "techCo") {
      window.location.assign("/techCo");
    }
  };

  const clickJobsButton = (e) => {
    e.preventDefault();
    console.log("Clicked Jobs link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath != "jobs") {
      window.location.assign("/jobs");
    }
  };

  const clickEventsButton = (e) => {
    e.preventDefault();
    console.log("Clicked Events link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath != "events") {
      window.location.assign("/events");
    }
  };

  const clickRegisterButton = (e) => {
    e.preventDefault();
    console.log("Clicked Register link.");
    const currentPath = window.location.href.split("/").pop();
    if (currentPath != "register") {
      window.location.assign("/register");
    }
  };

  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        <img
          className="card-img-top img-fluid"
          style={{ maxHeight: "10rem", maxWidth: "10rem", borderRadius: "100%" }}
          id="avatarSlot"
          src=""
          alt="Avatar caption"
        />
      </div>
      <div className="p-2" id="nameSlot" style={{ fontSize: "large", textAlign: "center" }}></div>
      <div className="pt-2 pb-2" style={{ fontSize: "large" }}>
        Main Navigation
      </div>
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Button color="link" className="nav-link text-light homeLink" onClick={clickHomeButton}>
            <span className="fas fa-home"></span> Home <span className="sr-only">(current)</span>
          </Button>
        </li>
        <li className="nav-item">
          <Button color="link" className="nav-link text-light friendsLink" onClick={clickFriendsButton}>
            <span className="fas fa-user-friends"></span> Friends
          </Button>
        </li>
        <li className="nav-item">
          <Button color="link" className="nav-link text-light blogsLink" onClick={clickBlogsButton}>
            <span className="fas fa-comments"></span> Blogs
          </Button>
        </li>
        <li className="nav-item">
          <Button color="link" className="nav-link text-light companiesLink" onClick={clickTechCompaniesButton}>
            <span className="fas fa-globe"></span> Tech Companies
          </Button>
        </li>
        <li className="nav-item">
          <Button color="link" className="nav-link text-light jobsLink" onClick={clickJobsButton}>
            <span className="fas fa-briefcase"></span> Jobs
          </Button>
        </li>
        <li className="nav-item">
          <Button color="link" className="nav-link text-light eventsLink" onClick={clickEventsButton}>
            <span className="fas fa-calendar-alt"></span> Events
          </Button>
        </li>
        <li className="nav-item">
          <Button
            color="link"
            className="nav-link text-light registerLink"
            style={{ fontStyle: "italic" }}
            onClick={clickRegisterButton}
          >
            <span className="fas fa-star"></span> Register New User
          </Button>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default NavbarSide;
