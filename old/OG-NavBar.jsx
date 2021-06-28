import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Imgs from "../services/ImageService.jsx";

class NavBar extends React.Component {
  //Nav handlers
  onHomeNavBarClicked = () => {
    console.log("onHomeNavBarClicked is firing");
    this.props.history.push("/");
  };
  onFriendsNavBarClicked = () => {
    console.log("onFriendsNavBarClicked is firing");
    this.props.history.push("/friends");
  };
  onBlogsNavBarClicked = () => {
    console.log("onBlogsNavBarClicked is firing");
    this.props.history.push("/blogs");
  };
  onTechCompaniesNavBarClicked = () => {
    console.log("onTechCompaniesNavBarClicked is firing");
    this.props.history.push("/techcompanies");
  };
  onJobsNavBarClicked = () => {
    console.log("onJobsNavBarClicked is firing");
    this.props.history.push("/jobs");
  };
  onEventsNavBarClicked = () => {
    console.log("onEventsNavBarClicked is firing");
    this.props.history.push("/events");
  };
  onRegisterNavBarClicked = () => {
    console.log("onRegisterNavBarClicked is firing");
    this.props.history.push("/register");
  };

  componentDidMount() {
    console.log("ComponentDidMount is firing from NavBar");
  }
  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate firing from NavBar");
  }

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
      console.log("if is firing from NavBar for logo render");
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
                onClick={this.onHomeNavBarClicked}
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
                      onClick={this.onFriendsNavBarClicked}
                    >
                      Friends
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="blogs"
                      onClick={this.onBlogsNavBarClicked}
                    >
                      Blogs
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="tech-companies"
                      onClick={this.onTechCompaniesNavBarClicked}
                    >
                      Tech Companies
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="jobs"
                      onClick={this.onJobsNavBarClicked}
                    >
                      Jobs
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="events"
                      onClick={this.onEventsNavBarClicked}
                    >
                      Events
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="register-user"
                      onClick={this.onRegisterNavBarClicked}
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
