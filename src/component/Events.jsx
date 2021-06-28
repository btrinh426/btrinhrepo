import React from "react";
import * as eventService from "../services/eventService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EventForm from "./EventForm";
import { toast } from "react-toastify";
import SingleEvent from "./SingleEvent";
import FirstEvent from "./FirstEvent";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import queryString from "query-string";
import Swal from "sweetalert2";
import ViewOnMap from "./ViewOnMap";

class Events extends React.PureComponent {
  state = {
    modal: false,
    eventData: {},
    events: [],
    totalEvents: [],
    searchData: {
      dateStart: "",
      dateEnd: "",
    },
    formData: {
      id: null,
      name: "",
      headline: "",
      description: "",
      summary: "",
      slug: "",
      statusId: false,
      dateStart: "",
      dateEnd: "",
      zipCode: "",
      address: "",
      latitude: 0,
      longitude: 0,
    },
    currentPage: 1,
    firstEventComponent: [],
    newEventsComponents: [],
    totalPage: null,
    pageSize: 3,
    isViewOnMapClicked: false,
  };

  mapRef = React.createRef();

  componentDidMount() {
    eventService
      .getAll(this.state.currentPage - 1, this.state.pageSize)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
    eventService
      .getAll(this.state.currentPage - 1, 10)
      .then(this.onGetTotalSuccess)
      .catch(this.onGetTotalError);
    this.google = window.google;
    this.geocoder = new this.google.maps.Geocoder();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevState, this.state);
    let prevQuery = prevProps.location.search;
    let currentQry = this.props.location.search;

