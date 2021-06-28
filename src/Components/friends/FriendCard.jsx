import React from "react";
import * as friendService from "../../services/friendsServices";
import "../jobs/job.css";

function FriendCard(props) {
  //Save id(data-id attr of delete button) and closest .card element.
  //card pushed to state for removal AFTER record is deleted
  //Id sent to the remove function in friends

  function onEditClicked() {
    props.onEditClicked(props.oneFriend);
  }
  const onDeleteClicked = () => {
    //get card id and call delete service
    friendService
      .remove(props.oneFriend.id)
      .then(onDeleteSuccess)
      .catch(onDeleteError);
  };
  const onDeleteSuccess = () => {
    props.onDeleteClicked(props.oneFriend);
  };
  const onDeleteError = (err) => {
    console.error(err);
  };
  return (
    <React.Fragment>
      <div className="card border-info" data-id={props.oneFriend.id}>
        <h5 className="card-title">{props.oneFriend.title}</h5>
        <img
          src={props.oneFriend.primaryImage.imageUrl}
          className="img-thumbnail "
          alt={props.oneFriend.title}
        />
        <div className="card-body">
          <p className="card-text">{props.oneFriend.summary}</p>
        </div>
        <div className="container">
          <button
            className="btn btn-primary editButton"
            data-slug={props.oneFriend.slug}
            onClick={onEditClicked}
          >
            Update
          </button>
          <button
            className="btn btn-danger deleteButton"
            data-id={props.oneFriend.id}
            onClick={onDeleteClicked}
          >
            Delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default FriendCard;
