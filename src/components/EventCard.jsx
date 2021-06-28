import React from "react";
import { Button } from "reactstrap";

import debug from "sabio-debug";
const _logger = debug.extend("EventCard");

const EventCard = (props) => {
  // This function takes a event from the event array and returns a formatted react element for that event to be used in the rendering of the page
  // _logger(`Map event:  ${event.headline}`);
  // debugger;
  const event = props.event;
  // _logger("Event: ", event.id);
  // _logger("pause here.");
  // debugger;
  // _logger("Event, TechCo: ", event.techCompany.name);
  // _logger("Event, TechCo, image: ", event.techCompany.images[0].imageUrl);

  const viewEvent = (e) => {
    e.preventDefault();
    _logger("View event: ", event);
    props.clickView(event);
  };

  const editEvent = (e) => {
    e.preventDefault();
    _logger("Edit event: ", event);
    props.clickEdit(event);
  };

  const getFormattedDate = (eventDate) => {
    // This function is used in rendering the main event start date
    // Returns the date string formatted as: Day, Mon Date, Year (ex: Wed, Feb 02, 2021)
    const newDate = new Date(eventDate).toString().split(" ");
    return `${newDate[1]} ${newDate[2]}, ${newDate[3]}`;
  };

  return (
    <div
      className="card border-1 mt-0 ml-0 mr-3 mb-3"
      style={{
        borderColor: "#929089",
        backgroundColor: "rgb(100 152 107 / 30%)",
      }}
    >
      <div className="" style={{ textAlign: "center", alignItems: "center" }}></div>

      <div className="card-body pt-0" style={{ textAlign: "center", overflow: "hidden" }}>
        <h5 className="card-title">{event.name}</h5>
        <h6 className="card-title">{getFormattedDate(event.dateStart)}</h6>
        <p className="card-text m-0" style={{ maxHeight: "200px", overflow: "auto" }}>
          {event.description}
        </p>
      </div>

      <div className="card-footer text-center p-2">
        <div>
          <Button type="submit" color="primary" className=" btn-sm mr-1 viewEvent" onClick={viewEvent}>
            View More
          </Button>
          <Button type="submit" color="secondary" className=" btn-sm mr-1 ml-1 editEvent" onClick={editEvent}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
