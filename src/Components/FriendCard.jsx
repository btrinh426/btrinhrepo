import React from "react";

const FriendCard = (props) => {
  console.log(props);
  
  const handleEdit = () => {
    props.editHandle(props.friends)
  }
  const handleDelete = () => {
    props.deleteHandle(props.friends.id);
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={props.friends.primaryImage.imageUrl && props.friends.primaryImage.imageUrl}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{props.friends.title}</h5>
        <hr />
        <div className="card-text">{props.friends.bio}</div>
        <div style={{ flex: 1, marginBottom: 20 }}></div>
        <button
          type="button"
          className="btn btn-primary btn"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Tooltip on top"
          onClick={handleEdit}
          style={{ flex: 1, marginRight: 110 }}
        >
          Edit
        </button>
        &nbsp;
        <button
          type="button"
          className="btn btn-primary btn-danger"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Tooltip on left"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
