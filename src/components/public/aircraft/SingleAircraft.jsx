import React from "react";

function SingleAircraft({ anAircraft }) {
  return (
    <div className="card mb-3 aircraftCard row">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            //{anAircraft.photoUrl}
            src=""
            className="card-img"
            alt={anAircraft.name}
          />
        </div>
        <div className="col-md-8">
          <div className="d-none hiddenPocket"></div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h5 className="card-title">{anAircraft.name}</h5>
              </div>
              <div className="col text-center">
                <h6 className="card-years">1907-Still Operational</h6>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="card-manuf">{anAircraft.manufacturer}</h6>
              </div>
              <div className="col">
                <p className="card-engine">Reciprocating Internal combustion</p>
              </div>
            </div>
            <p className="card-designations bg-light text-dark">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <div className="row">
              <div className="col bg-dark text-center">
                <p className="card-weblink px-3"></p>
              </div>
              <div className="col">
                <p className="card-futureExp"></p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="card-text">
                  <small className="text-muted createdate">Created:</small>
                </p>
              </div>
              <div className="col">
                <p className="card-text">
                  <small className="text-muted moddate">
                    Last updated 3 mins ago
                  </small>
                </p>
              </div>
              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-secondary cardEditButton "
                >
                  Edit...
                </button>
                <button
                  type="button"
                  className="btn btn-danger cardDeleteButton "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-3">
        <div className="col-md-12">
          <p className="card-narrative">anAircraft.narrative</p>
        </div>
      </div>
    </div>
  );
}

export default SingleAircraft;
