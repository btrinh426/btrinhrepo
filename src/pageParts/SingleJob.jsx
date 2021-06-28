import React from "react";

function SingleJob(props) {
  let job = props.oneJob;
  let photoURL = String(
    `http://localhost:3000/` + job.techCompany.images[0].imageUrl
  );
  console.log(photoURL);

  return (
    <div
      className="friend-card"
      style={{ width: "15rem", textColor: "black", margin: "0.4em" }}
    >
      <div className="card-body">
        <img className="card-img-top" src={photoURL} alt="..." />
        <h3 className="card-pay">{job.pay}</h3>
        <p className="card-title">{job.title}</p>
        <p className="card-summary">{job.summary}</p>
        <p className="card-techCoId d-none">ID</p>
        <p className="card-jobId d-none">ID</p>
        <button
          type="button"
          name="deleteJob"
          className="btn btn-primary delete"
        >
          Delete
        </button>
        <button type="button" name="editJob" className="btn btn-secondary edit">
          Edit
        </button>
        <button
          type="button"
          name="viewMore"
          className="btn btn-secondary viewMore"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          View More
        </button>
      </div>
    </div>
  );
}
export default React.memo(SingleJob);
