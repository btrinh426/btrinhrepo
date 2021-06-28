import React from "react";

function CarsMap(props) {
  const singleCar = props.carsArray;

  return (
    <React.Fragment>
      <div className="card col-md-3 m-1">
        <div className="card-body">
          <h5 className="card-title">{singleCar.make}</h5>
          <h5 className="card-text">{singleCar.model}</h5>
          <h5 className="card-text">{singleCar.year}</h5>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(CarsMap);
