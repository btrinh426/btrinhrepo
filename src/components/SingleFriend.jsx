import React from "react";

function singleFriend(props) {
  const friend = props.singleFriend;

  // function onFriendClickFull() {
  //   props.editClick(friend);
  // }

  function onEditClick() {
    props.onEditFriend(friend);
  }

  function onDeleteClick() {
    props.onDeleteFriend(friend);
  }

  return (
    <div className="card col-md-3 m-2">
      <img
        src={friend.primaryImage.imageUrl}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{friend.title}</h5>
        <h6 className="card-text">{friend.headline}</h6>
        <p className="card-text">{friend.summary}</p>
        <div className="mx-auto">
          <button
            type="button"
            className="btn btn-danger mr-2"
            onClick={onDeleteClick}
            data-friend-id={friend.id}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={onEditClick}
            data-friend-id={friend.id}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(singleFriend);
