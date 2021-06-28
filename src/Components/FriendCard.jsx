import React from "react";
import { Button } from "reactstrap";

const FriendCard = (props) => {
  const friend = props.friend;

  const updateFriend = (e) => {
    e.preventDefault();
    props.clickEdit(friend.id);
  };

  const removeFriend = (e) => {
    e.preventDefault();
    props.clickDelete(friend.id);
  };

  return (
    <div
      className="card border-1 mt-0 ml-0 mr-3 mb-3"
      style={{
        width: "15rem",
        height: "30rem",
        borderColor: "#db8ad2",
        backgroundColor: "#fae6f8 !important",
      }}
    >
      <div className="">
        <img
          className="friend-card-img"
          src={
            friend.primaryImage
              ? friend.primaryImage.imageUrl
              : this.defaultFriendImage
          }
          alt="Card cap"
        />
      </div>

      <div className="card-body">
        <h5 className="friendTitle">{friend.title}</h5>
        <p className="card-text m-0">{friend.summary}</p>
      </div>
      <div className="card-footer text-center">
        <div>
          <Button
            type="submit"
            color="primary"
            className="btn-sm updateFriend mr-3"
            onClick={updateFriend}
          >
            Edit
          </Button>
          <Button
            type="submit"
            color="danger"
            className="btn-danger btn-sm removeFriend"
            onClick={removeFriend}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
