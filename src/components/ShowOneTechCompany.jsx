import React from "react";

function ShowOneTechCompany(props) {
  function onEdit(id) {
    props.onEdit(id);
  }

  return (
    <React.Fragment>
      <img
        src={props.company.images[0].imageUrl}
        className="card-img-top company-logo center"
        alt="..."
      />
      <div className="card-header text-center">
        <h5 className="card-title">{props.company.name}</h5>
      </div>
      <div className="card-body">
        <p className="card-text" color="black">
          {props.company.profile}
        </p>
      </div>
      <div className="card-footer text-center">
        <button
          type="button"
          className="btn btn-danger mr-3"
          //   onClick={onDelete}
          id="delete"
          data-id={props.company.id}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onEdit(props.company.id)} // concise version of arrow function
          id="edit"
        >
          Edit
        </button>
      </div>
    </React.Fragment>
  );
} // end ShowOneTechCompany

export default ShowOneTechCompany;
