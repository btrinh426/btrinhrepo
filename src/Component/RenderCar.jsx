import React from "react";

function individualCar(props) {
  const individualCar = props.carInfo;

  return (
    <React.Fragment>
      <div className="card col-md-3 m-1">
        <div className="card-body">
          <h5 className="card-title">{individualCar.make}</h5>
          <h5 className="card-text">{individualCar.model}</h5>
          <h5 className="card-text">{individualCar.year}</h5>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(individualCar);
