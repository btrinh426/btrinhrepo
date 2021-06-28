import React from "react";

function SingleCar(props) {
  const cars = props.car;
  return (
    <div className="card col-md-3 m-1">
      <div className="card-body">
        <h5 className="card-title">{cars.make}</h5>
        <h5 className="card-text">{cars.model}</h5>
        <h5 className="card-text">{cars.year}</h5>
      </div>
    </div>
  );
}

export default SingleCar;
