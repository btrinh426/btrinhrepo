import React from "react";

function CarsSingle(props) {
  const oneCar = props.cars;
  //console.log("this is one car:", oneCar);

  return (
    <div>
      <div className="card col-md-3 m-1">
        <div className="card-body">
          <h5 className="card-title">{oneCar.make}</h5>
          <h5 className="card-text">{oneCar.model}</h5>
          <h5 className="card-text">{oneCar.year}</h5>
          <div>
          {/* {this.filteredCars}       why is this not rendering? */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CarsSingle);
