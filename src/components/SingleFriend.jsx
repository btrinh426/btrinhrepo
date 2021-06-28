import React from "react";

function SingleFriend(props) {
  const oneFriend = props.friendData;

  const onRequestEdit = function (e) {
    e.preventDefault();
    props.onEditRequested(oneFriend);
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
          className="btn btn-warning"
          onClick={onRequestEdit}
          data-f-slug={oneFriend.id}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleFriend);
