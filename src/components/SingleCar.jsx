import React from "react";

function SingleCar(props) {
  const oneCar = props.cars;

  const onRequestShowCars = function (e) {
    e.preventDefault();
    props.onShowCarsRequested(oneCar);
  };

  return (
    <React.Fragment>
      <div className="card col-md-4">
        <div className="card-body">
          <h5 className="card-title">{oneCar.make}</h5>
          <strong>{oneCar.model}</strong>
          <p className="card-text">{oneCar.year}</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(SingleCar);
