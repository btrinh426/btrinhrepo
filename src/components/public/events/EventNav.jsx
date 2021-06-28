import React from "react";
import EventItem from "./EventItem";
import * as eventService from "../../../services/eventService";

class EventNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordFormField: {
        longitude: "",
        latitude: "",
        convertedLat: "",
        convertedLon: "",
      },
    };
  }
  onAddClicked = (e) => {
    this.props.history.push("/events/add");
  };

  onCoordFormFieldChanged = (e) => {};

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>EventNav</h3>
            <p>{eventService.parseLat(`45°02'45.8"N`)}</p>
            <p>{eventService.parseLon(`123°31'33.6"W`)}</p>

            <button
              className="btn btn-secondary btn-sm ml-2 mb-1"
              onClick={this.onAddClicked}
            >
              Add
            </button>
            <EventItem />
            <EventItem />
            <EventItem />
            <EventItem />
          </div>
        </div>
      </div>
    );
  }
}

export default EventNav;
