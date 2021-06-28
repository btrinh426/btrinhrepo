import React from "react";

class Car extends React.Component {
  render() {
    return (
      <div className="card col-md-3 m-1">
        <div className="card-body">
          <h5 className="card-title">{this.props.make}</h5>
          <h5 className="card-text">{this.props.model}</h5>
          <h5 className="card-text">{this.props.year}</h5>
        </div>
      </div>
    );
  }
}
export default Car;
