import React from "react";

function SingleEvent(props) {
  const singleEvent = props.event;
  const updateEvent = () => {
    props.edit(singleEvent);
  };

  const viewMoreEvent = () => {
    props.viewMore(singleEvent);
  };
  const borderStyle = {
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",

    boxShadow: "1px 3px 1px #dfe6e9",
    fontSize: "0.8rem",
  };
  return (
    <div className="p-3 m-2" style={borderStyle}>
      <h4 className="mb-1">{singleEvent.name}</h4>
      <div className="d-flex w-100 justify-content-between mb-1">
        <small>slug: {singleEvent.slug}</small>
        <small>{singleEvent.dateStart.split("T")[0]}</small>
      </div>
      <div className="w-100 mt-1">
        <p className="mb-1">
          Description: {singleEvent.description.slice(0, 150) + " ..."}
        </p>
      </div>
      <div className="d-flex w-100 justify-content-between p-3">
        <div></div>
        <div>
          <div>{singleEvent.location.address}</div>
          <div>{singleEvent.location.zipCode}</div>
        </div>
      </div>
      <div className="card-body">
        <button
          className="btn btn-info mr-2"
          onClick={updateEvent}
          data-friend-id={singleEvent.id}
        >
          Edit
        </button>
        <button className="btn btn-info" onClick={viewMoreEvent}>
          View More
        </button>
      </div>
    </div>
  );
}

export default SingleEvent;
