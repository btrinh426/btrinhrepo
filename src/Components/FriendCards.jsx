import React from "react";
import { NavLink } from "react-router-dom";

let FriendCard = (props) => {
  let deleteFriend = () => {
    props.deleteInvFriend(props.friend);
  };

  return (
    <React.Fragment>
      {/* Start */}

      <img
        className=" userFriend"
        alt="Card cap"
        src={props.friend.primaryImage.imageUrl}
      />
      <div className="card-body" key={`body-${props.friend.id}`}>
        <h5 className="card-title text-center">{props.friend.title}</h5>
        <p className="card-text text-center">{props.friend.headline}</p>
        <div className="card-footer" key={`footer-${props.friend.id}`}>
          <button
            href="#"
            className="btn btn-danger btn-sm"
            name={props.friend.id}
            onClick={deleteFriend}
          >
            Delete
          </button>
          <NavLink
            to={`/main/friends/edit/${props.friend.id}`}
            className="btn btn-secondary btn-sm float-right"
            style={{ width: "60px" }}
            name={props.friend.id}
          >
            Edit
          </NavLink>
        </div>
      </div>

      {/* End */}
    </React.Fragment>
  );
};

export default FriendCard;
