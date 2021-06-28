import React from "react";

function Friend(props) {
  const friend = props.friend;

  function editFriendFull() {
    props.editFriend(friend);
  }

  function deleteFriend() {
    props.deleteFriend(friend);
  }

  return (
    <div
      className="card"
      style={{ width: "14rem" }}
      key={`Friend-${friend.id}`}
    >
      <img
        src={friend.primaryImage && friend.primaryImage.imageUrl}
        className="card-img-top"
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title">{friend.title}</h5>
        <p className="card-text">{friend.summary}</p>
        <button
          className="btn btn-primary m-1"
          onClick={editFriendFull}
          data-friend-id={friend.id}
        >
          Edit Friend
        </button>
        <button
          className="btn btn-primary m-1"
          data-friend-id={friend.id}
          onClick={deleteFriend}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(Friend);
