import React from "react";

function CompaniesList(props) {
  const oneCompany = props.oneCo;
  //console.log('this is one job:', oneCompany)

  const onEditClickedFull = () => {
    props.onEditClick(oneCompany);
  };

  const onDeleteClickedFull = () => {
    props.onDeleteClicked(oneCompany);
  };

  return (
    <div>
      {/* <h5 className="card-title">{oneCompany.contactInformation}</h5> */}

      <div className="card-jobs col-md-3">
        <img
          className="card-img-top"
          //https://i.insider.com/4c9a30627f8b9a1e41f60100?width=600&format=jpeg&auto=webp
          src={
            "https://i.insider.com/4c9a30627f8b9a1e41f60100?width=600&format=jpeg&auto=webp"
          }
          
          alt="Work Location"
        />
        <div className="card-body">
          <h2 className="card-salary">{oneCompany.pay}</h2>
          <h5 className="card-title">{oneCompany.title}</h5>
          {/* <p className="card-text">
            {oneCompany.contactInformation.data}
          </p> */}
          {/* <p className="skills">{oneCompany.skills.name}</p> */}
          <button
            className="btn btn-secondary btn-md"
            // id={oneCompany.id} // nav me to edit job pg
            onClick={onEditClickedFull} // best way to pass entire fx to this button
            // data-job-id={oneCompany.id}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-md"
            // id={oneCompany.id}
            onClick={onDeleteClickedFull}
            // data-job-id={oneCompany.id}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CompaniesList);