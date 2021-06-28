import React from "react";
import debug from "sabio-debug";
const _logger = debug.extend();

function SingleFriend(props) {
  const friend = props.friend;

  const onDeleteClick = () => {
    _logger("delete clicked"); //this here?
    props.deleteClick(friend);
  };

  const onEditClick = () => {
    props.editClick(friend);
  };

  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card shadow">
        <img
          src={friend.primaryImage.imageUrl}
          className="card-img-top item thePhoto"
          alt="person."
        />
        <div className="card-body text-center">
          <h5 className="card-title mb-0 item">{friend.title}</h5>
          <div className="card-text text-black-50">{friend.headline}</div>
          <button
            type="button"
            className="btn btn-primary editButton mr-1"
            onClick={onEditClick}
            data-friend-id={friend.id}
            value="edit"
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-primary deleteButton mr-1"
            onClick={onDeleteClick}
            data-friend-id={friend.id}
            value="delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleFriend;
