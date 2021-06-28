import React from "react";
import "sweetalert2/dist/sweetalert2.css";
import Modal from "react-modal";

function SingleJob(props) {
  const aJob = props.job;
  let shouldShow = props.show;

  aJob.pay = "$".concat(aJob.pay.toLocaleString("en")); //** Why toLocaleString() is not working? */
  aJob.primaryImage =
    "https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png";

  const onDeleteRequested = function () {
    props.deleteAJob(aJob);
  };
  const onEditRequested = function () {
    props.editAJob(aJob);
  };
  const onReadMoreRequested = function () {
    props.readMoreAJob();

    console.log("from singleJob: ", { shouldShow }); //** Why its not changing w/ the Jobs.jsx state???????? */
  };

  return (
    <React.Fragment>
      <Modal isOpen={shouldShow}>
        <h5>Modal title</h5>
        <p>Modal body</p>
        {/* //** (aJob) ???? */}
      </Modal>
      <div className="card col-md-3">
        <img
          className="card-img-top"
          src={aJob.primaryImage}
          alt={aJob.title}
        />
        <div className="card-body">
          <h5 className="card-title">{aJob.pay}</h5>
          <p className="card-text">{aJob.title}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onDeleteRequested}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onEditRequested}
          >
            Edit
          </button>
          {/* **** This btn ONLY sends the selected obj info back to Jobs.jsx, we use the jobId to make a getById call, then we populate the form using the data back from the call success.*/}
          <hr />
          <button onClick={onReadMoreRequested}> Read More... </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(SingleJob);
