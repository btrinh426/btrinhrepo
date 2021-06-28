import React from "react";
import * as eventService from "../../../services/eventService";

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      coordConverterData: {
        unconvertedLat: "", // `45°02'45.8"N`
        unconvertedLon: "", // `123°31'33.6"W`
      },

      eventFormData: this.getDefaultEventForm(),
    };
  }
  // ------------------------------------------- INITIALIZATION ----------------
  getDefaultEventForm = () => {
    return {
      metaData: {
        dateStart: "",
        dateEnd: "",
        location: {
          longitude: 45.0,
          latitude: -123.0,

          zipCode: "",
          address: "",
        },
      },
      name: "",
      headline: "",
      description: "",
      summary: "",
      slug: "",
      statusId: "Active",
    };
  };
  // ------------------------------------------- USER INPUT HANDLERS ----------------

  onConverterFormFieldChanged = (e) => {};
  onEventFormFieldChanged = (e) => {};

  // ------------------------------------------- POSTING DATA ----------------

  // ------------------------------------------- RENDERING ----------------

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* -------------------------------- row */}
            <div className="row"></div>
            <div className="row">
              <h3>Event Form</h3>
            </div>
            {/* -------------------------------- row */}
            <div className="row">
              <p>{eventService.parseLat(`45°02'45.8"N`)}</p>
              <p>{eventService.parseLon(`123°31'33.6"W`)}</p>
            </div>

            {/* ---------------------- LATITUDE ---------- row */}
            <div className="row">
              <label className="px-3" htmlFor="latitude">
                Lat
              </label>
              <input
                type="input"
                className="form-control"
                name="latitude"
                value={this.state.coordConverterData.unconvertedLat}
                onChange={this.onConverterFormFieldChanged}
                placeholder={`45°02'45.8"N`}
              />
            </div>

            {/* ---------------------- LONGITUDE ---------- row */}
            <div className="row">
              <label className="px-3" htmlFor="longitude">
                Lon
              </label>
              <input
                type="input"
                className="form-control"
                name="longitude"
                value={this.state.coordConverterData.unconvertedLon}
                onChange={this.onConverterFormFieldChanged}
                placeholder={`123°31'33.6"W`}
              />
              <button
                type="button"
                className="btn btn-dark"
                id="btnFrndSearch"
                onClick={this.onSearchClicked}
              >
                Calc
              </button>
            </div>
            {/* -------------------------------- row */}
            <div className="row"></div>
            {/* -------------------------------- row */}
            <div className="row"></div>
            {/* -------------------------------- row */}
            <div className="row"></div>
            {/* -------------------------------- row */}
            <div className="row"></div>
            {/* -------------------------------- row */}
            <div className="row"></div>
            <button
              className="btn btn-secondary btn-sm ml-2 mb-1"
              onClick={this.onAddClicked}
            >
              Submit
            </button>
            {/* -------------------------------- row */}
            <div className="row"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventForm;

/**
 *  example POST
{
  "metaData": {
    "dateStart": "2020-12-06T01:59:06.1030Z",
    "dateEnd": "2020-12-06T02:59:06.1130Z",
    "location": {
      "latitude": 45.046055555,
      "longitude": -123.526,
      "zipCode": "97396",
      "address": "8765 Yamhill River Rd, Willamina, OR"
    }
  },
  "name": "name 2",
  "headline": "headline 1",
  "description": "description 1",
  "summary": "summary 1",
  "slug": "slug 2",
  "statusId": "Active"
}

 */
