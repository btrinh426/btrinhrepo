import React from "react";
import * as usersService from "../services/usersService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NavBar extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //     this.state = this.props.userStatus
  // }

  state = { isLoogedIn: true }
  
  onLogoutClicked = () => {
    //logout function
    usersService.logout().then(this.onLogoutSuccess).catch(this.onLogoutError);

    // let tempState = {...this.props.userStatus};
    // tempState = false;
    // this.setState(this.state.tempState)
    
  };
  onLogoutError = (response) => {
    console.log("onLogoutError is firing", response);

    let notify = () => toast.error('Unable to perform Logout', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

    notify();
  }
  onLogoutSuccess = (response) => {
    console.log("Logout Successful", response);
    
    let notify = () => toast.success('You have been logged out', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

    notify();

    this.props.history.push("/login");
    
  }

  //Nav handlers
  
  onHomeClicked = () => {
    console.log("onHomeClicked is firing");
    this.props.history.push("/home");
  };
  onFriendsClicked = () => {
    console.log("onFriendsClicked is firing");
    this.props.history.push("/friends");
  };
  onBlogsClicked = () => {
    console.log("onBlogsClicked is firing");
    this.props.history.push("/blogs");
  };
  onTechCompaniesClicked = () => {
    console.log("onTechCompaniesClicked is firing");
    this.props.history.push("/techcompanies");
  };
  onJobsClicked = () => {
    console.log("onJobsClicked is firing");
    this.props.history.push("/jobs");
  };
  onEventsClicked = () => {
    console.log("onEventsClicked is firing");
    this.props.history.push("/events");
  };
  onRegisterClicked = () => {
    console.log("onRegisterClicked is firing");
    this.props.history.push("/register");
  };
  onLoginClicked = () => {
    console.log("onLoginClicked is firing");
    this.props.history.push("/login");
  };

  componentDidUpdate(prevProps) {

    console.log("this is the update component firing")
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    console.log({ currentPath, previousPath });
  }

  render() {
    
    let passedImg = this.props.userImg
    
    console.log("passedImg", passedImg)

    if (this.props.userImg === "" ) {
      console.log("if is firing")
      passedImg = "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/112012/planet_express_vector_logo.png?itok=RYPde-2L";
    }

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="p-3">
                <img
                  id="user-img"
                  style={{ height: "60px" }}
                  src={passedImg}
                  alt="home"
                  onClick={this.onHomeClicked}
                />
            </div>
            <div className="col p-3">
              <nav className="home">
                <ul className="nav">
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="friends"
                      onClick={this.onFriendsClicked}
                    >
                      Friends
                    </button>
                  </li>
                  <li className="nav-item">
                  <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="blogs"
                      onClick={this.onBlogsClicked}
                    >
                      Blogs
                    </button>
                  </li>
                  <li className="nav-item">
                  <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="tech-companies"
                      onClick={this.onTechCompaniesClicked}
                    >
                      Tech Companies
                    </button>
                  </li>
                  <li className="nav-item">
                  <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="jobs"
                      onClick={this.onJobsClicked}
                    >
                      Jobs
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="events"
                      onClick={this.onEventsClicked}
                    >
                      Events
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="register-user"
                      onClick={this.onRegisterClicked}
                    >
                      Register User
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-sm btn-link"
                      id="login-user"
                      onClick={this.onLoginClicked}
                    >
                      Login
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="p-3">
              <span id="welcome-msg" className="p-2">Welcome {this.props.userName}</span>
              <button
                type="button"
                className="btn btn-sm btn-link"
                id="logout-user"
                onClick={this.onLogoutClicked}
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
