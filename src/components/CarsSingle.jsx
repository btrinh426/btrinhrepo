import React from "react";

function CarsSingle(props) {
  const oneCar = props.cars;
  console.log("this is one car:", oneCar);

  const onShowCarsFull = () => {
    props.onShowClick(oneCar);
  };

  return (
    <React.Fragment>
      <div>
        <div className="card col-md-3 m-1">
          <div className="card-body">
            <h5 className="card-title">{oneCar.make}</h5>
            <h5 className="card-text">{oneCar.model}</h5>
            <h5 className="card-text">{oneCar.year}</h5>
          </div>
        </div>
      </div>
      <button className="btn btn-danger btn-md" onClick={onShowCarsFull}>
        Show Cars
      </button>
    </React.Fragment>
  );
}

export default React.memo(CarsSingle);
