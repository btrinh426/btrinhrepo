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

class Events extends React.Component {
  state = {
    modal: false,
    eventData: {},
    events: [],
    searchData: {
      dateStart: "",
      dateEnd: "",
    },
    currentPage: 1,
    firstEventComponent: [],
    newEventsComponents: [],
  };

  mapRef = React.createRef();

  //marker =  new this.google.maps.Marker()
  componentDidMount() {
    // this.props.history.replace("/events", "");
    eventService
      .getAll(this.state.currentPage - 1, 3)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
    this.google = window.google;
    this.geocoder = new this.google.maps.Geocoder();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevState, this.state);
    if (this.state.modal === false && prevState.modal === true) {
      this.setState((prevState) => {
        let newEventData = { ...prevState.eventData };
        newEventData = {};
        let newEvents = [...prevState.events];
        let newEventsComponents = newEvents.map(this.mapEvents);
        let firstEventComponent = newEvents.map(this.mapOneEvent)[0];
        return {
          eventData: newEventData,
          newEventsComponents,
          firstEventComponent,
        };
      }, this.getMap);
    }
    let prevQuery = prevProps.location.search;
    let currentQry = this.props.location.search;

    if (currentQry && prevQuery !== currentQry) {
      let dateStart = queryString.parse(currentQry).DateStart;
      let dateEnd = queryString.parse(currentQry).DateEnd;
      eventService
        .getByDate(this.state.currentPage - 1, 3, dateStart, dateEnd)
        .then(this.onGetByDateSuccess)
        .catch(this.onGetByDateError);
    } else if (!currentQry && prevQuery) {
      eventService
        .getAll(this.state.currentPage - 1, 3)
        .then(this.onGetAllSuccess)
        .catch(this.onGetAllError);
    }
  }

  onGetByDateSuccess = (res) => {
    let allEvents = res.data.item.pagedItems;
    this.setState((prevState) => {
      let newEvents = { ...prevState.events };
      newEvents = allEvents;
      let newEventsComponents = newEvents.map(this.mapEvents);
      let firstEventComponent = newEvents.map(this.mapOneEvent)[0];
      return { events: newEvents, newEventsComponents, firstEventComponent };
    }, this.getMap);
  };

  onGetByDateError = (res) => {
    console.error(res);
  };

  onGetAllSuccess = (res) => {
    let allEvents = res.data.item.pagedItems;
    console.log(allEvents);
    this.setState((prevState) => {
      let newEvents = { ...prevState.events };
      newEvents = allEvents;
      let newEventsComponents = newEvents.map(this.mapEvents);
      let firstEventComponent = newEvents.map(this.mapOneEvent)[0];
      return { events: newEvents, newEventsComponents, firstEventComponent };
    }, this.getMap);
  };

  onGetAllError = (res) => {
    console.error(res);
  };

  toggle = () => {
    this.setState(() => {
      return { modal: !this.state.modal };
    });

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

  onAddSuccess = (res) => {
    toast("Event Added!");
    console.log(res);
    let allEVents = res.data.item["120_Weekday"].concat(
      res.data.item["111_Weekend"],
      res.data.item["110_Weekday"]
    );
    this.setState((prevState) => {
      let newEvents = { ...prevState.events };
      newEvents = allEVents;
      let newEventsComponents = newEvents.map(this.mapEvents);
      let firstEventComponent = newEvents.map(this.mapOneEvent)[0];
      return { events: newEvents, newEventsComponents, firstEventComponent };
    }, this.getMap);
    this.toggle();
  };

  onEditClick = (event) => {
    console.log(event);

    this.toggle();
    this.setState((prevState) => {
      let newEventData = { ...prevState.eventData };
      newEventData = event;
      return { eventData: newEventData };
    });
    //this.props.history.push(`/events`, { type: "EventData", payload: event });
  };
  onViewMoreClick = (event) => {
    console.log(event, this.state.firstEventComponent);

    this.setState((prevState) => {
      let arrayEvent = [];
      arrayEvent.push(event);
      let newEvent = { ...prevState.firstEventComponent };
      newEvent = arrayEvent.map(this.mapOneEvent);
      return { firstEventComponent: newEvent };
    }, this.getSelectedMap);
  };

  getSelectedMap = () => {
    const selectedEvent = this.state.firstEventComponent[0].props.event;
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
    return (
      <FirstEvent
        key={`Event-${singleEvent.id}`}
        event={singleEvent}
        mapDiv={this.mapRef}
      />
    );
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
      console.log(newPage);
      eventService
        .getAll(newPage - 1, 3)
        .then(this.onGetAllSuccess)
        .catch(this.onGetAllError);
      return { currentPage: newPage };
    });
  };

  addClick = (e) => {
    this.toggle();
  };

  onSearchClick = () => {
    this.props.history.push(
      `/events?DateStart=${this.state.searchData.dateStart}&DateEnd=${this.state.searchData.dateEnd}`
    );
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
                  editEventData={this.state.eventData}
                  toggleForm={this.toggle}
                  events={this.state.events}
                />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </Modal>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-9">{this.state.firstEventComponent}</div>
              <div className="col-3">
                <form className="form-inline w-100">
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control rounded"
                      placeholder="Date Start"
                      name="dateStart"
                      value={this.state.dateStart}
                      onChange={this.onSearchInput}
                    />
                    <input
                      type="search"
                      className="form-control rounded"
                      placeholder="Date End"
                      name="dateEnd"
                      value={this.state.dateEnd}
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
                      total={40}
                      defaultCurrent={this.state.currentPage}
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
