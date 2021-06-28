import React from "react";

function SingleFriend(props) {
  const oneFriend = props.friend;

  const onEditClick = function () {
    props.edit(oneFriend);
  };

  const onDeleteClick = function () {
    props.delete(oneFriend);
  };

  return (
    <div className="stock shadow-lg border-0 col-2 mt-4 ml-4">
      <div className="card-body text-center">
        <img
          className="card-img"
          src={oneFriend.primaryImage.imageUrl}
          alt="Not found"
        />
        <h5 className="card-title text-center">{oneFriend.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted text-center">
          {oneFriend.headline}
        </h6>
        <p className="card-text text-center">{oneFriend.summary}</p>
        <button
          type="button"
          className="btn btn-danger mr-1"
          onClick={onDeleteClick}
          data-id={oneFriend.id}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-info ml-1"
          onClick={onEditClick}
          data-id={oneFriend.id}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleFriend);
