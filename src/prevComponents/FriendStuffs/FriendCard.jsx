import React from "react";

const FriendCard = (props) => {
  const friend = props.friend;

  const onEditClick = () => {};

  const onDeleteClick = () => {
    props.banana(friend.id);
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={friend.primaryImage && friend.primaryImage.imageUrl}
        alt="Card image cap"
      ></img>
      <div className="card-body">
        <h5 className="card-title">{friend.title}</h5>
        <p className="card-text">{friend.summary}</p>
        <a className="btn btn-primary" onClick={onEditClick}>
          Edit
        </a>
        <a className="btn btn-primary" onClick={onDeleteClick}>
          Delete
        </a>
      </div>
    </div>
  );
};

export default FriendCard;
