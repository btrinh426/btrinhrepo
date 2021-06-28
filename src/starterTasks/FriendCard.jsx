import React from "react";

const FriendCard = (props) => {
  console.log(props);
  return (
    <div className="card p-5" style={{ width: "18rem" }}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-S5lrWUmvYOQMC2mXvDR59guR2Sb0gQ_U2EYHAqKVDI46X_l7x4QVVGvTvjeZjsV7Swg&usqp=CAU.js/100px250"
        id="primaryImage"
        className="card-img-top"
        alt="SOmething"
      />
      <div className="card-body">
        <h5 className="card-title" name="title">
          title - Darrel Baerwaldt
        </h5>
        <p className="card-text" data="summary">
          summary He has 4 brothers and 1 sister.
        </p>
        <button onClick={props.editMe} className="btn btn-warning">
          Edit
        </button>
        <button onClick={props.deleteMe} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
