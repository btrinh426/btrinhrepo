import React from "react";

function CarsCards(props) {
  return (
    <div className="card-body">
      <h5 className="card-title">{props.car.year}</h5>
      <h5 className="card-title">{props.car.make}</h5>
      <h5 className="card-title">{props.car.model}</h5>
    </div>
  );
}

export default CarsCards;
