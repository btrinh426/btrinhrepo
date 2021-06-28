import React from "react";
import { NavLink } from "react-router-dom";

function Friend(props) {
  const friend = props.friend;
  function editFriendFull() {
    props.onClick(friend);
  }
  return (
    <div
      className="card"
      style={{ width: "18rem" }}
      key={`Friend-${friend.id}`}
    >
      <img src={friend.primaryImage.imageUrl} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{friend.title}</h5>
        <p className="card-text">{friend.summary}</p>

        {/* <NavLink to={`/register-friend/?${friend.id}`}> */}
        <button
          className="btn btn-primary"
          onClick={editFriendFull}
          data-friend-id={friend.id}
        >
          Edit Friend
        </button>
        {/* </NavLink> */}
      </div>
    </div>
  );
}

export default React.memo(Friend);
