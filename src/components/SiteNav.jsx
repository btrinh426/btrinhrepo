import React from "react";
import { NavLink } from "react-router-dom";

const SiteNav = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      aria-label="Tenth navbar example"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample08"
          aria-controls="navbarsExample08"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample08"
        >
          <ul className="navbar-nav">
            <NavLink to="/home" exact>
              <li className="nav-item nav-link active">Home</li>
            </NavLink>
            <NavLink to="/friends" exact>
              <li className="nav-item nav-link active">Friends</li>
            </NavLink>
            <NavLink to="/blogs" exact>
              <li className="nav-item nav-link active">Blogs</li>
            </NavLink>
            <NavLink to="/tech" exact>
              <li className="nav-item nav-link active">Tech Co.</li>
            </NavLink>
            <NavLink to="/jobs" exact>
              <li className="nav-item nav-link active">Jobs</li>
            </NavLink>
            <NavLink to="/events" exact>
              <li className="nav-item nav-link active">Events</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
