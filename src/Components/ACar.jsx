import React from "react";

function ACar(props) {
  const oneCar = props.car;

  return (
    <div className="card col-6-md-3 m-1">
      <div className="card-body">
        <h5 className="card-title">Make: {oneCar.make}</h5>
        <h5 className="card-text">Model: {oneCar.model}</h5>
        <h5 className="card-text">Year: {oneCar.year}</h5>
      </div>
    </div>
  );
}

export default React.memo(ACar);
