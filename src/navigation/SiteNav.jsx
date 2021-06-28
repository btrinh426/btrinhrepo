import React from "react";
import { NavLink } from "react-router-dom";
import Buttons from "../components/Buttons";

class siteNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      roles: "",
      tenantId: "",
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <button className="clearBtn">
          <NavLink to="/" className="link-button navbar-brand">
            NavBar
          </NavLink>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <button className="clearBtn">
                <NavLink to="/" className="nav-link link-button">
                  Home
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button className="clearBtn">
                <NavLink
                  to="/friends"
                  className="nav-link link-button btn-link"
                >
                  Friends
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button className="clearBtn">
                <NavLink to="/blogs" className="nav-link link-button">
                  Blogs
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button className="clearBtn">
                <NavLink to="/techco" className="nav-link link-button">
                  Tech Co.
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button className="clearBtn">
                <NavLink to="/jobs" className="nav-link link-button">
                  Jobs
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button className="clearBtn">
                <NavLink to="/events" className="nav-link link-button">
                  Events
                </NavLink>
              </button>
            </li>
          </ul>
          <div className="my-2 my-lg-0">
            <Buttons />
          </div>
        </div>
      </nav>
    );
  }
}

export default siteNav;
