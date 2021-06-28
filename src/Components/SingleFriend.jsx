import React from "react";
// import * as friendService from "../services/friendService";

function SingleFriend(props) {
  const oneFriend = props.friend;

  const onEditClickedFull = function () {
    props.onEditClick(oneFriend);
  };

  const onDeleteClickedFull = function () {
    props.onDeleteClick(oneFriend);
  };

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
          onClick={onEditClickedFull}
          data-fr-id={oneFriend.id}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={onDeleteClickedFull}
          data-fr-id={oneFriend.id}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleFriend);
