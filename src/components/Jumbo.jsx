import React from "react";
import debug from "sabio-debug";
// import * as usersService from "../services/usersService";

const _logger = debug.extend("App");

class Jumbo extends React.Component {
  handleClick = () => {
    _logger("this is:", this);
  };

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Hello, world!</h1>
            <p>
              This is a template for a simple marketing or informational
              website. It includes a large callout called a jumbotron and three
              supporting pieces of content. Use it as a starting point to create
              something more unique.
            </p>
            <p>
              <button
                className="btn btn-primary btn-lg"
                onClick={this.handleClick}
              >
                Learn more &raquo;
              </button>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Jumbo;
