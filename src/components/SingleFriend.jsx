import React from "react";

const SingleFriend = (props) => {
  const oneFriend = props.friend;

  const onFriendDeleteClick = (e) => {
    e.preventDefault();
    props.deleteOneFriend(oneFriend.id);
  };

  const handleEdit = () => {
    props.onEditFriend(props.friend.id);
  };

  return (
    <div className="card w-20">
      <img
        src={oneFriend.primaryImage.imageUrl}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body" />
      <h5 className="card-title">{oneFriend.title}</h5>
      <p className="card-text">{oneFriend.bio}</p>
      <button
        id="delete"
        className="btn btn-primary delete"
        onClick={onFriendDeleteClick}
        data-friend-id={oneFriend.id}
      >
        Delete
      </button>
      <button onClick={handleEdit} id="edit" className="btn btn-primary edit">
        Edit
      </button>
    </div>
  );
};

export default React.memo(SingleFriend);
