import React from "react";
import { Formik, Form } from "formik";
import { TextField, Button, Radio } from "@material-ui/core";
import * as Yup from "yup";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import * as eventService from "../services/eventService";
import EventCard from "./EventCard";

import debug from "sabio-debug";
const _logger = debug.extend("EventLocationSearch");

const validationSchema = Yup.object().shape({
  address: Yup.string()
    .max(50, "Maximum of 50 characters allowed.")
    .when("searchOption", { is: "address", then: Yup.string().required("Address required.") }),
  latitude: Yup.string().when("searchOption", {
    is: "latLng",
    then: Yup.string().required("Latitude is required (DD.DDDD, DD MM.MMM or DD MM SS).    "),
  }),
  longitude: Yup.string().when("searchOption", {
    is: "latLng",
    then: Yup.string().required("Longitude is required (DD.DDDD, DDD MM.MMM, or DDD MM SS)."),
  }),
  distance: Yup.string().required("Search distance required."),
});

class EventLocationSearch extends React.Component {
  state = {
    searchFormData: {
      address: "San Diego, CA",
      latitude: "",
      longitude: "",
      distance: "100",
      searchOption: "address",
    },
    events: [],
    eventObjs: [],
  };

  componentDidMount = () => {
    _logger("componentDidMount");
    this.loadGMaps();
  };

  componentDidUpdate = (prevProps, prevState) => {
    _logger("componentDidUpdate");
    if (prevState.events !== this.state.events) {
      const eventObjs = [...this.state.events].map(this.mapSingleEvent);
      this.setState(() => {
        return { eventObjs };
      });
    }
  };

  mapSingleEvent = (aEvent) => {
    // This function is called from the "updateStateWithEvents" method, the "onGetEventByDateRangeSuccess" method,
    // This function takes a event from the event array and returns a formatted react element for that event to be used in the rendering of the page
    return (
      <div
        className={aEvent.statusId !== "Active" ? " cardparent notInDatabase" : "cardParent"} // This sets a classname for future use
        key={aEvent.id.toString()}
        id={aEvent.id}
      >
        <EventCard event={aEvent} clickView={this.clickEventCardViewButton} clickEdit={this.clickEventCardEditButton} />
      </div>
    );
  };

  clickSubmitButton = async (values) => {
    this.loadGMaps();
    // console.log(`Clicked submit. Search via ${values.searchOption}.`);
    const { lat, lng } = await this.formatSearchLoc(values);
    // console.log(`The formatted lat/lng are ${lat}/${lng}`);
    // Make AJAX search call here
    eventService
      .getEventsByRadius(lat, lng, values.distance)
      .then(this.onGetLocSearchSuccess)
      .catch(this.onGetLocSearchError);
  };

  onGetLocSearchSuccess = (response) => {
    // console.log("Success:  ", response);
    // Save events here, and display cards
    this.setState(() => {
      return { events: response.data.item.pagedItems };
    });
  };

  onGetLocSearchError = (error) => {
    console.error("Error:  ", error);
    debugger;
  };

  loadGMaps = () => {
    const existingScript = document.getElementById("googleMaps");
    if (!existingScript) {
      console.log("Loading Google Maps API script.");
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDcfaN_qpX0SIR5slg1HFo4Gxn67MYzr5I&libraries=places";
      script.id = "googleMaps";
      document.body.appendChild(script);
    }
  };

