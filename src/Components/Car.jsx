import React from "react";

const Car = (props) => {
  return (
    <div className="col-md-4">
      <p></p> <p></p>
      <div className="card-deck">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Make: {props.myCar.make}</h5>
            <h5 className="card-text">Model: {props.myCar.model}</h5>
            <h5 className="card-text">Year: {props.myCar.year}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
