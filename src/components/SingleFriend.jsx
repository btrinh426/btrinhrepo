import React from "react";
import "sweetalert2/dist/sweetalert2.css";

function SingleFriend(props) {
  const aFriend = props.firend; //* we ddefined a property called "friends" & we gonna pass it thru here from the parent compo (Friends)
  // ** This way, we are actually passing the object "friend" into the func SingleFriend
  const onDeleteRequested = function () {
    props.deleteAFriend(aFriend);
  };
  const onEditRequested = function () {
    props.EditAFriend(aFriend);
  };
  // *** ^^^ This way, when "edit" btn is clicked, we send the chosen obj to the parent (Friends.jsx)

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
          onClick={onEditRequested}
        >
          Edit
        </button>
        {/* **** This btn ONLY populates the form with the selected obj info!!! */}
      </div>
    </div>
  );
}

export default React.memo(SingleFriend);
