import React from "react";
import { withRouter } from "react-router-dom";

function SingleFriend(props) {
  const oneFriend = props.friend;
  const id = oneFriend.id;
  const onDeleteButton = function () {
    props.onClick(id);
  };
  const onEditButton = function () {
    props.history.push("/friends/" + id);
  };

  return (
    <React.Fragment>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={oneFriend.primaryImage.imageUrl}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{oneFriend.title}</h5>
          <p className="card-text">{oneFriend.bio}</p>
          <button
            type="button"
            className="btn btn-info"
            style={{ margin: 10 }}
            onClick={onEditButton}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            style={{ margin: 10 }}
            onClick={onDeleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(SingleFriend);
