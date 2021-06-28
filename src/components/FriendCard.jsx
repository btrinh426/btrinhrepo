import React from "react";

function FriendCard(props) {
  const oneFriend = props.friend;
  const editButton = () => {
    props.editClick(props.friend);
  };
  const deleteButton = () => {
    props.handleDelete(props.friend.id);
  };

  return (
    <div className="card col-md-3">
      <img
        className="card-img-top"
        src={oneFriend.primaryImage && oneFriend.primaryImage.imageUrl}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{oneFriend.title}</h5>
        <p className="card-text">
          <strong>{oneFriend.bio}</strong>
          {oneFriend.summary}
        </p>
        <button className="" onClick={editButton}>
          Edit
        </button>
        <button className="" onClick={deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default FriendCard;
