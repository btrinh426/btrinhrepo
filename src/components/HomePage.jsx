import React from "react";
import { toast } from "react-toastify";
import * as userService from "../services/userService";

import Friends from "./Friends";

class HomePage extends React.Component {
  onLogoutClicked = (e) => {
    e.preventDefault();
    userService.logOut().then(this.onSuccess).catch(this.onFailure);
    console.log("logout clicked");
  };
  onSuccess = () => {
    toast.primary("Logged out");
    this.props.history.push("/logout");
  };
  onFailure = () => {
    console.log("couldn't log out");
  };
  onLoginClicked = (e) => {
    e.preventDefault();
    this.props.history.push("/homepage");
  };
  onFriendsClicked = (e) => {
    this.props.history.push("/addfriend");
  };
  render() {
    return (
      <div className="container">
        <main>
          <button
            onClick={this.onFriendsClicked}
            className="btn btn-outline-success my-2 my-sm-1"
            type="submit"
          >
            Add Friend
          </button>
          <button
            onClick={this.onBlogsClicked}
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Blogs
          </button>
          <button
            onClick={this.onJobsClicked}
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Jobs
          </button>
          <button
            onClick={this.onEventsClicked}
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Events!
          </button>
          <button
            onClick={this.onTechCompaniesClicked}
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Tech Companies
          </button>

          <button
            onClick={this.onLogoutClicked}
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Logout
          </button>

          <h1>Welcome back{}</h1>
          <Friends></Friends>
        </main>
      </div>
    );
  }
}

export default HomePage;
