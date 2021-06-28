import React from "react";

const FriendCard = (props) => {
  let onEditBtnClicked = (e) => {
    e.preventDefault();
    console.log("edit button clicked");
  };

  let onDeleteBtnClicked = (e) => {
    e.preventDefault();
    console.log("delete button clicked");
  };

  return (
    <div className="card w-25 p-5">
      <img
        className="card-img-top"
        // src={props.friend.primaryImage}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{props.friend.title}</h5>
        <p className="card-text">
          {props.friend.title}
          <br />
          {props.bio}
        </p>
        <div
          type="button"
          className="btn btn-primary m-2"
          name="edit"
          onClick={onEditBtnClicked}
        >
          Edit
        </div>
        <div
          type="button"
          className="btn btn-primary m-2"
          name="delete"
          onClick={onDeleteBtnClicked}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
