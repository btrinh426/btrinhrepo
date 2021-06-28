import React from "react";

const Car = (props) => {
  return (
    <div key={i} className="card col-md-3 m-1">
      <div className="card-body">
        <h5 className="card-title">{props.car.make}</h5>
        <h5 className="card-text">{props.car.model}</h5>
        <h5 className="card-text">{props.car.year}</h5>
      </div>
    </div>
  );
};

export default FriendCard;