import React from "react";
import PropTypes from "prop-types";

function SingleFriend(props) {
  const friend = props.propsFriend;

  const editButton = function () {
    props.onClickForEdit(friend);
  };

  const deleteButton = function () {
    props.onClickForDelete(friend);
  };

  return (
    <div className="card col-md-3">
      <div className="card-body">
        <img src={friend.primaryImageUrl} alt="Smiley face"></img>
        <h5 className="card-title">{friend.title}</h5>
        <div>
          <h5 className="card-summary">{friend.summary}</h5>
        </div>
        <p className="card-text"></p>
        <button onClick={editButton} href="#" className="btn btn-primary">
          Edit
        </button>

        <button onClick={deleteButton} href="#" className="btn btn-primary">
          Delete
        </button>
      </div>
    </div>
  );
}

SingleFriend.propTypes = {
  propsFriend: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    primaryImageUrl: PropTypes.string.isRequired,
  }),
};

export default React.memo(SingleFriend);
