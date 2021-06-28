import React from "react";

function SingleJob(props) {
  const oneJob = props.mappedJobs;

  return (
    <div key={oneJob.id}>
      <div
        id="root"
        className="card"
        style={{ width: "19rem", margin: "1rem" }}
      >
        <img
          src={oneJob.images.imagUrl}
          className="card-img-top"
          alt="tech company"
        />
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-none">{oneJob.id}</li>
            <li className="list-group-item">
              <h4 className="title">{oneJob.pay}</h4>
            </li>
            <li className="list-group-item">{oneJob.title}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SingleJob);
