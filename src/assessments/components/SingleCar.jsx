import React from "react";

const SingleCar = (props) => {
  return (
    <React.Fragment>
      <div className="card col-md-3 m-1 d-inline-block">
        <div className="card-body">
          <h5 className="card-title">Make: {props.car.make}</h5>
          <h5 className="card-text">Model: {props.car.model}</h5>
          <h5 className="card-text">Year: {props.car.year}</h5>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(SingleCar);
