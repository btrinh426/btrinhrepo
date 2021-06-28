import React, { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

function SingleJob(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const oneJob = props.jobs;
  function onDeleteJobById() {
    props.onDelete(oneJob);
  }
  function editJobById() {
    props.onEdit(oneJob);
  }
  return (
    <React.Fragment key={oneJob.id}>
      <div className="col-lg-4">
        <div className="card">
          <button
            key={oneJob.id}
            type="button"
            className="btn btn-danger deleteSchool mt-2"
            name={oneJob.id}
            onClick={() => setModalIsOpen(true)}
          >
            View More
          </button>
          <div
            className="card-body"
            style={{
              textAlign: "center",
              width: "100%",
              height: "15vw",
              objectfit: "cover",
            }}
          >
            <img
              src={oneJob.slug}
              className="card-img-top center"
              alt=""
              style={{ width: "150px", textAlign: "center" }}
            />
          </div>
          <hr />
          <div className="card-body">
            <h2 className="card-title">{oneJob.pay}</h2>
            <p className="card-text">{oneJob.title}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{oneJob.description}</li>
            <li className="list-group-item">{oneJob.techCompany.name}</li>
          </ul>
          <div className="card-body">
            <button
              key={oneJob.id}
              style={{ float: "right" }}
              type="button"
              className="btn btn-danger deleteSchool mt-2"
              name={oneJob.id}
              onClick={onDeleteJobById}
            >
              Delete
            </button>
            <button
              style={{ float: "left" }}
              type="button"
              className="btn btn-danger editSchool mt-2"
              name={oneJob.id}
              onClick={editJobById}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{ content: { color: "blue" } }}
        className="modal-dialog modal-lg modal-dialog-centered"
      >
        <div className="col card">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Title: {oneJob.title}</li>
            <li className="list-group-item">Salary: {oneJob.pay}</li>
            <li className="list-group-item">Location: {oneJob.description}</li>
            <li className="list-group-item">Summary: {oneJob.summary}</li>
            <li className="list-group-item">
              Company: {oneJob.techCompany.name}
            </li>
            <li className="list-group-item">
              Skills Required:
              {oneJob.skills.map((name) => name.name).join(",")}
            </li>
            <button
              className="btn btn-danger deleteSchool mt-2"
              onClick={() => setModalIsOpen(false)}
            >
              Close
            </button>
          </ul>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default React.memo(SingleJob);
