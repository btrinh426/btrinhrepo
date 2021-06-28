import React from "react";

// import * as userService from "../services/userService";

class ShowButton extends React.Component {
  onShowClick = () => {
    this.props.history.push("/cars");
  };
  render() {
    return (
      <React.Fragment>
        <div className="container m-5 p-5">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onShowClick}
          >
            Show Cars
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default ShowButton;
