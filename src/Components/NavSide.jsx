import React from "react";
import { NavLink } from "react-router-dom";

class SideNav extends React.Component {
  // onHomeClicked = () => {
  //   console.log("Push me");
  //   this.props.history.push("/home/");
  // };

  // onRegisterClicked = () => {
  //   console.log("Push me");
  //   this.props.history.push("/register/");
  // };

  render() {
    // if we are logged in, add the extra class, else blank
    let extraClass = "text-holder";
    if (this.props.user.isLoggedIn) {
      extraClass = "isLoggedIn";
    } else {
      extraClass = "";
    }
    return (
      <React.Fragment>
        <div className={"sidenav " + extraClass}>
          {this.props.user.isLoggedIn && (
            <div className="card-user">
              <img
                src={this.props.user.avatarUrl}
                className="card-img-top"
                alt="Avatar"
              />
              {/* {this.props.user.isLoggedIn && ( */}
              <div className="card-body">
                <p className="card-text">
                  {this.props.user.firstName + " " + this.props.user.lastName}
                </p>
              </div>
              {/* )} */}
            </div>
          )}

          <h1 className="main navigation">Main Navigation</h1>
          {this.props.user.isLoggedIn === false && (
            <NavLink to="/home/">Home</NavLink>
          )}
          {this.props.user.isLoggedIn === true && (
            <NavLink to={"/home/" + this.props.user.tenantId}>Home</NavLink>
          )}
          <NavLink to="/friends/" type="FRIENDS">
            Friends
          </NavLink>
          <NavLink to="/blogs/">Blogs</NavLink>
          <NavLink to="/tech-companies/">Tech Companies</NavLink>
          <NavLink to="/jobs/">Jobs</NavLink>
          <NavLink to="/events/">Events</NavLink>
          <NavLink to="/register/">Register</NavLink>
        </div>
      </React.Fragment>
    );
  }
}
export default SideNav;
