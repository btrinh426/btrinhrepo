import React from "react";

function SingleJob(props) {
  const oneJob = props.job;
  //console.log('this is one job:', oneJob)

  const onEditClickedFull = () => {
    props.onEditClick(oneJob);
  };

  const onDeleteClickedFull = () => {
    props.onDeleteClicked(oneJob);
  };

  return (
    <div>
      <h5 className="card-title">{oneJob.title}</h5>

      <div className="card-jobs col-md-3">
        <img
          className="card-img-top"
          //https://i.insider.com/4c9a30627f8b9a1e41f60100?width=600&format=jpeg&auto=webp
          src={
            "https://i.insider.com/4c9a30627f8b9a1e41f60100?width=600&format=jpeg&auto=webp"
          }
          //src={jobProps.job.techCompany.images[0].imageUrl}
          alt="Work Location"
        />
        <div className="card-body">
          <h2 className="card-salary">{oneJob.pay}</h2>
          <h5 className="card-title">{oneJob.title}</h5>
          <p className="card-text">
            {oneJob.techCompany.contactInformation.data}
          </p>
          <p className="skills">{oneJob.skills[0].name}</p>
          <button
            className="btn btn-secondary btn-md"
            // id={oneJob.id} // nav me to edit job pg
            onClick={onEditClickedFull} // best way to pass entire fx to this button
            // data-job-id={oneJob.id}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-md"
            // id={oneJob.id}
            onClick={onDeleteClickedFull}
            // data-job-id={oneJob.id}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SingleJob);
