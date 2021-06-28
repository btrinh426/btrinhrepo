import React from "react";
import * as userService from "../services/userService";

function SingleFriend(props) {
  const oneFriend = props.friend;
  function onLocalEdit() {
    props.onEditClicked(oneFriend);
  }

  function onDeleteClick(e) {
    e.preventDefault();
    //console.log("delete click", e.currentTarget.dataset.friendeleteId);
    let friendToDelete = e.currentTarget.dataset.friendeleteId;
    userService
      .deleteFriend(friendToDelete)
      .then(onFriendDeleteSuccess)
      .catch(onFriendDeleteFail);
  }

  function onFriendDeleteSuccess(resId) {
    console.log("delete success:", resId);

    // const filterFriends = this.state.friends.filter((friend) => {
    //   return resId !== props.friend.id;
    // });
    // console.log(filterFriends);
    // return {friends: filterFriends};
  }

  function onFriendDeleteFail(res) {
    console.warn(res);
  }

  return (
    <React.Fragment>
      <div className="card col-md-3">
        <img src={oneFriend.primaryImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{oneFriend.title}</h5>
          <p className="card-text">{oneFriend.summary}</p>
          <button
            className="btn btn-danger float-left"
            type="submit"
            onClick={onDeleteClick}
            data-friendelete-id={oneFriend.id}
          >
            Delete
          </button>
          <button
            className="btn btn-danger float-right"
            type="submit"
            onClick={onLocalEdit}
          >
            Local Edit
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(SingleFriend);
