import React from "react";

function SingleFriend(props) {
  const oneFriend = props.friendData;

  const onRequestEdit = function (e) {
    e.preventDefault();
    props.onEditRequested(oneFriend);
  };

  const onRequestDelete = function (e) {
    e.preventDefault();
    props.onDeleteRequested(oneFriend);
  };

  return (
    <div className="card col-md-4">
      <img
        src={oneFriend.primaryImage.imageUrl}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{oneFriend.title}</h5>
        <strong>{oneFriend.slug}</strong>
        <p className="card-text">{oneFriend.bio}</p>
        <button
          className="btn btn-primary"
          onClick={onRequestEdit}
          data-f-id={oneFriend.id}
        >
          Edit
        </button>
        <button
          className="btn btn-warning"
          onClick={onRequestDelete}
          data-f-id={oneFriend.id}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleFriend);
