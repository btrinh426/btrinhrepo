import React from "react";

const MappedFriends = (props) => {
  return (
    <div className="col-md-12 p-5" key={props.friend.id}>
      <img
        className="card-img-top"
        style={{ maxHeight: "300px", maxWidth: "300px" }}
        src={props.friend.primaryImage.imageUrl}
        alt="Card image cap"
      ></img>
      <div className="card-body">
        <h2 className="card-title">{props.friend.bio}</h2>
        <p className="card-text">{props.friend.headline}</p>
        <p className="card-text">{props.friend.title}</p>
        <button className="btn btn-primary" onClick={props.editFriend}>
          Edit
        </button>
        <button className="btn btn-primary">Delete</button>
      </div>
    </div>
  );
};

export default MappedFriends;
