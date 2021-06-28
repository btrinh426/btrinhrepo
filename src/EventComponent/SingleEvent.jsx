import React, { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

function SingleEvent(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const oneEvent = props.events;
  function onDeleteEventById() {
    props.onDeleteById(oneEvent);
  }
  function onEditEventById() {
    props.onEdit(oneEvent);
  }
  return (
    <React.Fragment key={oneEvent.id}>
      <div className="col-lg-4">
        <div className="card">
          <button
            key={oneEvent.id}
            type="button"
            className="btn btn-danger deleteSchool mt-2"
            name={oneEvent.id}
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
              src={oneEvent.slug}
              className="card-img-top center"
              alt=""
              style={{ width: "150px", textAlign: "center" }}
            />
          </div>
          <hr />
          <div className="card-body">
            <h2 className="card-title">{oneEvent.name}</h2>
            <p className="card-text">{oneEvent.headline}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{oneEvent.description}</li>
            <li className="list-group-item">{oneEvent.summary}</li>
          </ul>
          <div className="card-body">
            <button
              key={oneEvent.id}
              style={{ float: "right" }}
              type="button"
              className="btn btn-danger deleteSchool mt-2"
              name={oneEvent.id}
              onClick={onDeleteEventById}
            >
              Delete
            </button>
            <button
              style={{ float: "left" }}
              type="button"
              className="btn btn-danger editSchool mt-2"
              name={oneEvent.id}
              onClick={onEditEventById}
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
            <li className="list-group-item">
              Longitude: {oneEvent.metaData.longitdue}
            </li>
            <li className="list-group-item">
              Latitude: {oneEvent.metaData.latitude}
            </li>
            <li className="list-group-item">Salary: {oneEvent.pay}</li>
            <li className="list-group-item">
              Location: {oneEvent.description}
            </li>
            <li className="list-group-item">Summary: {oneEvent.summary}</li>
            <li className="list-group-item">
              Start: {oneEvent.metaData.dateStart}
            </li>
            <li className="list-group-item">
              End: {oneEvent.metaData.dateEnd}
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

export default React.memo(SingleEvent);
