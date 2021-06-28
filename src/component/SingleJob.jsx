import React from "react";
import ViewModal from "./ViewModal";

function SingleJob(props) {
  const oneJob = props.job;
  const onEditClicked = function () {
    props.onEditClick(oneJob);
  };
  const onDeleteClicked = function () {
    props.onDeleteClick(oneJob);
  };
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="job card card-profile text-center">
      <img
        src={oneJob.techCompany.images[0].imageUrl}
        className="job card-img-profile mt-5"
        alt="..."
      />
      <div className="card-body">
        <h3 className="card-title">{oneJob.pay}</h3>
        <h5 className="card-title">{oneJob.title}</h5>
        <p className="card-text">{oneJob.summary}</p>
        <p className="card-text">skill required : {oneJob.skills[0].name}</p>
        <button
          type="button"
          onClick={onEditClicked}
          data-friend-id={oneJob.id}
          className="btn btn-secondary mr-3"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDeleteClicked}
          data-friend-id={oneJob.id}
          className="btn btn-danger mr-3"
        >
          delete
        </button>
        <button onClick={setModalIsOpenToTrue} className="btn btn-info">
          View More
        </button>
        <ViewModal
          isViewModalOpen={modalIsOpen}
          title={oneJob.title}
          pay={oneJob.pay}
          description={oneJob.description}
          summary={oneJob.summary}
          skills={oneJob.skills[0].name}
          profile={oneJob.techCompany.profile}
          toggleViewModal={setModalIsOpenToFalse}
        ></ViewModal>
      </div>
    </div>
  );
}
export default React.memo(SingleJob);
