import React from "react";

function SingleFriend(props) {
  //   debugger;
  const aFriend = props.friend;
  function onEditClick() {
    props.editFriend(aFriend);
  }
  function onDeleteClick() {
    props.deleteFriend(aFriend);
  }
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={aFriend.primaryImage.imageUrl}
        className="card-img-top"
        alt="..."
      ></img>
      <div className="card-body">
        <h5 className="card-title">{aFriend.title}</h5>
        <p className="card-text" name="summary">
          {aFriend.summary}
        </p>
      </div>
      <div className="card-body">
        <div>
          <button
            name="edit"
            type="button"
            onClick={onEditClick}
            className="btn btn-primary bt-sm"
          >
            Edit
          </button>
          <button
            name="delete"
            type="delete"
            onClick={onDeleteClick}
            className="btn btn-primary bt-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleFriend;
