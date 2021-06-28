import React from "react";
import friendsService, { deleteFriends } from "../services/friendsService";

const FriendCard = (props) => {
  const oneFriend = props.friend;

  const onDeleteFriendsClick = (e) => {
    e.preventDefault();
    props.onDeleteFriendsClick(oneFriend.id);
  };

  // removeFriend = (friend) => {
  //   this.setState((prevState) => {
  //     const idPosition = prevState.friends.findIndex(
  //       (oneFriend) => oneFriend.id === friend.id
  //     );
  //     const copyOfState = [...prevState.freinds];
  //     if (idPosition >= 0) {
  //       copyOfState.splice(idPosition, 1);
  //     }
  //     return { friends: copyOfState };
  //   });
  // };

  const handleEdit = () => {
    props.handleEditClick(oneFriend);
  };

  return (
    <div className="card-group">
      <div className="card">
        <img
          className="card-img-top"
          //src={oneFriend.pic.imageUrl}
          alt="Card cap"
        />
        <div className="card-body"></div>
        <h5 className="card-title">{oneFriend.title}</h5>
        <p className="card-text"> {oneFriend.summary}</p>
      </div>
      <div className="card-footer"></div>
      <button
        id="edit"
        className="btn btn-primary edit"
        onClick={handleEdit}
        href="button"
        //className="btn btn-primary"
      >
        Edit
      </button>
      <button
        id="delete"
        className="btn btn-primary delete"
        onClick={onDeleteFriendsClick}
        href="button"
        //className="btn btn-primary"
      >
        Delete
      </button>
    </div>
  );
};
export default FriendCard;
