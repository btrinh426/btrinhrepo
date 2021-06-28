import React from "react";

function OneCar(props) {
  const oneCar = props.cars;

  const onButtonClickFull = function () {
    props.onClick(oneCar);
  };

  return (
    <div>
      <img
        src={oneCar.avatar}
        className="card-img-top"
        style={{ width: "20vw", height: "30vh" }}
        alt="..."
      />
      <div className="card-body">
        <h6>
          <u>MAKE:</u>
        </h6>
        <h5 className="card-title">{oneCar.make}</h5>
        <h6>
          <u>MODEL:</u>
        </h6>
        <h5 className="card-text">{oneCar.model}</h5>
        <h6>
          <u>YEAR:</u>
        </h6>
        <h5 className="card-text">{oneCar.year}</h5>
        <button
          className="btn btn-primary btn-lg"
          onClick={onButtonClickFull.id}
          data-car-id={oneCar.id}
        >
          Show Car
        </button>
      </div>
    </div>
  );
}

export default OneCar;
