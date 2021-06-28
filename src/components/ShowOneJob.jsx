import React from "react";

function ShowOneJob(props) {
  // passing id to parent to pass to JobForm - JTG
  function onEdit(id) {
    props.onEdit(id);
  }

  return (
    <React.Fragment>
      <img
        src={props.job.techCompany.images[0].imageUrl}
        className="card-img-top company-logo center"
        alt="..."
      />
      <div className="card-header text-center">
        <h5 className="card-title">{props.job.pay}</h5>
      </div>
      <div className="card-body">
        <p className="card-text" color="black">
          {props.job.title}
        </p>
      </div>
      <div className="card-footer text-center">
        <button
          type="button"
          className="btn btn-danger mr-3"
          //   onClick={onDelete}
          id="delete"
          data-id={props.job.id}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onEdit(props.job.id)} // concise version of arrow function
          id="edit"
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-light mt-3"
          // onClick={onSeeDetails}
          id="details"
          // data-id={friend.id}
        >
          View More
        </button>
      </div>
    </React.Fragment>
  );
}

export default ShowOneJob;
