import React from "react";

function EventCards(props) {
  let cleanDate = (eventDate) => {
    let rawDate = new Date(eventDate);
    let cleanDate =
      rawDate.getMonth() +
      1 +
      "/" +
      rawDate.getDate() +
      "/" +
      rawDate.getFullYear();
    return cleanDate;
  };

  let editEvent = () => {
    let updatedPayload = { ...props.event };
    updatedPayload.metaData.dateStart = cleanDate(
      updatedPayload.metaData.dateStart
    );
    updatedPayload.metaData.dateEnd = cleanDate(
      updatedPayload.metaData.dateEnd
    );
    props.editEvent(updatedPayload);
  };

  return (
    <div className="card mb-1">
      <div className="card-body">
        <h5 className="card-title">{props.event.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {cleanDate(props.event.metaData.dateStart)}
        </h6>
        <p className="card-text">{props.event.headline}</p>
        <div className="d-flex row justify-content-between ml-1 mr-2">
          <button className="btn btn-sm btn-primary col-3">View</button>
          <button
            className="btn btn-sm btn-secondary col-2"
            onClick={editEvent}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCards;
