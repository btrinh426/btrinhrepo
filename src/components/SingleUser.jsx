import React from "react";
import debug from "sabio-debug";

const _logger = debug.extend("SingleUser");

function SingleUser(props) {
  const aUser = props.user;
  _logger("singleuserprops");
  const onDeleteClicked = function () {
    props.onClick(aUser);
  };

  const onEditClicked = function () {
    props.onClick(aUser);
  };
  return (
    <div className="card" key={`Names-${aUser.id}`}>
      <img
        src={aUser.avatarUrl}
        style={{ width: 200 }}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{aUser.firstName}</h5>
        <p className="card-text">{aUser.lastName}</p>
        <p className="card-text">{aUser.email}</p>
        <button
          className="btn btn-primary link-btn"
          onClick={onEditClicked}
          data-id={aUser.id}
        >
          edit
        </button>
        <button
          className="btn btn-primary link-btn"
          onClick={onDeleteClicked}
          data-id={aUser.id}
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleUser);
