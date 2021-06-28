import React from "react";
import { Button } from "reactstrap";

const FriendCard = (props) => {
  // This function takes a friend from the friend array and returns a formatted react element for that friend to be used in the rendering of the page
  const friend = props.friend;

  const editFriend = (e) => {
    e.preventDefault();
    props.clickEdit(friend.id);
  };

  const deleteFriend = (e) => {
    e.preventDefault();
    props.clickDelete(friend.id);
  };

  return (
    <div
      className="card border-1 mt-0 ml-0 mr-3 mb-3"
      style={{
        width: "15rem",
        height: "30rem",
        borderColor: "#929089",
        backgroundColor: "rgb(100 152 107 / 30%) !important",
      }}
    >
      <div className="" style={{ textAlign: "center", alignItems: "center" }}>
        <img
          className="friend-card-img"
          style={{ maxHeight: "235px", width: "235px", objectFit: "cover" }}
          src={friend.primaryImage ? friend.primaryImage.imageUrl : this.defaultFriendImage}
          alt="Card cap"
        />
      </div>

      <div className="card-body" style={{ textAlign: "center" }}>
        <h5 className="friendTitle">{friend.title}</h5>
        <p className="card-text m-0">{friend.summary}</p>
      </div>
      <div className="card-footer text-center">
        <div>
          <Button type="submit" color="primary" className="btn-sm editFriend mr-3" onClick={editFriend}>
            Edit
          </Button>
          <Button type="submit" color="danger" className="btn-danger btn-sm deleteFriend" onClick={deleteFriend}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
