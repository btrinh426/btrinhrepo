import React from "react";
import { withRouter } from "react-router-dom";
// import * as friendService from "../services/friendService";

const FriendCard = (props) => {
  function onDeleteClicked(e) {
    props.onDeleteClick(e);
  }
  function onEditClicked(e) {
    props.onEditClick(e);
  }

  return (
    // <div className="p-4">
    //   <p>{props.friend.title}</p>
    //   <p>{props.friend.bio}</p>
    // </div>
    <div className="card col-md-3">
      <img
        className="card-img-top"
        src={props.friend.primaryImage.imageUrl}
        alt="Friend"
      />
      <div className="card-body">
        <h5 className="card-title">{props.friend.title}</h5>
        <p className="card-text">{props.friend.summary}</p>
        <button
          className="btn btn-info"
          data-friend-id={props.friend.id}
          onClick={onEditClicked}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={onDeleteClicked}
          data-friend-id={props.friend.id}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default withRouter(FriendCard);
