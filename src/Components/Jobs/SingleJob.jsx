import React from "react";

function SingleJob(props) {
  const oneJob = props.currentJobs;
  function onDeleteJob() {
    props.onDeleteJ(oneJob);
  }
  function onEditJob() {
    props.onEditJ(oneJob);
  }

  return (
    <div key={oneJob.id}>
      <div
        id="root"
        className="card"
        style={{ width: "19rem", margin: "1rem" }}
      >
        <img
          src={oneJob.techCompany.images[0].imageUrl}
          className="card-img-top"
          alt="tech company"
        />
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-none">{oneJob.id}</li>
            <li className="list-group-item">
              <h4 className="title">${oneJob.pay}</h4>
            </li>
            <li className="list-group-item">{oneJob.title}</li>
            <li className="list-group-item">{oneJob.skills[0].name}</li>
            <div
              style={{
                display: "flex",
                margin: "1rem",
                justifyContent: "space-evenly",
              }}
            >
              <button
                key={oneJob.id}
                className="btn btn-light btn-outline-secondary"
                name={oneJob.id}
                onClick={onEditJob}
              >
                Edit
              </button>
              <button
                className="btn btn-light btn-outline-secondary"
                name={oneJob.id}
                onClick={onDeleteJob}
              >
                Delete
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SingleJob);
