import React from "react";

const CarCards = (props) => {
  return (
    <div className="card col-md-3 m-1">
      <div className="card-body">
        <h5 className="card-title">{props.cars.make}</h5>
        <h5 className="card-text">{props.cars.model}</h5>
        <h5 className="card-text">{props.cars.year}</h5>
      </div>
    </div>
  );
};
export default CarCards;
