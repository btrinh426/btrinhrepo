import React from "react";

function ShowFriend(props) {
  const friend = props.friend;

  function onDelete(e) {
    // props.onDelete (friend);
    props.onDelete(e);
  }

  function onEdit(friend) {
    props.onEdit(friend);
  }

  return (
    <div className="card col-md-3" key={friend.id}>
      <img src={friend.primaryImage} className="card-img-top" alt="..." />
      <div className="card-header text-center">
        <h5 className="card-title">{friend.title}</h5>
      </div>
      <div className="card-body">
        <p className="card-text" color="black">
          {friend.summary}
        </p>
      </div>
      <div className="card-footer text-center">
        <button
          type="button"
          className="btn btn-danger mr-3"
          onClick={onDelete}
          id="delete"
          data-id={friend.id}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onEdit(friend)} // concise version of arrow function
          id="edit"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default React.memo(ShowFriend);
