import React from "react";

// add personalized message/greeting at header

class Jumbo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Hello, world!</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Jumbo;
  