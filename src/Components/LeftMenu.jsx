import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faBlog,
  faBuilding,
  faHandshake,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import userService from "../services/userService";

class LeftMenu extends React.Component {
  componentDidMount() {
    userService
      .getCurrentUser()
      .then(this.onGetCurrentuserSuccess)
      .catch(this.onGetCurrentUserFail);
  }

  onGetCurrentuserSuccess = () => {
    return;
  };

  onGetCurrentUserFail = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div
        className="col-lg-2 col-md-3 col-sm-3 bg-white border-right border-top"
        style={{ height: "800px", minwidth: "200px" }}
      >
        <div className="row pb-4 pt-3 ml-4 text-muted text-secondary m-0">
          Main Navigation
        </div>
        <NavLink to="/main">
          <div className="row ml-4 h6 pb-3">
            <div className="pr-3">
              <FontAwesomeIcon icon={faHome} />
            </div>
            Home
          </div>
        </NavLink>
        <NavLink to="/main/friends">
          <div className="row ml-4 h6 pb-3">
            <div className="pr-3">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            Friends
          </div>
        </NavLink>
        <div className="row ml-4 h6 pb-3">
          <div className="pr-3">
            <FontAwesomeIcon icon={faBlog} />
          </div>
          Blogs
        </div>
        <div className="row ml-4 h6 pb-3">
          <div className="pr-3">
            <FontAwesomeIcon icon={faBuilding} />
          </div>
          Companies
        </div>
        <NavLink to="/main/jobs">
          <div className="row ml-4 h6 pb-3">
            <div className="pr-3">
              <FontAwesomeIcon icon={faHandshake} />
            </div>
            Jobs
          </div>
        </NavLink>
        <NavLink to="/main/events">
          <div className="row ml-4 h6 pb-3">
            <div className="pr-3">
              <FontAwesomeIcon icon={faCalendarCheck} />
            </div>
            Events
          </div>
        </NavLink>
      </div>
    );
  }
}

export default LeftMenu;
