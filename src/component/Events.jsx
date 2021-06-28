import React from "react";
import * as eventService from "../services/eventService";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
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
    dropdownOpen: false,
    eventData: {},
    events: [],
    totalEvents: [],
    searchData: {
      dateStart: "",
      dateEnd: "",
    },
    locationSearchData: "",
    locationSearch: {
      latitude: "",
      longitude: "",
    },
    distance: 5,
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
      let dateStart = queryString.parse(currentQry).eventStartDate;
      let dateEnd = queryString.parse(currentQry).eventEndDate;
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
      this.setState(
        (prevState) => {
          let newSearchData = { ...prevState.searchData };
          console.log(newSearchData);
          newSearchData.dateStart = "";
          newSearchData.dateEnd = "";
          return { currentPage: 1, searchData: newSearchData };
        },
        eventService
          .getAll(this.state.currentPage - 1, this.state.pageSize)
          .then(this.onGetAllSuccess)
          .catch(this.onGetAllError)
      );
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

  dropdownToggle = () => {
    this.setState(() => {
      return { dropdownOpen: !this.state.dropdownOpen };
    });
  };

  getMap = () => {
    let firstComponentEvent = this.state.firstEventComponent.props.event;
    const latitude = firstComponentEvent.location.latitude;
    const longitude = firstComponentEvent.location.longitude;
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

  onFormGeocodeHandler = (results, status) => {
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
        name: eventData.name,
        headline: eventData.headline,
        description: eventData.description,
        summary: eventData.summary,
        slug: eventData.slug,
        statusId: eventData.statusId,
        dateStart: eventData.dateStart,
        dateEnd: eventData.dateEnd,
        location: {
          latitude: eventData.latitude,
          longitude: eventData.longitude,
          zipCode: eventData.zipCode,
          address: eventData.address,
        },
      };
      eventService
        .edit(id, data)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else {
      let payload = {
        name: this.state.formData.name,
        headline: this.state.formData.headline,
        description: this.state.formData.description,
        summary: this.state.formData.summary,
        slug: this.state.formData.slug,
        statusId: this.state.formData.statusId ? "Active" : "Not Yet",
        dateStart: this.state.formData.dateStart,
        dateEnd: this.state.formData.dateEnd,
        location: {
          latitude: this.state.formData.latitude,
          longitude: this.state.formData.longitude,
          zipCode: this.state.formData.zipCode,
          address: this.state.formData.address,
        },
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
    const latitude = selectedEvent.location.latitude;
    const longitude = selectedEvent.location.longitude;
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

  onDateSearchInput = (e) => {
    let newValue = e.currentTarget.value;
    let inputName = e.currentTarget.name;
    this.setState((prevState) => {
      let newSearchData = { ...prevState.searchData };
      newSearchData[inputName] = newValue;
      return { searchData: newSearchData };
    });
  };

  onLocationSearchInput = (e) => {
    let newValue = e.currentTarget.value;
    this.setState((prevState) => {
      let locationData = { ...prevState.locationSearchData };
      locationData = newValue;
      return { locationSearchData: locationData };
    });
  };

  onDropdownChange = (e) => {
    console.log(e);
    let newValue = e.currentTarget.value;
    this.setState((prevState) => {
      let newMileData = { ...prevState.distance };
      newMileData = newValue;
      return { distance: newMileData };
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

  onLocationSearchClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.locationSearchData !== "") {
      this.geocoder.geocode(
        { address: this.state.locationSearchData },
        this.onSearchGeocodeHandler
      );
    }
  };

  onSearchGeocodeHandler = (results, status) => {
    if (status === "OK") {
      this.setState((prevState) => {
        let newLocationSearch = { ...prevState.locationSearch };
        newLocationSearch.latitude = results[0].geometry.location.lat();
        newLocationSearch.longitude = results[0].geometry.location.lng();
        return { locationSearch: newLocationSearch };
      }, this.locationsBySearch);
    } else {
      toast("Geocode was not successful for the following reason: " + status);
    }
  };

  locationsBySearch = () => {
    let lat = this.state.locationSearch.latitude;
    let lng = this.state.locationSearch.longitude;
    let radius = this.state.distance;
    eventService
      .getByLocation(lat, lng, radius)
      .then(this.onGetByLocationSuccess)
      .catch(this.onGetByLocationError);
  };

  onGetByLocationSuccess = (res) => {
    console.log(res);
  };

  onGetByLocationError = (res) => {
    console.error(res);
  };

  onEditClick = (event) => {
    console.log(event);
    this.toggle();
    let dateStart = new Date(Date.parse(event.dateStart));
    let dateEnd = new Date(Date.parse(event.dateEnd));

    let [
      startMonth,
      startDate,
      startYear,
    ] = dateStart.toLocaleDateString().split("/");
    startMonth.length === 1
      ? (dateStart = `${startYear}-0${startMonth}-${startDate}`)
      : (dateStart = `${startYear}-${startMonth}-${startDate}`);

    let [endMonth, endDate, endYear] = dateEnd.toLocaleDateString().split("/");
    endMonth.length === 1
      ? (dateEnd = `${endYear}-0${endMonth}-${endDate}`)
      : (dateEnd = `${endYear}-${endMonth}-${endDate}`);

    this.setState((prevState) => {
      let newFormData = { ...prevState.formData };
      newFormData.id = event.id;
      newFormData.name = event.name;
      newFormData.headline = event.headline;
      newFormData.description = event.description;
      newFormData.summary = event.summary;
      newFormData.slug = event.slug;
      newFormData.statusId = event.statusId;
      newFormData.dateStart = dateStart;
      newFormData.dateEnd = dateEnd;
      newFormData.zipCode = event.location.zipCode;
      newFormData.address = event.location.address;
      newFormData.latitude = event.location.latitude;
      newFormData.longitude = event.location.longitude;
      return { eventData: event, formData: newFormData };
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
      this.onFormGeocodeHandler
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
      `/events?eventStartDate=${this.state.searchData.dateStart}&eventEndDate=${this.state.searchData.dateEnd}`
    );
  };

  viewOnMapClicked = () => {
    this.setState(() => {
      return { isViewOnMapClicked: !this.state.isViewOnMapClicked };
    }, this.getMapforViewOnMap);
  };

  onDropDownItemClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.currentTarget.value);
    let newValue = parseInt(e.currentTarget.value);
    this.setState((prevState) => {
      let newDistance = { ...prevState.distance };
      newDistance = newValue;
      return { distance: newDistance };
    });
  };

  getMapforViewOnMap = () => {
    if (this.state.isViewOnMapClicked) {
      let eventsLat = this.state.totalEvents.map(
        (event) => event.location.latitude
      );
      let eventsLng = this.state.totalEvents.map(
        (event) => event.location.longitude
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
                  <input
                    type="text"
                    className="form-control rounded w-25"
                    placeholder="City Name"
                    name="location"
                    value={this.state.searchData.location}
                    onChange={this.onLocationSearchInput}
                  />
                  <ButtonDropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.dropdownToggle}
                  >
                    <DropdownToggle caret outline color="primary">
                      mile
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={this.onDropDownItemClick}
                        value="5"
                      >
                        5
                      </DropdownItem>
                      <DropdownItem
                        onClick={this.onDropDownItemClick}
                        value="25"
                      >
                        25
                      </DropdownItem>
                      <DropdownItem
                        onClick={this.onDropDownItemClick}
                        value="50"
                      >
                        50
                      </DropdownItem>
                      <DropdownItem
                        onClick={this.onDropDownItemClick}
                        value="100"
                      >
                        100
                      </DropdownItem>
                      <DropdownItem
                        onClick={this.onDropDownItemClick}
                        value="200"
                      >
                        200
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                  <button
                    type="button"
                    className="btn btn-outline-primary mr-5"
                    onClick={this.onLocationSearchClick}
                  >
                    search
                  </button>
                  <Button color="info" onClick={this.viewOnMapClicked}>
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
                      type="date"
                      className="form-control rounded"
                      placeholder="Date Start"
                      name="dateStart"
                      value={this.state.searchData.dateStart}
                      onChange={this.onDateSearchInput}
                    />
                    <input
                      type="date"
                      className="form-control rounded"
                      placeholder="Date End"
                      name="dateEnd"
                      value={this.state.searchData.dateEnd}
                      onChange={this.onDateSearchInput}
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
