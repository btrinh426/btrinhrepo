import React from "react";
import * as friendServices from "../../services/friendsServices";

function PracticeCard(props) {
  function onEditClicked() {
    props.onEditClicked(props.oneFriend);
  }
  function onDeleteClicked() {
    friendServices
      .remove(props.oneFriend.id)
      .then(props.onDeleteSuccess)
      .catch(props.onDeleteError);
  }
  return (
    <React.Fragment>
      <div className="card col-3">
        <img
          src={props.oneFriend.primaryImage.imageUrl}
          className="img-thumbnail"
          alt={props.oneFriend.title}
        ></img>
        <div className="card-body">
          <h5 className="card-title">{props.oneFriend.title}</h5>
          <h6>{props.oneFriend.headline}</h6>
          <p className="card-text">{props.oneFriend.summary}</p>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn btn-primary ml-5"
            onClick={props.onEditClicked}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger ml-5"
            onClick={onDeleteClicked}
          >
            Delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PracticeCard;
