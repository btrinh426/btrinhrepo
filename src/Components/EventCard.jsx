import React from "react";

const EventCard = (props) => {
  const onEdit = () => {
    props.onEdit(props.event);
  };

  const onViewMore = () => {
    props.onViewMore(props.event);
  };

  const eventDate = new Date(props.event.metaData?.dateStart).toDateString();

  return (
    <div className="col-md-12">
      <div
        className="event-card"
        style={{
          paddingBotton: "10px",
          marginBottom: "10px",
          borderBottom: "1px solid gray",
        }}
      >
        <h5 className="event-headline text-black-50">{props.event.headline}</h5>
        <div className="event-date text-black-50 custom-padding">
          {eventDate}
        </div>
        <div className="event-summary text-black-50 custom-padding">
          {props.event.summary}
        </div>
        <div className="row">
          <button
            type="button"
            id="viewMore"
            className="btn btn-light viewMore"
            style={{
              marginLeft: "10px",
              marginBottom: "15px",
              marginTop: "15px",
            }}
            onClick={onViewMore}
          >
            View More
          </button>
          <button
            type="button"
            id="editEvent"
            className="btn btn-info editEvent custom float-end"
            style={{
              marginLeft: "185px",
              marginBottom: "15px",
              marginTop: "15px",
            }}
            data-toggle="modal"
            data-target="#eventModal"
            onClick={onEdit}
          >
            Edit
          </button>
        </div>
        <span className="border-bottom"></span>
      </div>
    </div>
  );
};

export default EventCard;
