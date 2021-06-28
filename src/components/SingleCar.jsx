import React from "react";

function SingleCar(props) {
  const aCar = props.car;

  return (
    <div className="card col-md-3 m-1" key={`Cars-${aCar.id}`}>
      <div className="card-body">
        <h5 className="card-title">{aCar.make}</h5>
        <h5 className="card-text">{aCar.model}</h5>
        <h5 className="card-text">{aCar.year}</h5>
      </div>
    </div>
  );
}
export default React.memo(SingleCar);
