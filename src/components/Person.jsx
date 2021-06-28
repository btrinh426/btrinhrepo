import React from "react";

const Person = (props) => {
  const deleteButton = () => {
    props.handleDelete(props.friend.id);
  };

  const onEditClicked = () => {
    props.handleEdit(props.friend);
  };

  return (
    <div className="card col-md-3 card-people">
      <img
        src={props.friend.primaryImage.imageUrl}
        alt="ken"
        className="rounded-circle card-img-top"
      />
      <div className="card-body">
        <h3 className="card-title">{props.friend.title}</h3>
        <p className="card-text">{props.friend.bio}</p>
      </div>
      <div className="card-footer">
        <input
          type="button"
          className="btn btn-primary edit-btn"
          value="edit"
          onClick={onEditClicked}
        />
        <input
          type="button"
          className="btn btn-primary delete-btn"
          value="delete"
          onClick={deleteButton}
        />
      </div>
    </div>
  );
};

export default Person;
