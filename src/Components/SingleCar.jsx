import React from "react";

function SingleCar(props) {
  const oneCar = props.car;

  return (
    <div key={`Cars-${oneCar.id}`} className="card col-md-3">
      <div className="card-body">
        <h5 className="card-title">{oneCar.title}</h5>
        <h5 className="card-text">{oneCar.model}</h5>
        <h5 className="card-text">{oneCar.year}</h5>
      </div>
    </div>
  );
}

export default React.memo(SingleCar);
