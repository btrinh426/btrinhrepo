import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Imgs from "../services/ImageService.jsx";

class NavBar extends React.Component {
  // onHomeNavBarClicked = (e) => {
  //   console.log("onHomeNavBarClicked is firing", e);
  //   this.props.history.push("/");
  // };
  // onFriendsNavBarClicked = (e) => {
  //   console.log("onFriendsNavBarClicked is firing", e);
  //   this.props.history.push("/friends");
  // };
  // onBlogsNavBarClicked = (e) => {
  //   console.log("onBlogsNavBarClicked is firing", e);
  //   this.props.history.push("/blogs");
  // };
  // onTechCompaniesNavBarClicked = (e) => {
  //   console.log("onTechCompaniesNavBarClicked is firing", e);
  //   this.props.history.push("/techcompanies");
  // };
  // onJobsNavBarClicked = (e) => {
  //   console.log("onJobsNavBarClicked is firing", e);
  //   this.props.history.push("/jobs");
  // };
  // onEventsNavBarClicked = (e) => {
  //   console.log("onEventsNavBarClicked is firing", e);
  //   this.props.history.push("/events");
  // };
  // onRegisterNavBarClicked = (e) => {
  //   console.log("onRegisterNavBarClicked is firing", e, e.currentTarget);

  //   let location = e.currentTarget.id;

  //   console.log("currentTarget", location);
  //   this.props.history.push(`/${location}`);
  // };

  onNavLinkClicked = (e) => {
    let location = e.currentTarget.id;

    this.props.history.push(`/${location}`);
  };

  onLogoutNavBarClicked = (e) => {
    e.preventDefault();
    console.log("onLogoutNavBarClicked is firing from NavBar", e);

    this.props.history.push("/login", { status: "logout" });
  };

  render() {
    let homeLogo = Imgs.logo;
    let setGreeting = "";
    let logButtonVisibility = "btn btn-sm btn-link d-none";
    let navBarVisibility = "col p-3 d-none";

    if (this.props.userImg.length > 0) {
      setGreeting = `Welcome - ${this.props.userName}`;
      homeLogo = this.props.userImg;
      logButtonVisibility = "btn btn-sm btn-link";
      navBarVisibility = "col p-3";
    }

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="p-3">
              <img
                id="user-img"
                style={{ height: "60px" }}
                src={homeLogo}
                alt="home"
                onClick={this.onNavLinkClicked}
              />
            </div>
            <div className={navBarVisibility}>
              <nav className="home">
                <ul className="nav">
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="friends"
                      onClick={this.onNavLinkClicked}
                    >
                      Friends
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="blogs"
                      onClick={this.onNavLinkClicked}
                    >
                      Blogs
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="techcompanies"
                      onClick={this.onNavLinkClicked}
                    >
                      Tech Companies
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="jobs"
                      onClick={this.onNavLinkClicked}
                    >
                      Jobs
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="events"
                      onClick={this.onNavLinkClicked}
                    >
                      Events
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="register"
                      onClick={this.onNavLinkClicked}
                    >
                      Register User
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="p-3">
              <span id="welcome-msg" className="p-2">
                {setGreeting}
              </span>
              <button
                type="button"
                className={logButtonVisibility}
                id="logout"
                onClick={this.onLogoutNavBarClicked}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
