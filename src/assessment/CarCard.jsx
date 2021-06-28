import React from "react";
const CarCard = (props) => {
  return (
    <div className="card col-md-3 m-1">
      <div className="card-body">
        <h5 className="card-title">Make</h5>
        <p>{props.car.make}</p>
        <h5 className="card-text">Model</h5>
        <p>{props.car.model}</p>
        <h5 className="card-text">Year</h5>
        <p>{props.car.year}</p>
      </div>
    </div>
  );
};

export default CarCard;
