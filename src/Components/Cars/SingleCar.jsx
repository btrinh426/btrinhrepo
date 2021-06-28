import React from "react";

function SingleCar(props) {
  const oneCar = props.state.currentCars;
  oneCar.iterator = props.state.currentCars.iterator;

  return (
    <div key={oneCar.iterator}>
      <div className="card col-md-3 m-1">
        <div className="card-body">
          <h5 className="card-title">{oneCar.make}</h5>
          <h5 className="card-text">{oneCar.model}</h5>
          <h5 className="card-text">{oneCar.year}</h5>
        </div>
      </div>
    </div>
  );
}
export default React.memo(SingleCar);
