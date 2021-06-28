import React from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import GoogleMapReact from "google-map-react";
//import { Map, Marker, GoogleApiWrapper } from "google-map-react";
import * as eventService from "./services/eventService";
import SingleEvent from "./SingleEvent";
import EventModal from "./EventModal";
//import EditEventModal from "./EditEventModal";

const Marker = () => (
  <div>
    <span role="img" aria-label="marker">
      &#10060;
    </span>
  </div>
);

class Events extends React.Component {
  state = {
    mainEvent: {
      name: "",
      description: "",
      summary: "",
      slug: "",
      date: 0,
      location: "",
      latitude: 0,
      longitude: 0,
    },
    formData: {
      metaData: {
        dateStart: "",
        dateEnd: "",
        location: {
          latitude: 0,
          longitude: 0,
          zipCode: "",
          address: "",
        },
      },
      name: "",
      headline: "",
      description: "",
      summary: "",
      slug: "",
      statusId: "",
    },
    pageIndex: 0,
    pageSize: 3,
    totalPages: 10,
    center: {
      lat: 49.1607521,
      lng: -117.260908,
    },
    zoom: 13,
    isOpen: false,
    searchQuery: "",
  };

  componentDidMount() {
    eventService
      .getAll(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetEventsSuccess)
      .catch(this.onGetEventsError);
  }

