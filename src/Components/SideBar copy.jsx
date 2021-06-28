import React, { Component } from "react";
import { usersService } from "../services/userService";
import { toast } from "react-toastify";

class SideBar extends Component {
  state = {
    currentUserData: {
      id: "",
      firstName: "Default firstName",
      email: "Default email",
      avatarUrl:
        "https://image.shutterstock.com/image-vector/universal-blank-profile-picture-avatar-600w-1654275940.jpg",
    },
  };

  onBtnClick = (e) => {
    console.log("I was clicked", e.currentTarget.id);
  };

  onLogoutClicked = (e) => {
    console.log("onLogoutClicked");
    usersService
      .userLogout()
      .then(this.onLogoutSuccess)
      .catch(this.onLogoutError);
  };

  onLogoutSuccess = (response) => {
    console.log({ good: response });
    toast.success("You have successfully logged out.");
    //redirect to login page
    this.props.history.push("/Login");
  };
  onLogoutError = (response) => {
    console.log({ error: response });
    toast.error("Something went wrong, please try again.");
  };

  render() {
    return (
      <div className="col-12 col-md-3 col-xl-2 bd-sidebar text-center">
        <nav className=" bd-links" id="bd-docs-nav">
          <div className="text-center" id="userAvatar">
            <img
              src={this.state.currentUserData.avatarUrl}
              className="rounded img-thumbnail"
              alt="user avatar"
            />
          </div>
          <div className="text-center">
            Logged in as: <p>{this.state.currentUserData.email}</p>
          </div>
          <div className="list-group" id="sideNav">
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={this.onBtnClick}
              id="friendsBtn"
            >
              Friends
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={this.onBtnClick}
              id="eventsBtn"
            >
              Events
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={this.onBtnClick}
              id="blogsBtn"
            >
              Blogs
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={this.onBtnClick}
              id="jobsBtn"
            >
              Jobs
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={this.onBtnClick}
              id="techCompaniesBtn"
            >
              Tech Companies
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={this.onBtnClick}
              id="registerBtn"
            >
              Register
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={this.onLogoutClicked}
              id="logoutBtn"
              // disabled
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    );
  }
}
export default SideBar;
