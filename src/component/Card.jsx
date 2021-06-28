import React from "react";

function Card(props) {
  const carData = props.data;
  return (
    <div className="card col-md-3 m-1">
      <div className="card-body">
        <h5 className="card-title">{carData.make}</h5>
        <h5 className="card-text">{carData.model}</h5>
        <h5 className="card-text">{carData.year}</h5>
      </div>
    </div>
  );
}

export default Card;
