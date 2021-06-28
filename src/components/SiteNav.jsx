import React from "react";
import Products from "./Products";
import Cars from "./Cars";
import currentUser from "../services/homePageService";
import signOutUser from "../services/signOutService";

class SiteNav extends React.Component {
  componentDidMount() {
    currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  }
  onCurrentUserSuccess = (e) => {
    //console.log("show the user some feedback...");
  };
  onCurrentUserError = (err) => {
    this.props.history.push("/login");
  };
  onSabioClicked = (e) => {
    //console.log("clicked sabio....");
    this.props.history.push("/jumbo");
  };
  onLogOutClicked = (e) => {
    // console.log(e);
    signOutUser();
    this.props.history.push("/login");
  };
  onFriendsClicked = (e) => {
    //console.log("going to friends...");
    this.props.history.push("/Friends");
  };
  onJobsClicked = (e) => {};
  onProductsClicked = (e) => {
    //console.log("products clicked....");
    this.props.history.push("/products");
  };
  onTechClicked = (e) => {};
  onEventsClicked = (e) => {};

  onCarsClicked = (e) => {
    console.log("wired to cars...");
    this.props.history.push("/cars");
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
          <button
            className="link-button navbar-brand"
            onClick={this.onSabioClicked}
          >
            Sabio
          </button>
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <button
                  className="nav-link link-button"
                  onClick={this.onLogOutClicked}
                >
                  Log Out<span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item active">
                <button
                  className="nav-link link-button"
                  onClick={this.onFriendsClicked}
                >
                  Friends<span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item active">
                <button className="nav-link link-button">
                  Jobs<span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item active">
                <button
                  className="nav-link link-button"
                  onClick={this.onProductsClicked}
                >
                  Products<span className="sr-only"></span>
                </button>
              </li>
              <li className="nav-item active">
                <button className="nav-link link-button">
                  Tech Companies <span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item active">
                <button className="nav-link link-button">
                  Events <span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item active">
                <button
                  className="nav-link link-button"
                  onClick={this.onCarsClicked}
                >
                  Cars<span className="sr-only">(current)</span>
                </button>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0"></form>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default SiteNav;
