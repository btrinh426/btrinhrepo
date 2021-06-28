import React from "react";

function SingleFriend(props) {
  const oneFriend = props.friend;

  const onFriendClickedFull = function () {
    props.onClick(oneFriend);
  };

  return (
    <div className="card col-md-3">
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
          onClick={onFriendClickedFull}
          data-friend-id={oneFriend.id}
        >
          Edit
        </button>
        <button type="button" className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleFriend);
