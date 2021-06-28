import React from "react";

function FirstEvent(props) {
  const singleEvent = props.event;
  const mapRef = props.mapDiv;
  return (
    <div className="p-5">
      <h4 className="mb-1">{singleEvent.name}</h4>
      <div className="d-flex w-100 justify-content-between mb-1">
        <small>slug: {singleEvent.slug}</small>
        <small>{singleEvent.dateStart.split("T")[0]}</small>
      </div>
      <div className="w-100 mt-1">
        <p className="mb-1">Description: {singleEvent.description}</p>
      </div>
      <div
        className="d-flex w-100 justify-content-around p-5"
        style={{ height: "800px" }}
      >
        <div ref={mapRef} id="map1" style={props.style}></div>

        <div
          style={{
            position: "relative",
            top: "20%",
            right: "5%",
            width: "20rem",
          }}
        >
          <h5 className="mb-3">Event Location</h5>
          <div>{singleEvent.location.address}</div>
          <div className="mb-1">{singleEvent.location.zipCode}</div>
          <div>Date: {singleEvent.dateStart.split("T")[0]}</div>
        </div>
      </div>
    </div>
  );
}

export default FirstEvent;
