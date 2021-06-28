import React from "react";
import * as entityService from "../../../services/entityService";
import SingleAircraft from "./SingleAircraft";
import debug from "sabio-debug";

const _logger = debug.extend("Aicraft");

class Aircraft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aircraftList: [],
      // mappedAircraftList: [],
      entityName: "aircraft",
    };
    _logger("constructor");
  }
  // --------------------- INITALIZATION --------------------------------
  componentDidMount() {
    _logger("compoonentDidMountFiring");
    entityService
      .getAllByName(this.state.entityName)
      .then(this.onGetByPageSuccess)
      .catch(this.onGetByPageError);
  }
  onGetByPageSuccess = (data) => {
    console.log("... Aircraft . onGetByPageSuccess", data);
    this.renderAircraft(data.items);
  };
  onGetByPageError = (error) => {
    console.log("... Aircraft . onGetByPageError", error);
  };

  onAircraftDeleteClick = (evt) => {
    _logger("Aircraft onAircraftDeleteClick", evt);
  };
  onAircraftEditClick = (evt) => {
    _logger("Aircraft onAircraftEditClick", evt);
  };

  // --------------------- RENDER --------------------------------
  renderAircraft = (someAircraft) => {
    _logger("renderAircraft");

    this.setState((prevState) => {
      _logger("setState renderAircraft");

      return {
        ...prevState,
        mappedAircraftList: someAircraft.map(this.mapSingleAircraft),
      };
    });
  };

  mapSingleAircraft = (anAircraft) => {
    if (!anAircraft.photoUrl || anAircraft.photoUrl === "") {
      anAircraft.photoUrl = "./300px-notonfile.png";
    }

    return (
      <React.Fragment key={`aircraft-${anAircraft.id}`}>
        <SingleAircraft
          aircraft={SingleAircraft}
          onDeleteClick={this.onAircraftDeleteClick}
          onEditClick={this.onAircraftEditClick}
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">Aircraft</div>
        </div>
        <div className="row">{this.state.mappedAircraftList}</div>
      </div>
    );
  }
}

export default Aircraft;
