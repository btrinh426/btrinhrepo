import React from "react";

class TitleBar extends React.Component {
  render() {
    return (
      <div
        className="row border-bottom d-flex align-items-center m-0 border-top bg-white"
        style={{ height: "50px" }}
      >
        <span className="h5 text-muted align-middle pl-3">
          {this.props.title}
        </span>
      </div>
    );
  }
}

export default TitleBar;
