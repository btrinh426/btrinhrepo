import React from "react";

const FriendCard = (props) => {
  const person = props.friend;
  const defaultUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-S5lrWUmvYOQMC2mXvDR59guR2Sb0gQ_U2EYHAqKVDI46X_l7x4QVVGvTvjeZjsV7Swg&usqp=CAU.js/100px250";

  return person !== undefined ? (
    <div className="card p-5" style={{ width: "18rem" }}>
      <img
        src={person?.primaryImage?.imageUrl ?? defaultUrl}
        id="primaryImage"
        className="card-img-top"
        alt="SOmething"
      />
      <div className="card-body">
        <h5 className="card-title" name="title">
          {person?.title}
        </h5>
        <p className="card-text" data="summary">
          {person?.summary}
        </p>
        <button onClick={props.editMe} className="btn btn-warning">
          Edit
        </button>
        <button onClick={props.deleteMe} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  ) : (
    <div />
  );
};

export default FriendCard;
