import React from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBarData from "./SideBarData";
import UserService from "../services/usersServices";

class NavBar extends React.Component {
  state = {
    NavMenu: false,
    isLogIn: false,
    UsersInfo: { firstName: "", lastName: "", avatarUrl: "" },
  };

  toggleNavMenu = () => {
    this.setState({ NavMenu: !this.state.NavMenu });
  };

  toLoginPage = () => {
    this.props.history.push("/login");
  };

  toLogOut = () => {
    UserService.logOut().then(this.onLogOutSuccess).catch(this.onLogOutError);
  };

  onLogOutSuccess = (response) => {
    this.setState({ isLogIn: false });
    let logOut = { type: "LOGOUT", payload: null };
    this.props.history.push("/", logOut);
    toast.success("GoodBye!");
  };
  onLogOutError = (err) => {
    console.log(err);
  };

  onClickCurrentUser = () => {
    UserService.currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  };
  onCurrentUserSuccess = (response) => {
    const currUsersId = response.data.item.id;
    this.inStateChange(currUsersId);
  };
  onCurrentUserError = (err) => {
    toast.error("Please Login!");
    this.props.history.push("/login");
  };

  inStateChange = (payload) => {
    UserService.usersData(payload)
      .then(this.onInStateSuccess)
      .catch(this.onInStateError);
  };
  onInStateSuccess = (response) => {
    const { firstName, lastName, avatarUrl } = response.data.item;
    const UsersInfo = { firstName, lastName, avatarUrl };
    this.setState({ isLogIn: true, UsersInfo: { ...UsersInfo } });
    this.props.history.push(this.props.location.pathname, UsersInfo);
  };

  onInStateError = (response) => {
    toast.error("Error!");
    console.warn({ error: response });
  };

  onRegisterClick = () => {
    if (!this.props.currentUser) {
      this.props.history.push("/register");
    }
  };

  render() {
    let appState = this.props.currentUser.isLoggedIn;
    let navState = this.state.isLogIn;
    let classChange = this.state.NavMenu ? "nav-menu active" : "nav-menu";
    let HideFromUser = appState || navState ? "d-none" : "";
    let ShowForUser = appState || navState ? "" : "d-none";
    let DataToLoad = this.state.UsersInfo;
    return (
      <React.Fragment>
        <div className="container col-lg-12 top-bar">
          <div className="row">
            <div className="col-sm- row" id="header">
              <h1>Simply Bloggin'</h1>
            </div>
            <div className="btn col-lg-" id="top">
              <button className="bar-btns btn">
                <FaIcons.FaBars onClick={this.toggleNavMenu} />
              </button>
              <button className={`bar-btns btn ${HideFromUser}`}>
                <FaIcons.FaSignInAlt onClick={this.toLoginPage} />
              </button>
              <button className={`bar-btns btn ${ShowForUser}`}>
                <FaIcons.FaSignOutAlt onClick={this.toLogOut} />
              </button>
            </div>
          </div>
        </div>
        <nav className={classChange}>
          <ul className="nav-main-items">
            <li className={`${ShowForUser}`}>
              <img
                src={DataToLoad.avatarUrl}
                alt="userPic"
                className="rounded-circle"
              />
            </li>
            <li className={`usersTitle ${ShowForUser}`}>
              <h5>{`${DataToLoad.firstName} ${DataToLoad.lastName}`}</h5>
            </li>
            <li id="nav-title">Main Navigation</li>
            {SideBarData.map((item, index) => {
              return (
                <li
                  key={index}
                  className={item.cName}
                  onClick={this.onClickCurrentUser}
                >
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className={`nav-text ${HideFromUser}`}>
              <Link to="/register">
                <FaIcons.FaPencilAlt />
                <span>Register</span>
              </Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
