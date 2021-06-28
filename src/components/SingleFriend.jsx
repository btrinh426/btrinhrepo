import React, { Component, useDebugValue } from "react";
import * as userService from "../services/userService";
import * as friendService from "../services/friendService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

function SingleFriend(props) {
  const aFriend = props.firend; //* we ddefined a property called "friends" & we gonna pass it thru here from the parent compo (Friends)
  // ** This way, we are actually passing the object "friend" into the func SingleFriend
  const onDeleteRequested = function () {
    props.deleteAFriend(aFriend);
  };
  const onEditeRequested = function () {
    props.EditAFriend(aFriend);
  };
  return (
    <div className="card col-md-3">
      <img
        className="card-img-top"
        src={aFriend.primaryImage.imageUrl}
        alt={aFriend.title}
      />
      <div className="card-body">
        <h5 className="card-title">{aFriend.title}</h5>
        <p className="card-text">{aFriend.summary}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onDeleteRequested}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onEditeRequested}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleFriend);
