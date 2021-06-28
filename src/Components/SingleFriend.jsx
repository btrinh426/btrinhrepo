import React from "react";

function SingleFriend(props) {
  const oneFriend = props.friend;

  const onEditClick = function () {
    props.onClick(oneFriend);
  };

  const onDeleteClick = function () {};

  return (
    <div key={`Friends-${oneFriend.id}`} className="card col-md-3">
      <img
        src={oneFriend.primaryImage.imageUrl}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{oneFriend.title}</h5>
        <p className="card-text">{oneFriend.summary}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onEditClick}
          data-fr-id={oneFriend.id}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={onDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default SingleFriend;
