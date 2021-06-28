import React from "react";

let SingleJob = (props) => {
  const oneJob = props.job;

  return (
    <div className="card col-md-3">
      <img
        src={oneJob.images && oneJob.images.imageUrl}
        style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{oneJob.name}</h5>
        <p className="card-text">{oneJob.contactInformation}</p>
      </div>
    </div>
  );
};
export default React.memo(SingleJob);
