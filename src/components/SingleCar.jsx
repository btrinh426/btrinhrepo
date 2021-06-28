import React from "react";
import "sweetalert2/dist/sweetalert2.css";

function SingleCar(props) {
  const aCar = props.car;

  // const filterACarByYear = function () {
  //   props.filterACar(aCar);
  // };

  return (
    <React.Fragment>
      <div className="card col-md-3 m-1">
        <div className="card-body">
          <h5 className="card-title">{aCar.make}</h5>
          <h5 className="card-text">{aCar.model}</h5>
          <h5 className="card-text">{aCar.year}</h5>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(SingleCar);
