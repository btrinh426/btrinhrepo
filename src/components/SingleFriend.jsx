import React from "react";
// import * as userService from "../services/userService";

function SingleFriend(props) {
  const oneFriend = props.friend;       //each friend object... single friend is telling parent Friends
                                        // how it wishes to receive props
  const onEditClickedFull = () => {
    props.onEditClick(oneFriend);
  };

  const onDeleteClickedFull = () => { 
    props.onDeleteClicked(oneFriend);
  };

  return (
    <div className="card-friends col-md-3">
      <img
        className="card-img-top"
        src={oneFriend.primaryImage.imageUrl}
        alt="Friend Avatar"
      />
      <div className="card-body">
        <h5 className="card-title">{oneFriend.title}</h5>
        <p className="card-text">{oneFriend.summary}</p>
        <button
          className="btn btn-secondary btn-md"
          id={oneFriend.id} // nav me to edit friend pg
          onClick={onEditClickedFull} // best way to pass entire fx to this button
          data-friend-id={oneFriend.id}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-md"
          id={oneFriend.id}
          onClick={onDeleteClickedFull}
          data-friend-id={oneFriend.id}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleFriend);
// (memo) instead of coming through this entire fx call, if react sees that you're passing the
// same props, which will be the friend and onClicks, then it will not bother calling the fuction at all,
// it will return the output from the previous render
