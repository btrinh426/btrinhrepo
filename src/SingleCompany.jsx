import React, { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

function SingleCompany(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const oneCompany = props.Companies;
  function onDeleteJobById() {
    props.onDelete(oneCompany);
  }
  function editJobById() {
    props.onEdit(oneCompany);
  }
  return (
    <React.Fragment key={oneCompany.id}>
      <div className="col-lg-4">
        <div className="card">
          <button
            key={oneCompany.id}
            type="button"
            className="btn btn-danger deleteSchool mt-2"
            name={oneCompany.id}
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
              src={oneCompany.slug}
              className="card-img-top center"
              alt=""
              style={{ width: "150px", textAlign: "center" }}
            />
          </div>
          <hr />
          <div className="card-body">
            <h2 className="card-title">{oneCompany.pay}</h2>
            <p className="card-text">{oneCompany.title}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{oneCompany.description}</li>
            <li className="list-group-item">{oneCompany.techCompany.name}</li>
          </ul>
          <div className="card-body">
            <button
              key={oneCompany.id}
              style={{ float: "right" }}
              type="button"
              className="btn btn-danger deleteSchool mt-2"
              name={oneCompany.id}
              onClick={onDeleteJobById}
            >
              Delete
            </button>
            <button
              style={{ float: "left" }}
              type="button"
              className="btn btn-danger editSchool mt-2"
              name={oneCompany.id}
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
            <li className="list-group-item">Title: {oneCompany.title}</li>
            <li className="list-group-item">Salary: {oneCompany.pay}</li>
            <li className="list-group-item">
              Location: {oneCompany.description}
            </li>
            <li className="list-group-item">Summary: {oneCompany.summary}</li>
            <li className="list-group-item">
              Company: {oneCompany.techCompany.name}
            </li>
            <li className="list-group-item">
              Skills Required:
              {oneCompany.skills.map((name) => name.name).join("  ")}
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

export default React.memo(SingleCompany);
