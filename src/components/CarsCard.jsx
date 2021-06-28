import React from "react";

function CarsCard(props) {
  const car = props.car;
  return (
    <div>
      {`${car.make} ${car.model} ${car.year}`}
      <div className="card-body">
        <h5 className="card-title">Make: {car.make}</h5>
        <h5 className="card-text">Model {car.model}</h5>
        <h5 className="card-text">Year{car.year}</h5>
      </div>
    </div>
  );
}

export default CarsCard;
