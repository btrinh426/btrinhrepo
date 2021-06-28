import React from "react";

function SingleJob(props) {
  const oneJob = props.job;

  function getImage(oneJob) {
    return (
      oneJob.techCompany.images &&
      oneJob.techCompany.images[0] && (
        <img
          className="card-img-top"
          src={oneJob.techCompany.images[0].imageUrl}
          alt="Company Profile"
          onError={onError}
        />
      )
    );
  }

  function onError(e) {
    e.target.src =
      "https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image.jpg";
  }

  function onEditClicked(e) {
    e.preventDefault();
    console.log(e);
    props.onEditClick(oneJob, e);
  }

  function toggleViewMoreModal() {
    props.onModalClick(oneJob);
  }

  function onDeleteClicked(e) {
    props.onDeleteClick(oneJob, e);
  }

  return (
    <div className="card-job-list col-md-3" key={`JobList-${oneJob.id}`}>
      <div className="card-body">
        {getImage(oneJob)}
        <h5 className="card-title">{oneJob.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">${oneJob.pay}</h6>
        <p className="card-text">{oneJob.techCompany.name}</p>
        <button
          className="btn btn-secondary btn-lg"
          id={oneJob.id}
          onClick={onEditClicked}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-light"
          id={oneJob.id}
          onClick={toggleViewMoreModal}
        >
          View More
        </button>
        <button
          className="btn btn-danger btn-lg"
          id={oneJob.id}
          onClick={onDeleteClicked}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleJob);
