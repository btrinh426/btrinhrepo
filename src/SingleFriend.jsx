import React from "react";

function SingleFriend(props) {
  const oneFriend = props.friend;

  function onEditClicked() {
    props.onEdit(oneFriend);
  }

  function onDeleteClicked() {
    props.onDelete(oneFriend);
  }

  return (
    <div className="card col-md-3">
      <img
        className="card-img-top"
        src={oneFriend.primaryImage.imageUrl}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{oneFriend.title}</h5>
        <p className="card-text">{oneFriend.summary}</p>
        <button
          className="btn btn-primary link-button"
          onClick={onEditClicked}
          data-friend-id={oneFriend.id}
        >
          Edit
        </button>
        <button
          className="btn btn-primary link-button deleteBtn"
          onClick={onDeleteClicked}
          data-friend-id={oneFriend.id}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleFriend);