  toggleModal = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isOpen: !prevState.isOpen,
        formData: {
          metaData: {
            dateStart: "",
            dateEnd: "",
            location: {
              latitude: 0,
              longitude: 0,
              zipCode: "",
              address: "",
            },
          },
          name: "",
          headline: "",
          description: "",
          summary: "",
          slug: "",
          statusId: "",
        },
      };
    });
  };

  onViewMore = (event) => {
    console.log(event);
    let mainEvent = event;
    mainEvent.date = mainEvent.metaData.dateStart.split("T")[0].split("-");
    mainEvent.date =
      mainEvent.date[1] + "." + mainEvent.date[2] + "." + mainEvent.date[0];
    mainEvent.location = mainEvent.metaData.location.address;
    let lat = mainEvent.metaData.location.latitude;
    let lng = mainEvent.metaData.location.longitude;

    this.setState((prevState) => {
      return {
        ...prevState,
        mainEvent,
        center: { lat, lng },
        zoom: 13,
        locationMarkers: "",
      };
    });
  };

  onEdit = (event) => {
    this.setState((prevState) => {
      return { ...prevState, formData: event, isOpen: !prevState.isOpen };
    });
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    //console.log({ newValue, currentTarget });

    this.setState((prevState) => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { ...prevState, formData };
    });
  };

  onMetaFieldChange = (e) => {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;

    this.setState((prevState) => {
      const metaData = { ...prevState.formData.metaData };

      if (
        name === "address" ||
        name === "zipCode" ||
        name === "latitude" ||
        name === "longitude"
      ) {
        metaData.location[name] = value;
        return { ...prevState, formData: { ...prevState.formData, metaData } };
      } else {
        metaData[name] = value;
        return { ...prevState, formData: { ...prevState.formData, metaData } };
      }
    });
  };

  onSearchFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState((prevState) => {
      let searchQuery = { ...this.state.searchQuery };
      searchQuery = newValue;
      return { ...prevState, searchQuery };
    });
  };

  onSubmitForm = (id) => {
    if (id) {
      eventService
        .update(id, this.state.formData)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else {
      eventService
        .add(this.state.formData)
        .then(this.onAddSuccess)
        .catch(this.onAddError);
    }
  };

  onViewMap = () => {
    eventService
      .getAll(0, 25)
      .then(this.onViewMapSuccess)
      .catch(this.onViewMapError);
  };
  mapAllEvents = (event) => {
    let lat = event.metaData.location.latitude;
    let lng = event.metaData.location.longitude;

    return <Marker key={event.id * 10} lat={lat} lng={lng}></Marker>;
  };

  onViewMapSuccess = (response) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        zoom: 2,
        locationMarkers: response.data.item.pagedItems.map(this.mapAllEvents),
      };
    });
  };
  onViewMapError = (err) => {
    console.warn(err);
  };

  onSubmitSearch = () => {
    let searchQuery = this.state.searchQuery.split(" ");

    eventService
      .search(0, this.state.pageSize, searchQuery[0], searchQuery[1])
      .then(this.onGetEventsSuccess)
      .catch(this.onGetEventsError);
  };

  mapEvent = (event) => {
    let date = event.metaData.dateStart.split("T")[0].split("-");
    date = date[1] + "." + date[2] + "." + date[0];

    return (
      <SingleEvent
        key={event.id}
        date={date}
        event={event}
        onView={this.onViewMore}
        onEdit={this.onEdit}
      ></SingleEvent>
    );
  };

  onGetEventsSuccess = (response) => {
    console.log(response);
    let events = response.data.item.pagedItems;
    let mainEvent = events[0];
    mainEvent.date = mainEvent.metaData.dateStart.split("T")[0].split("-");
    mainEvent.date =
      mainEvent.date[1] + "." + mainEvent.date[2] + "." + mainEvent.date[0];
    mainEvent.location = mainEvent.metaData.location.address;
    let latitude = mainEvent.metaData.location.latitude;
    let longitude = mainEvent.metaData.location.longitude;
    console.log(latitude, longitude);

    this.setState((prevState) => {
      return {
        ...prevState,
        events: events.map(this.mapEvent),
        mainEvent,
        center: { lat: latitude, lng: longitude },
        totalPages: response.data.item.totalCount,
      };
    });
  };
  onGetEventsError = (err) => {
    console.warn(err);
  };
  onAddSuccess = (response) => {
    console.log(response);
    eventService
      .getAll(0, this.state.pageSize)
      .then(this.onGetEventsSuccess)
      .catch(this.onGetEventsError);

    this.setState((prevState) => {
      return { ...prevState, searchQuery: "" };
    });
  };
  onAddError = (err) => {
    console.warn(err);
  };
  onUpdateSuccess = (response) => {
    console.log(response);
    eventService
      .getAll(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetEventsSuccess)
      .catch(this.onGetEventsError);
  };
  onUpdateError = (err) => {
    console.warn(err);
  };

  onPageChange = (page, pageSize) => {
    console.log(page - 1, pageSize);
    this.setState((prevState) => {
      let index = page - 1;
      if (this.state.searchQuery) {
        let searchQuery = this.state.searchQuery.split(" ");
        eventService
          .search(index, this.state.pageSize, searchQuery[0], searchQuery[1])
          .then(this.onGetEventsSuccess)
          .catch(this.onGetEventsError);
      } else {
        eventService
          .getAll(index, this.state.pageSize)
          .then(this.onGetEventsSuccess)
          .catch(this.onGetEventsError);
      }
      return { ...prevState, pageIndex: index };
    });
  };

  render() {
    return (
      <div className="container pt-5 pb-5">
        <EventModal
          isOpen={this.state.isOpen}
          toggleModal={this.toggleModal}
          title={"Create/Update Event Form"}
          content={""}
          onFormChange={this.onFormFieldChanged}
          onMetaChange={this.onMetaFieldChange}
          onClick={this.onSubmitForm}
          formData={this.state.formData}
        ></EventModal>
        <div className="row">
          <div className="col-9 text-center">
            <div className="card">
              <div className="card-header text-center">
                <h2>
                  Event: <strong>{this.state.mainEvent.name}</strong>
                </h2>
              </div>
              <div className="card-body container">
                <div className="row">
                  <h6 className="text-left float-left col-6">
                    Link:{" "}
                    <a href={this.state.mainEvent.slug}>
                      {this.state.mainEvent.slug}
                    </a>
                  </h6>
                  <h6 className="text-right float-right col-6">
                    Date: {this.state.mainEvent.date}
                  </h6>
                </div>
                <div className="card-text text-left pt-1 px-2">
                  {this.state.mainEvent.description}
                </div>
              </div>
              <div className="row pt-5">
                <div
                  className="col-6 float-left m-3"
                  style={{ height: "50vh", width: "100%" }}
                >
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyA6Jp6Dl-KAwd6xdZRaudu7l19GfG7qJiM",
                    }}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    yesIWantToUseGoogleMapApiInternals
                  >
                    {this.state.locationMarkers ? (
                      this.state.locationMarkers
                    ) : (
                      <Marker
                        lat={this.state.center.lat}
                        lng={this.state.center.lng}
                      ></Marker>
                    )}
                  </GoogleMapReact>
                </div>
                <div className="col-5 float-right text-left m-3">
                  <h4>Event location:</h4>
                  <p>{this.state.mainEvent.location}</p>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={this.onViewMap}
                  >
                    View Events by Map
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 container">
            <div className="row mb-5 mx-auto">
              <input
                type="search"
                className="col-7 form-control mx-1"
                onChange={this.onSearchFieldChange}
              ></input>
              <button
                type="button"
                className="col-4 btn btn-primary mx-auto"
                onClick={this.onSubmitSearch}
              >
                Search
              </button>
            </div>
            <div className="card">
              <div className="card-header">
                <h5>Upcoming Events:</h5>
              </div>
              <div className="card-body container text-center">
                <Pagination
                  className="text-center pb-3"
                  pageSize={this.state.pageSize}
                  current={this.state.pageIndex + 1}
                  total={this.state.totalPages}
                  onChange={this.onPageChange}
                ></Pagination>
                <button
                  type="button"
                  className="btn btn-outline-primary mb-2"
                  onClick={this.toggleModal}
                >
                  Add Event &raquo;
                </button>
                <div className="card mb-1">{this.state.events}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
