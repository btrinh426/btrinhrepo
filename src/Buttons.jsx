import React from "react";
import * as userService from "./services/userServices";

class Buttons extends React.Component {
  onRequestDetails = (e) => {
    let ticks = new Date().getSeconds();

    console.log("Request Details was Clicked", ticks);

    this.props.history.push("/products/" + ticks);
  };

  onRequestDetailsFixed = (e) => {
    console.log("Fixed the Details Request");
    this.props.history.push("/products/88");
  };

  onBuyClicked = (e) => {
    let seconds = new Date().getSeconds();

    console.log("onBuyClicked was firing", seconds);

    this.props.history.push("/cart/");
  };

  onLogOutClicked = (e) => {
    console.log("onLogOutClicked", new Date());
    this.props.history.push("/");
    userService.logOut().then(this.onLogOutSuccess).catch(this.onLogOutError);
  };

  onLogOutSuccess = () => {
    console.log("onLogOutSuccess - we are logged out", new Date());
    // var logOutState = { type: "LOGOUT", payload: null };
    this.props.history.push("/");
  };

  onLogOutError = (err) => {
    console.log(err);
  };

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = this.props.location.pathname;

    console.log("buttons", { currentPath, previousPath });
  }

  render() {
    console.log("rendering buttons");
    return (
      <React.Fragment>
        <div className="col-md-3">
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={this.onBuyClicked}
          >
            Buy Product / Add to Cart
          </button>
        </div>
        <div className="col-md-3">
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={this.onLogOutClicked}
          >
            Log Out
          </button>
        </div>
        <div className="col-md-3">
          <button
            type="submit"
            className="btn btn-outline-success"
            onClick={this.onRequestDetails}
          >
            See Product Details
          </button>
        </div>
        <div className="col-md-3">
          <button
            type="submit"
            className="btn btn-outline-success"
            onClick={this.onRequestDetailsFixed}
          >
            See Product Details 88
          </button>
        </div>
        {/* <div className="row pt-5">
          Is User Logged In? {this.props.currentUser.isLoggedIn ? "Yes" : "No"}
        </div> */}
      </React.Fragment>
    );
  }
}

export default Buttons;
