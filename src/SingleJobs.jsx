import React from "react";

function SingleJob(props) {
  const oneJob = props.job;

  function onEditClicked() {
    props.onEdit(oneJob);
  }

  function onDeleteClicked() {
    props.onDelete(oneJob);
  }

  function mapSkills(skills) {
    var skillName = skills.name;
    return skillName;
  }

  return (
    <div className="card col-md-3">
      <img
        className="card-img-top"
        src={oneJob.techCompany.images[0].imageUrl}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{oneJob.title}</h5>
        <p className="card-text">
          Salary: ${oneJob.pay.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="card-text">
          Skills: {oneJob.skills.map(mapSkills).join(", ")}
        </p>
        <button
          className="btn btn-primary link-button"
          onClick={onEditClicked}
          data-friend-id={oneJob.id}
        >
          Edit
        </button>
        <button
          className="btn btn-primary link-button deleteBtn"
          onClick={onDeleteClicked}
          data-friend-id={oneJob.id}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(SingleJob);
