import React from "react";
//import Update from "./Update";

function SingleFriend(props) {
  const aFriend = props.friend;

  const onDeleteClicked = function () {
    props.onClick(aFriend);
  };

  const onEditClicked = function () {
    props.onEditClicked(aFriend);
  };

  return (
    <div className="card" key={`Names-${aFriend.id}`}>
      <img
        src={aFriend.primaryImage.imageUrl}
        style={{ width: 200 }}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{aFriend.title}</h5>
        <p className="card-text">{aFriend.summary}</p>
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

export default React.memo(SingleFriend);
