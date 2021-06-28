import React from "react";

function SingleEvent(props) {
  const event = props.event;

  function onViewEvent() {
    props.onView(event);
  }

  function onEditEvent() {
    props.onEdit(event);
  }

  return (
    <div className="card mb-1">
      <div className="card-header">
        <h6 className="text-center">{event.name}</h6>
      </div>
      <div className="card-body">
        <p className="text-muted">
          <small>Date:</small>
        </p>
        <p>{event.headline}</p>
        <button
          type="button"
          className="btn btn-link float-left"
          onClick={onViewEvent}
          data-event-id={event.id}
        >
          <small>View More &raquo;</small>
        </button>
        <button
          type="button"
          className="btn btn-link float-right"
          onClick={onEditEvent}
        >
          <small>Edit &raquo;</small>
        </button>
      </div>
    </div>
  );
}

export default SingleEvent;
