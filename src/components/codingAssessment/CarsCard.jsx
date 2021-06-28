import React from "react";

class CarsCard extends React.Component {
  render() {
    return (
      <div className="card col-md-3 m-1">
        <div className="card-body">
          <h5 className="card-title">{this.props.cars.make}</h5>
          <h5 className="card-text">{this.props.cars.model}</h5>
          <h5 className="card-text">{this.props.cars.year}</h5>
        </div>
      </div>
    );
  }
}

export default CarsCard;
