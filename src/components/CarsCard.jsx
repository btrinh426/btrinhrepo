import React from "react";

const CarsCard = (props) => {
  console.log(props);
  const deleteCar = () => {
    props.handleDelete(props.car.vin);
  };
  return (
    <div className="card col-md-3 m-1">
      <div className="card-body">
        <h5 className="card-title">Make : {props.car.make}</h5>
        <h5 className="card-text">Model : {props.car.model}</h5>
        <h5 className="card-text">Year : {props.car.year}</h5>
      </div>
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={deleteCar}
      >
        delete
      </button>
    </div>
  );
};

export default CarsCard;
