import React from "react";
// import JobModal from "./JobModal";

function AJob({ handleEdit, handleDelete, oneJob, viewModal }) {
  function onDelClicked(e) {
    handleDelete(oneJob);
  }

  function onEditClicked(e) {
    handleEdit(oneJob);
  }

  function onViewMoreClicked(e) {
    // // console.log("load modal please");
    // return <JobModal />;
    viewModal(oneJob);
  }
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={oneJob.coImageUrl}
              className="card-img"
              alt="company logo"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="row">
                <h5 className="card-title col-md-4">{oneJob.title}</h5>
                <h6 className="ml-1 col-md-7"> {oneJob.slug}</h6>
              </div>
              <h5 className="card-text">{oneJob.techCompany.name}</h5>
              <p className="card-text">{oneJob.summary}</p>
              <p className="card-text">{oneJob.description}</p>
              <h4>${oneJob.pay}</h4>
              <h4 className="card-text">{oneJob.skillsStrg}</h4>
              <p className="card-text">
                {oneJob.techCompany.contactInformation.data}
              </p>
              <div className="row float-right">
                <button
                  type="button"
                  className="btn btn-dark btnFrndCardEdit"
                  onClick={onViewMoreClicked}
                >
                  View More...
                </button>
                <button
                  type="button"
                  className="btn btn-dark btnFrndCardEdit mx-1"
                  onClick={onEditClicked}
                >
                  Edit...
                </button>
                <button
                  type="button"
                  className="btn btn-danger  btnFrndCardDelete"
                  onClick={onDelClicked}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(AJob);
