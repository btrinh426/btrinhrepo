import React from "react";

function EventLarge(props) {
  return (
    <div className="col d-flex justify-content-center">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <div className="d-flex justify-content-around">
            <button type="button" className="btn btn-primary" name="view">
              View
            </button>
            <button type="button" className="btn btn-primary" name="view">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventLarge;
