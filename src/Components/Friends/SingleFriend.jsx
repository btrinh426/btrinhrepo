import React from "react";

function SingleFriend(props) {
  const oneFriend = props.mappedFriends;

  function onDeleteFriend(e) {
    props.onDeleteFr(e);
  }
  function onEditFriend() {
    props.onEditFr(oneFriend);
  }
  return (
    <div key={oneFriend.id}>
      <div
        id="root"
        className="card"
        style={{ width: "19rem", margin: "1rem" }}
      >
        <img
          src={oneFriend.primaryImage.imageUrl}
          className="card-img-top"
          alt="a thing here"
        />
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-none">{oneFriend.id}</li>
            <li className="list-group-item">
              <h4 className="title">{oneFriend.title}</h4>
            </li>
            <li className="list-group-item">{oneFriend.bio}</li>
          </ul>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              key={oneFriend.id}
              className="btn btn-light btn-outline-secondary"
              name={oneFriend.id}
              onClick={onEditFriend}
            >
              Edit
            </button>
            <button
              className="btn btn-light btn-outline-secondary"
              name={oneFriend.id}
              onClick={onDeleteFriend}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SingleFriend);
