import React from "react";

function CarCard(props) {
  //   console.log(props);

  let car = props.car;

  return (
    <div>
      <div className="card col-md-3 m-1">
        <div className="card-body">
          <h5 className="card-title">{car.make}</h5>
          <h5 className="card-text">{car.model}</h5>
          <h5 className="card-text">{car.year}</h5>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