  formatSearchLoc = async (values) => {
    // console.log(`Format the following address & lat/long:`);
    // console.log(`Address:  ${values.address}`);
    // console.log(`Lat/Long: ${values.latitude}/${values.longitude}`);
    //
    if (values.searchOption === "address") {
      //   console.log("Get the lat/lng from address.");
      let geoLoc = await geocodeByAddress(values.address)
        .then((results) => {
          //   console.log("Got geocoder results:   ", results);
          return getLatLng(results[0]);
        })
        .then(({ lat, lng }) => {
          //   console.log("Successfully got latitude and longitude", { lat, lng });
          return { lat, lng };
        })
        .catch((error) => {
          console.error("Could not get lat/lng:  ", error);
          debugger;
          return { lat: 32.73626630980294, lng: -117.14898687546605 };
        });
      return geoLoc;

      // This will check the format of the lat (assumes long is the same format), then format the lat/lng into DD.DDDDDD / DD.DDDDDD format
    } else {
      //   console.log("Format the lat/long.");
      let lat = values.latitude.split("");
      let lng = values.longitude.split("");
      // Desired format:  DD.DDDDDDDDD / DDD.DDDDDDDD

      // Take out any N/S or E/W pre-fixes
      if (lat[0].toUpperCase() === "N") {
        lat = lat.splice(1).join("");
      } else if (lat[0].toUpperCase() === "S") {
        lat.splice(0, 1, "-");
        // lat.unshift("-");
        lat = lat.join("");
      }
      if (lng[0].toUpperCase() === "E") {
        lng = lng.splice(1).join("");
      } else if (lng[0].toUpperCase() === "W") {
        lng.splice(0, 1, "-");
        // lng.unshift("-");
        lng = lng.join("");
      } else {
        lat = lat.join("");
        lng = lng.join("");
      }

      // if DD MM SS / DDD MM SS   or   DD MM SS.SSS / DDD MM SS.SSS
      if (lat.split(" ").length === 3) {
        const latC = lat.split(" ");
        const lngC = lng.split(" ");
        lat = parseInt(latC[0]) + parseInt(latC[1]) / 60 + parseInt(latC[2]) / (60 * 60);
        lng = parseInt(lngC[0]) + parseInt(lngC[1]) / 60 + parseInt(lngC[2]) / (60 * 60);
        return { lat, lng };

        // if DD MM.MMM / DDD MM.MMMM
      } else if (lat.split(" ").length === 2) {
        const latC = lat.split(" ");
        const lngC = lng.split(" ");
        lat = parseInt(latC[0]) + parseInt(latC[1]) / 60;
        lng = parseInt(lngC[0]) + parseInt(lngC[1]) / 60;
        return { lat, lng };

        // if DD.DDDDDD / DDD.DDDDDD, good format
      } else if (lat.split(".").length === 2) {
        return { lat, lng };

        // Some other unknown format
      } else {
        console.log("Lat/Lng is not in a recognized format. Using default lat/long.");
        return { lat: 32.73626630980294, lng: -117.14898687546605 };
      }
    }
  };

  clickCancelButton = (e) => {
    console.log("Clicked cancel.");
    this.props.history.push("/events");
  };

  render() {
    _logger("render");
    return (
      <React.Fragment>
        <div className="col pl-3 mr-3">
          <div className="row m-0 pl-0 pt-2 pb-2 align-items-end">
            <h3 className="col pl-0" id="mainTitle" style={{ maxWidth: "fit-content" }}>
              Events Location Search
            </h3>
          </div>
          <div className="row ml-0 pl-0">
            <div
              className="col-4 pl-3 pt-3 pb-3 m-0 mr-3 mb-3 border border-secondary rounded latestEventView"
              style={{ height: "fit-content", backgroundColor: "rgb(210, 217, 235)" }}
            >
              <Formik
                enableReinitialize={true}
                initialValues={this.state.searchFormData}
                onSubmit={this.clickSubmitButton}
                validationSchema={validationSchema}
              >
                {({ values, handleChange, handleSubmit, touched, errors }) => (
                  <Form>
                    <div className="row m-3">
                      <div>
                        <Radio
                          checked={values.searchOption === "address"}
                          onChange={handleChange}
                          value="address"
                          name="searchOption"
                        />
                      </div>
                      <div className="col">
                        <TextField
                          id="address"
                          value={values.address}
                          onChange={handleChange}
                          label="Address"
                          variant="outlined"
                          error={Boolean(errors.address)}
                          helperText={errors.address}
                        />
                      </div>
                    </div>
                    <div className="row m-3">
                      <div>
                        <Radio
                          checked={values.searchOption === "latLng"}
                          onChange={handleChange}
                          value="latLng"
                          name="searchOption"
                        />
                      </div>
                      <div className="col">
                        <div className="mb-2">
                          <TextField
                            id="latitude"
                            value={values.latitude}
                            onChange={handleChange}
                            label="Latitude"
                            variant="outlined"
                            error={Boolean(errors.latitude)}
                            helperText={errors.latitude}
                          />
                        </div>
                        <div>
                          <TextField
                            id="longitude"
                            value={values.longitude}
                            onChange={handleChange}
                            label="Longitude"
                            variant="outlined"
                            error={Boolean(errors.longitude)}
                            helperText={errors.longitude}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row m-3">
                      <TextField
                        id="distance"
                        value={values.distance}
                        onChange={handleChange}
                        label="Distance (miles)"
                        variant="outlined"
                        error={Boolean(errors.distance)}
                        helperText={errors.distance}
                      />
                    </div>
                    <div className="row m-2">
                      <div className="m-1">
                        <Button type="submit" variant="contained" color="primary">
                          Submit
                        </Button>
                      </div>
                      <div className="m-1">
                        <Button variant="contained" onClick={this.clickCancelButton}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="col-4 justify-content-center">
              <div className="row">
                {this.state.eventObjs.length > 0 ? (
                  <div
                    className="col pl-3 pt-3 pb-3 m-0 mr-3 mb-3 border border-secondary rounded latestEventView"
                    style={{ height: "fit-content", minWidth: "460px", backgroundColor: "rgb(210, 217, 235)" }}
                  >
                    {this.state.eventObjs}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EventLocationSearch;
