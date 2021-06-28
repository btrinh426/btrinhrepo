import React from "react";

const Friend = (props) => {
  return (
    <div className="card col-md-4" id={props.friend.id}>
      <img
        src={props.friend.primaryImage.imageUrl}
        className="card-img-top"
        alt="Friend Avatar"
      />
      <div className="card-body">
        <h5 className="card-title">
          Name: {props.friend.title} {props.friend.id}
        </h5>
        <p className="card-text">{props.friend.summary}</p>
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => props.selectFriend(props.friend, e)}
        >
          Edit
        </button>
        {"   "}
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => props.delFriend(props.friend.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Friend;
