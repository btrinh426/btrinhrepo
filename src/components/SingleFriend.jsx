import React from "react";

function SingleFriend(props) {
  const aFriend = props.friend;

  //function onDeleteClicked() {}
  const onDeleteClicked = function () {
    props.onClick(aFriend);
  };

  return (
    <div className="card" key={`Names-${aFriend.id}`}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{aFriend.title}</h5>
        <p className="card-text">{aFriend.summary}</p>
        <button className="btn btn-primary link-btn">edit</button>
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
