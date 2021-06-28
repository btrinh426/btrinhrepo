import React from "react";
import PropTypes from "prop-types";

import debug from "sabio-debug";

const _logger = debug.extend("SingleFriend");

function SingleFriend(props) {
  const aFriend = props.friend;
  _logger(props.SingleFriend);

  const onDeleteClicked = function () {
    props.onClick(aFriend);
  };

  const onEditClicked = function () {
    props.onEditClicked(aFriend);
  };

  return (
    <div className="card" key={`Names-${aFriend.id}`}>
      <img
        src={aFriend.primaryImageId}
        style={{ width: 200 }}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{aFriend.title}</h5>
        <p className="card-text">{aFriend.bio}</p>
        <p className="card-text">{aFriend.headline}</p>
        <button
          className="btn btn-primary link-btn"
          onClick={onEditClicked}
          data-id={aFriend.id}
        >
          edit
        </button>
        <button
          className="btn btn-primary link-btn"
          onClick={onDeleteClicked}
          data-id={aFriend.id}
        >
          delete
        </button>
      </div>
    </div>
  );
}

SingleFriend.propTypes = {
  singleFriend: PropTypes.object,
};

export default React.memo(SingleFriend);
