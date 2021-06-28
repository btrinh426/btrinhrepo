import React from "react";
import * as userService from "../services/userService";

class Buttons extends React.Component {
  onRequestDetails = () => {
    let ticks = new Date().getSeconds();
    //tick simulate a product id
    console.log("See Product Details was clicked", ticks);
  };

  onBuyClicked = (e) => {
    let seconds = new Date().getSeconds();
    console.log("Buy was clicked", seconds);
    this.props.history.push("/spider-man");
  };
  onLogOutClicked = () => {
    console.log("onLogOutClicked", new Date());

    this.props.history.push("/");
    userService
      .userLogOut()
      .then(this.onLogOutSuccess)
      .catch(this.onLogOutError);
  };

  onLogOutSuccess = () => {
    console.log("onLogOutSuccess - we are logged out", new Date());
  };
  onLogOutError = (err) => {
    console.log(err);
  };

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;
    console.log("buttons", { currentPath, previousPath });
  }

  render() {
    console.log("rendering buttons");
    return (
      <React.Fragment>
        <div className="col-md-4">
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={this.onBuyClicked}
          >
            Buy Product
          </button>
        </div>
        <div className="col-md-4 ">
          <button
            type="submit"
            className="btn btn-outline-secondary"
            onClick={this.onLogOutClicked}
          >
            Log Out
          </button>
        </div>
        <div className="col-md-4">
          <button
            type="submit"
            className="btn btn-outline-success"
            onClick={this.onRequestDetails}
          >
            See Product Details
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Buttons;
