import React from "react";

function SingleFriend(props) {
  const oneFriend = props.friend;

  const onEditClicked = function () {
    props.onclick(oneFriend);
  };
  const onDeleteClicked = function () {
    props.onClick(oneFriend);
  };

  return (
    <div className="card card-profile text-center">
      <img
        src={oneFriend.primaryImage.imageUrl}
        className="card-img-profile mt-5"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{oneFriend.title}</h5>
        <p className="card-text">{oneFriend.headline}</p>
        <button
          type="button"
          onClick={onEditClicked}
          data-friend-id={oneFriend.id}
          className="btn btn-secondary mr-5"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDeleteClicked}
          data-friend-id={oneFriend.id}
          className="btn btn-danger ml-5"
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default SingleFriend;
