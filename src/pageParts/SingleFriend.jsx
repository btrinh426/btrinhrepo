import React from "react";

function SingleFriend(props) {
  const friend = props.oneFriend;
  let photoURL = String(
    `http://localhost:3000/friendImages/` + friend.primaryImage.imageUrl
  );

  function onDeleteFriend() {
    props.onClick(friend);
  }

  function onEditFriend() {
    props.onEditClick(friend);
  }
  return (
    <div
      className="friend-card"
      style={{ width: "15rem", textColor: "black", margin: "0.4em" }}
    >
      <div className="card-body">
        <img className="card-img-top" src={photoURL} alt="..." />
        <h3 className="card-name title">{friend.title}</h3>
        <p className="card-summary">{friend.summary}</p>
        <p className="card-fId d-none">ID</p>
        <button
          className="btn btn-primary delete"
          onClick={onDeleteFriend}
          data-friend-id={friend.id}
        >
          Delete
        </button>
        <button
          className="btn btn-secondary edit"
          onClick={onEditFriend}
          data-friend-id={friend.id}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
export default React.memo(SingleFriend);
