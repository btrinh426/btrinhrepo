import React from "react";

const CarsCard = (props) => {
  // console.log(props);
  //   const filter21 = () => {
  //     props.handleFilter(props.car.year);
  //  };
  return (
    <div className="card col-md-3 m-1">
      <div className="card-body">
        <h5 className="card-title">Make : {props.car.make}</h5>
        <h5 className="card-text">Model : {props.car.model}</h5>
        <h5 className="card-text">Year : {props.car.year}</h5>
        {/* <div>
          <button className="btn btn-outline-dark" onClick={filter21}>
            2021 models
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CarsCard;
