import React from "react";

function ShowOneCar(props) {
  return (
    <div className="card-body">
      <h5 className="card-title">Make</h5>
      <p> {props.car.make}</p>
      <h5 className="card-text">Model</h5>
      <p>{props.car.model}</p>
      <h5 className="card-text">Year</h5>
      <p>{props.car.year}</p>
    </div>
  );
}

export default ShowOneCar;