    if (currentQry && prevQuery !== currentQry) {
      let dateStart = queryString.parse(currentQry).DateStart;
      let dateEnd = queryString.parse(currentQry).DateEnd;
      eventService
        .getByDate(
          this.state.currentPage - 1,
          this.state.pageSize,
          dateStart,
          dateEnd
        )
        .then(this.onGetByDateSuccess)
        .catch(this.onGetByDateError);
    } else if (!currentQry && prevQuery) {
      this.setState((prevState) => {
        let newSearchData = { ...prevState.searchData };
        console.log(newSearchData);
        newSearchData.dateStart = "";
        newSearchData.dateEnd = "";
        return { currentPage: 1, searchData: newSearchData };
      });
      eventService
        .getAll(this.state.currentPage - 1, this.state.pageSize)
        .then(this.onGetAllSuccess)
        .catch(this.onGetAllError);
    } else if (prevState.isViewOnMapClicked && !this.state.isViewOnMapClicked) {
      this.getMap();
    }
  }

  onGetByDateSuccess = (res) => {
    console.log(res);
    let totalPage = res.data.item.totalPages;
    let allEvents = res.data.item.pagedItems;
    let totalCount = res.data.item.totalCount;
    this.setState(() => {
      let newEventsComponents = allEvents.map(this.mapEvents);
      let firstEventComponent = allEvents.map(this.mapOneEvent)[0];
      return {
        events: allEvents,
        totalPage,
        totalCount,
        newEventsComponents,
        firstEventComponent,
      };
    }, this.getMap);
  };

  onGetByDateError = (res) => {
    console.error(res);
  };

  onGetAllSuccess = (res) => {
    let totalPage = res.data.item.totalPages;
    let totalCount = res.data.item.totalCount;
    let allEvents = res.data.item.pagedItems;
    console.log(allEvents);
    this.setState((prevState) => {
      let newEvents = { ...prevState.events };
      newEvents = allEvents;
      let newEventsComponents = newEvents.map(this.mapEvents);
      let firstEventComponent = this.mapOneEvent({ ...newEvents[0] });
      return {
        events: newEvents,
        newEventsComponents,
        firstEventComponent,
        totalPage,
        totalCount,
      };
    }, this.getMap);
  };

  onGetAllError = (res) => {
    console.error(res);
  };

  onGetTotalSuccess = (res) => {
    let totalEvents = res.data.item.pagedItems;
    this.setState(() => {
      return { totalEvents };
    });
  };

  onGetTotalError = (res) => {
    console.error(res);
  };
  toggle = (action) => {
    this.setState(() => {
      return { modal: !this.state.modal };
    });
    // if (action === "Do Fx C") {
    //   ("Do Fx C");
    // }
    // if (this.props.location.state) {
    //   this.props.history.replace("/events", "");
    // }
  };

  getMap = () => {
    let firstComponentEvent = this.state.firstEventComponent.props.event;
    const latitude = firstComponentEvent.metaData.location.latitude;
    const longitude = firstComponentEvent.metaData.location.longitude;
    console.log(latitude, longitude);
    const node = this.mapRef.current;
    const map = new this.google.maps.Map(node, {
      zoom: 8,
      center: { lat: latitude, lng: longitude },
    });
    console.log(map);
    new this.google.maps.Marker({
      map: map,
      position: { lat: latitude, lng: longitude },
    });
  };

  onGeocodeHandler = (results, status) => {
    if (status === "OK") {
      this.setState((prevState) => {
        let newFormData = { ...prevState.formData };
        newFormData.latitude = results[0].geometry.location.lat();
        newFormData.longitude = results[0].geometry.location.lng();
        return { formData: newFormData };
      }, this.addUpdateEvent);
    } else {
      toast("Geocode was not successful for the following reason: " + status);
    }
  };
  addUpdateEvent = () => {
    let eventData = this.state.formData;
    let id = this.state.formData.id;
    if (id) {
      let data = {
        id: eventData.id,
        metaData: {
          dateStart: eventData.dateStart,
          dateEnd: eventData.dateEnd,
          location: {
            latitude: eventData.latitude,
            longitude: eventData.longitude,
            zipCode: eventData.zipCode,
            address: eventData.address,
          },
        },
        name: eventData.name,
        headline: eventData.headline,
        description: eventData.description,
        summary: eventData.summary,
        slug: eventData.slug,
        statusId: eventData.statusId,
      };
      eventService
        .edit(id, data)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else {
      let payload = {
        metaData: {
          dateStart: this.state.formData.dateStart,
          dateEnd: this.state.formData.dateEnd,
          location: {
            latitude: this.state.formData.latitude,
            longitude: this.state.formData.longitude,
            zipCode: this.state.formData.zipCode,
            address: this.state.formData.address,
          },
        },
        name: this.state.formData.name,
        headline: this.state.formData.headline,
        description: this.state.formData.description,
        summary: this.state.formData.summary,
        slug: this.state.formData.slug,
        statusId: this.state.formData.statusId ? "Active" : "Not Yet",
      };
      eventService.add(payload).then(this.onAddSuccess).catch(this.onAddError);
    }
  };

  onUpdateSuccess = (eventPayload) => {
    this.setState((prevState) => {
      let newEvents = [...prevState.events];
      let selectedEventIndex = newEvents.findIndex((event) => {
        return event.id === eventPayload.id;
      });
      newEvents.splice(selectedEventIndex, 1, eventPayload);
      let newEventsComponents = newEvents.map(this.mapEvents);
      let firstEventComponent = this.mapOneEvent({ ...newEvents[0] });
      return { events: newEvents, newEventsComponents, firstEventComponent };
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Events Updated!",
      showConfirmButton: false,
      timer: 2500,
    });
    this.toggle("update event", eventPayload);
  };

  onUpdateError = () => {};

  onAddSuccess = (res) => {
    console.log(res);
    eventService
      .getAll(this.state.currentPage - 1, this.state.pageSize)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Events Added!",
      showConfirmButton: false,
      timer: 2500,
    });
    this.toggle();
  };

  onAddError = (res) => {
    console.error(res);
    Swal.fire({
      position: "center",
      timer: 2500,
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  };

  getSelectedMap = () => {
    const selectedEvent = this.state.firstEventComponent.props.event;
    const latitude = selectedEvent.metaData.location.latitude;
    const longitude = selectedEvent.metaData.location.longitude;
    console.log(latitude, longitude);
    const node = this.mapRef.current;
    const map = new this.google.maps.Map(node, {
      zoom: 8,
      center: { lat: latitude, lng: longitude },
    });
    console.log(map);
    new this.google.maps.Marker({
      map: map,
      position: { lat: latitude, lng: longitude },
    });
  };

  mapEvents = (singleEvent) => {
    return (
      <SingleEvent
        key={`Event-${singleEvent.id}`}
        event={singleEvent}
        edit={this.onEditClick}
        viewMore={this.onViewMoreClick}
      />
    );
  };
  mapOneEvent = (singleEvent) => {
    let firstComponentMapStyle = { height: "50%", width: "50%" };
    return (
      <FirstEvent
        key={`Event-${singleEvent.id}`}
        event={singleEvent}
        mapDiv={this.mapRef}
        style={firstComponentMapStyle}
      />
    );
  };

  onEventInput = (e) => {
    console.log(e.currentTarget);
    let newValue =
      e.currentTarget.type === "checkbox"
        ? e.currentTarget.checked
        : e.currentTarget.value;
    let inputName = e.currentTarget.name;
    console.log(newValue, inputName);
    this.setState((prevState) => {
      let newFormData = { ...prevState.formData };
      newFormData[inputName] = newValue;
      return { formData: newFormData };
    });
    console.log(this.state);
  };

  onSearchInput = (e) => {
    let newValue = e.currentTarget.value;
    let inputName = e.currentTarget.name;
    this.setState((prevState) => {
      let newSearchData = { ...prevState.searchData };
      newSearchData[inputName] = newValue;
      return { searchData: newSearchData };
    });
  };

  onPageChange = (page) => {
    this.setState((prevState) => {
      let newPage = { ...prevState.currentPage };
      newPage = page;
      let currentQry = this.props.location.search;
      let dateStart = queryString.parse(currentQry).DateStart;
      let dateEnd = queryString.parse(currentQry).DateEnd;
      if (currentQry) {
        eventService
          .getByDate(
            this.state.currentPage - 1,
            this.state.pageSize,
            dateStart,
            dateEnd
          )
          .then(this.onGetByDateSuccess)
          .catch(this.onGetByDateError);
      } else {
        eventService
          .getAll(newPage - 1, this.state.pageSize)
          .then(this.onGetAllSuccess)
          .catch(this.onGetAllError);
      }

      return { currentPage: newPage };
    });
  };

  onEditClick = (event) => {
    console.log(event);
    this.toggle();
    this.setState((prevState) => {
      let newFormData = { ...prevState.formData };
      let newEventData = event;
      newFormData.id = newEventData.id;
      newFormData.name = newEventData.name;
      newFormData.headline = newEventData.headline;
      newFormData.description = newEventData.description;
      newFormData.summary = newEventData.summary;
      newFormData.slug = newEventData.slug;
      newFormData.statusId = newEventData.statusId;
      newFormData.dateStart = newEventData.metaData.dateStart;
      newFormData.dateEnd = newEventData.metaData.dateEnd;
      newFormData.zipCode = newEventData.metaData.location.zipCode;
      newFormData.address = newEventData.metaData.location.address;
      newFormData.latitude = newEventData.metaData.location.latitude;
      newFormData.longitude = newEventData.metaData.location.longitude;
      return { eventData: newEventData, formData: newFormData };
    });
    //this.props.history.push(`/events`, { type: "EventData", payload: event });
  };

  onViewMoreClick = (event) => {
    console.log(event, this.state.firstEventComponent);

    this.setState((prevState) => {
      let arrayEvent = [];
      arrayEvent.push(event);
      let newComponent = { ...prevState.firstEventComponent };
      newComponent = arrayEvent.map(this.mapOneEvent);
      return { firstEventComponent: newComponent[0] };
    }, this.getSelectedMap);
  };

  onSubmitClick = () => {
    this.geocoder.geocode(
      { address: this.state.formData.address },
      this.onGeocodeHandler
    );
  };

  addClick = () => {
    this.setState((prevState) => {
      let formData = { ...prevState.formData };
      formData.id = null;
      formData.name = "";
      formData.headline = "";
      formData.description = "";
      formData.summary = "";
      formData.slug = "";
      formData.statusId = false;
      formData.dateStart = "";
      formData.dateEnd = "";
      formData.zipCode = "";
      formData.address = "";
      formData.latitude = 0;
      formData.longitude = 0;
      return { formData };
    }, this.toggle());
  };

  onSearchClick = () => {
    this.props.history.push(
      `/events?DateStart=${this.state.searchData.dateStart}&DateEnd=${this.state.searchData.dateEnd}`
    );
  };

  viewOnMapClicked = () => {
    this.setState(() => {
      return { isViewOnMapClicked: !this.state.isViewOnMapClicked };
    }, this.getMapforViewOnMap);
  };
  getMapforViewOnMap = () => {
    if (this.state.isViewOnMapClicked) {
      let eventsLat = this.state.totalEvents.map(
        (event) => event.metaData.location.latitude
      );
      let eventsLng = this.state.totalEvents.map(
        (event) => event.metaData.location.longitude
      );
      console.log(eventsLat, eventsLng);
      let node = this.mapRef.current;
      console.log(node);

      const map = new this.google.maps.Map(node, {
        zoom: 9,
        center: { lat: eventsLat[0], lng: eventsLng[0] },
      });
      let markerArray = [];
      for (let i = 0; i < eventsLat.length; i++) {
        const markers = new this.google.maps.Marker({
          position: { lat: eventsLat[i], lng: eventsLng[i] },
        });
        markers.setMap(map);
        markerArray.push(markers);
      }
      this.setState(() => {
        return { markers: markerArray };
      });
    }
  };

  render() {
    return (
      <div className="jumbotron">
        <div className="w-100">
          <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} size={"lg"}>
              <ModalHeader toggle={this.toggle}>Event</ModalHeader>
              <ModalBody>
                <EventForm
                  formInputData={this.state.formData}
                  inputChange={this.onEventInput}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.onSubmitClick}>
                  Submit
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-9">
                <div className=" d-flex justify-content-end pr-5">
                  {" "}
                  <Button color="secondary" onClick={this.viewOnMapClicked}>
                    View On Map
                  </Button>
                </div>
                {this.state.isViewOnMapClicked && (
                  <ViewOnMap mapDiv={this.mapRef} />
                )}
                {!this.state.isViewOnMapClicked &&
                  this.state.firstEventComponent}
              </div>
              <div className="col-3">
                <form className="form-inline w-100">
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control rounded"
                      placeholder="Date Start"
                      name="dateStart"
                      value={this.state.searchData.dateStart}
                      onChange={this.onSearchInput}
                    />
                    <input
                      type="search"
                      className="form-control rounded"
                      placeholder="Date End"
                      name="dateEnd"
                      value={this.state.searchData.dateEnd}
                      onChange={this.onSearchInput}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={this.onSearchClick}
                    >
                      search
                    </button>
                  </div>
                </form>

                <div
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    boxShadow: "1px 3px 1px #dfe6e9",
                  }}
                >
                  <div
                    className="d-flex justify-content-around"
                    style={{ marginTop: "1rem" }}
                  >
                    <Pagination
                      style={{ textAlign: "center" }}
                      onChange={this.onPageChange}
                      current={this.state.currentPage}
                      total={this.state.totalCount}
                      pageSize={this.state.pageSize}
                    />
                    <Button color="outline-info" onClick={this.addClick}>
                      {"Add Event"}
                    </Button>
                  </div>

                  {this.state.newEventsComponents}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
