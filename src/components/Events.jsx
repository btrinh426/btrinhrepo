import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Input, Form } from "reactstrap";
import Pagination from "rc-pagination";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlusCircle, faBullseye } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import * as eventService from "../services/eventService";
import EventAddModal from "./EventAddModal";
import EventCard from "./EventCard";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventsObjs: [],
      searchEventStartInput: "",
      searchResultDate: "",
      pagination: {
        currentPage: 1,
        totalEvents: 0,
        pageSize: 5,
      },
      eventAddModalShown: false,
      mainEvent: {},
      modalEvent: {},
      autocomplete: null,
    };
  }

  componentDidMount = () => {
    // console.log("Events component mounted....getting events database....");
    this.getEventDatabase(0, 100); // For the first call to the event database try to get the first 100 events
    // Geocode.setApiKey("AIzaSyDcfaN_qpX0SIR5slg1HFo4Gxn67MYzr5I");
    // Geocode.setLocationType("ROOFTOP");
  };

  componentDidUpdate = (prevProps, prevState) => {
    // console.log(`componentDidUpdate. `, this.state.mainEvent);
    if (
      !(
        prevState.mainEvent.latitude === this.state.mainEvent.latitude &&
        prevState.mainEvent.longitude === this.state.mainEvent.longitude
      )
    ) {
      this.googleMap();
    }
  };

  clickAddEventButton = (e) => {
    e.preventDefault();
    // Open EventAddModal here
    if (!this.state.eventAddModalShown) {
      this.toggleModal();
    } else {
      console.log("Event Add/Update Modal already open.");
    }
  };

  clickSlugLink = (e) => {
    e.preventDefault();
    // const targetEvent = this.state.events.find((event) => event.slug === e.currentTarget.innerText);
    console.log(this.state.mainEvent);
    console.log(`Clicked slug for event, ID#: ${this.state.mainEvent.id}`);
    if (!this.state.eventAddModalShown) {
      this.toggleModal(this.state.mainEvent);
    } else {
      console.log("Event Add/Update Modal already open.");
    }
  };

  toggleModal = (targetEvent = {}) => {
    // This method is called by the "clickSlugLink" method when a user clicks on the slug link of the main event,
    // by the "clickAddEventButton" method when the user clicks on the "Add Event" button, by the "clickEventCardEditButton"
    // method when the user clicks an event card's "Edit" button.
    // This method will toggle the status of modal (visible / hidden) in state. It will also set the "modalEvent" state, which the modal form uses.
    console.log("toggleModal running...");
    this.setState(
      () => {
        let newState = { ...this.state };
        newState.eventAddModalShown = !newState.eventAddModalShown;
        newState.modalEvent = targetEvent;
        return newState;
      },
      () => {
        if (!this.state.eventAddModalShown) {
          this.updateEventsView();
        }
      }
    );
  };

  getEventDatabase = (pageIndex = 0, pageSize = this.state.pagination.pageSize) => {
    // This method is called when the Event component mounts, when the user clicks the "refresh events button",
    // and from within the "updateEventsView" method.

    let searchDates;
    if (this.state.searchResultDate === "") {
      // This is an initial search
      searchDates = this.getFormattedSearchDates();
    } else if (this.state.searchResultDate === this.state.searchEventStartInput) {
      // This is a subsequent event search (due to pagination button clicked)
      searchDates = this.getFormattedSearchDates(this.state.searchEventStartInput, 30);
      pageIndex = this.state.pagination.currentPage - 1;
    } else {
      // This is a new event search
      searchDates = this.getFormattedSearchDates(this.state.searchEventStartInput, 30);
    }

    eventService
      .getEventsByDateRange(pageIndex, pageSize, searchDates.start, searchDates.end)
      .then(this.onGetEventDatabaseSuccess)
      .catch(this.onGetEventDatabaseError);
  };

  onGetEventDatabaseSuccess = (response) => {
    this.updateStateWithEvents(response);
  };

  onGetEventDatabaseError = (error) => {
    if (error.response) {
      debugger;
      let errorText = error.response.data.errors.join("\n");
      console.error("Error getting events from database:");
      console.error(errorText);
    }
    toast.error("Error retrieving event database.");
  };

  getFormattedSearchDates = (searchStartDate = new Date(), daysToSearch = 365) => {
    // This function will return the properly formatted dates for the search based on inputs
    // If there are no inputs to this function, it will return:  start = today, end = one year from now

    const startDate = new Date(searchStartDate);
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + daysToSearch);

    return {
      start: `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`,
      end: `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`,
    };
  };

  updateStateWithEvents = (response) => {
    // This method is called after the event database successfully returns events.
    // This method will update state with the new events (and event objects) that were returned from the database.

    let events, eventsObjs;
    // console.log("Pagination page size:", this.state.pagination.pageSize);
    if (this.state.pagination.totalEvents === 0) {
      // If this is the first call to get events, do not map all the events: only the appropriate page size of events
      events = [...response.data.item.pagedItems].splice(0, this.state.pagination.pageSize);

      eventsObjs = [...events].map(this.mapSingleEvent);
    } else {
      events = response.data.item.pagedItems;
      eventsObjs = response.data.item.pagedItems.map(this.mapSingleEvent);
    }
    this.setState(() => {
      const newState = { ...this.state };
      newState.events = events;
      newState.mainEvent = events[0];
      newState.eventsObjs = eventsObjs;
      newState.pagination.totalEvents = response.data.item.totalCount;
      // console.log("Update state with new events: ", newState);
      return newState;
    });
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

  clickEventCardViewButton = (event) => {
    // console.log(`View event, ID#: ${event.id}`);

    // Put this card's information in the main window
    this.setState(() => {
      const mainEvent = event;
      return { mainEvent };
    }, window.scrollTo(0, 0));
  };

  clickEventCardEditButton = (event) => {
    // This method is called when the user clicks on an event card's "Edit" button
    // console.log(`View event, ID#: ${event.id}`);
    const targetEvent = this.state.events.find((anyEvent) => anyEvent.id === event.id);
    this.toggleModal(targetEvent);
  };

  clickEventSubmitButton = async (modalEvent) => {
    // const newEvent = await this.formatEventData(modalEvent);
    this.setState(() => {
      return { modalEvent };
    });
    if (!modalEvent.hasOwnProperty("id")) {
      // Add new event
      eventService.addEvent(modalEvent).then(this.onAddEventSuccess).catch(this.onAddEventError);
    } else {
      // Update old event
      eventService.updateEvent(modalEvent).then(this.onUpdateEventSuccess).catch(this.onUpdateEventError);
    }
  };

  clickEventDeleteButton = (eventId) => {
    // This function is called when the user clicks on the "Delete" button on the Event Form
    Swal.fire({
      title: "Are you sure you want to delete this event?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        eventService.deleteEvent(eventId).then(this.onDeleteEventSuccess).catch(this.onDeleteEventError);
      }
    });
  };

  onDeleteEventSuccess = () => {
    toast.success(`Event deleted.`);
    console.log("Event deleted.");
    this.setState(
      () => {
        const newState = { ...this.state };
        newState.modalEvent = {};
        newState.modalShown = false;
        return newState;
      },
      () => {
        this.updateEventsView();
        this.toggleModal();
      }
    );
  };

  onDeleteEventError = (error) => {
    debugger;
    toast.error("Could not delete event.");
    console.error(error);
  };

  // formatEventData = async (event) => {
  //   // This method is called by "clickEventSubmitButton" to get the lat/lng for the address inputted by the user
  //   // If the getLatLng fails, it will set them to a default lat/lng
  //   let formattedEvent = { ...event };
  //   console.log("Getting geocode for:  ", event.address);
  //   let geoLoc = await geocodeByAddress(event.address)
  //     .then((results) => {
  //       console.log("Got geocoder results:   ", results);
  //       formattedEvent.address = results[0].formatted_address;
  //       // if (results[0].address_components.length >= 7) {
  //       //   //If the address has a zip code, assign it to the event
  //       //   formattedEvent.zipcode = results[0].address_components[6].long_name;
  //       // }
  //       return getLatLng(results[0]);
  //     })
  //     .then(({ lat, lng }) => {
  //       console.log("Successfully got latitude and longitude", { lat, lng });
  //       return { lat, lng };
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       debugger;
  //       console.log("Could not get lat/lng.");
  //       return { lat: 32.73626630980294, lng: -117.14898687546605 };
  //     });

  //   formattedEvent.latitude = geoLoc.lat;
  //   formattedEvent.longitude = geoLoc.lng;
  //   formattedEvent.dateEnd = event.dateEnd === "" ? event.dateStart : event.dateEnd;

  //   if (formattedEvent.id === "") {
  //     delete formattedEvent.id;
  //   }
  //   return formattedEvent;
  // };

  onAddEventSuccess = (response) => {
    toast.success(`Added new event, ID: ${response.data.item}`);
    console.log("Event added, ID# ", response.data.item);
    this.setState(() => {
      let modalEvent = this.state.modalEvent;
      modalEvent.id = response.data.item;
      return { modalEvent };
    });
  };

  onAddEventError = (error) => {
    debugger;
    toast.error("Could not add new event.");
    console.error(error);
  };

  onUpdateEventSuccess = (response) => {
    toast.success(`Updated event`);
    console.log(`Updated event.`);
    //Update event in state.mainEvent
    this.setState(() => {
      const mainEvent = response.event;
      const events = [...this.state.events];
      events[0] = response.event;
      return { mainEvent, events };
    });
  };

  onUpdateEventError = (error) => {
    debugger;
    toast.error("Could not update event.");
    console.error(error);
  };

  searchTextFromAxiosResponse = (response) => {
    let url = response.config.url;
    if (url.indexOf("=") === -1) {
      url = url.split("/");
    } else {
      url = url.split("=");
    }
    return url[url.length - 1];
  };

  clickRefreshEventsButton = (e) => {
    e.preventDefault();
    this.setState(
      () => {
        const newState = { ...this.state };
        newState.events = [];
        newState.eventsObjs = [];
        newState.mainEvent = {};
        newState.searchEventStartInput = "";
        newState.searchResultDate = "";
        newState.pagination.currentPage = 1;
        newState.pagination.totalEvents = 0;
        newState.pagination.pageSize = 5;
        // console.log("newState: ", newState);
        return newState;
      },
      () => {
        // console.log("State re-set.");
        // debugger;
        this.getEventDatabase(0, 100);
      }
    );
  };

  clickSearchEventsButton = (e) => {
    if (e) {
      e.preventDefault();
    }
    // console.log("Search Button clicked. Search string: ", this.state.searchEventStartInput);

    const notWhiteSpace = /\S\w*/;
    if (!this.state.searchEventStartInput.match(notWhiteSpace)) {
      toast.error(`Invalid search string.`);
      return;
    }

    const searchDates = this.getFormattedSearchDates(this.state.searchEventStartInput, 30);
    // // The second argument is the number of days to search from the start date (defaults to 30 days)

    console.log("Search dates: ", searchDates);

    eventService
      .getEventsByDateRange(0, this.state.pagination.pageSize, searchDates.start, searchDates.end)
      .then(this.onGetEventByDateRangeSuccess)
      .catch(this.onGetEventByDateRangeError);
  };

  onGetEventByDateRangeSuccess = (response) => {
    // debugger;
    // document.getElementById("mainTitle").innerText = "Search Results";
    if (this.state.searchResultDate === "" || this.state.searchEventStartInput !== this.state.searchResultDate) {
      // This was the first search result
      console.log("Success searching for event (first search result).");
      console.log("Response data:");
      console.log(response.data.item.pagedItems);
      const totalCount = response.data.item.totalCount;
      let totalPages = response.data.item.totalPages;
      const events = [...response.data.item.pagedItems];
      const eventsObjs = [...response.data.item.pagedItems]
        .splice(0, this.state.pagination.pageSize)
        .map(this.mapSingleEvent);
      const EventDiv = () => (
        <React.Fragment>
          <div>
            <p>Found {totalCount} events.</p>
          </div>
          <div>
            <p>Showing page 1 of {totalPages}.</p>
          </div>
        </React.Fragment>
      );
      toast.success(<EventDiv />, { autoClose: 5000 });

      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.events = events;
        newState.eventsObjs = eventsObjs;
        newState.pagination.currentPage = 1;
        newState.pagination.totalEvents = totalCount;
        newState.searchResultDate = this.state.searchEventStartInput;
        return newState;
      });
    } else {
      console.log("Success search events (subsequent search results");
      const totalCount = response.data.item.totalCount;
      // const totalPages = response.data.item.totalPages;
      const pageIndex = response.data.item.pageIndex;
      const events = [...response.data.item.pagedItems];
      const eventsObjs = [...response.data.item.pagedItems]
        .splice(0, this.state.pagination.pageSize)
        .map(this.mapSingleEvent);

      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.events = events;
        newState.eventsObjs = eventsObjs;
        newState.pagination.currentPage = pageIndex + 1;
        newState.pagination.totalEvents = totalCount;
        return newState;
      });
    }
  };

  onGetEventByDateRangeError = (error) => {
    debugger;
    // const errorText = error.response.statusText;
    // const searchDate = this.searchTextFromAxiosResponse(error);
    toast.error(`No events found within a month of the date entered.`);
    console.error(`Error searching events.`);
    console.error(error);
  };

  getFormattedDate = (eventDate) => {
    // This function is used in rendering the main event start date
    // Returns the date string formatted as: Day, Mon Date, Year (ex: Wed, Feb 02, 2021)
    const newDate = new Date(eventDate).toString().split(" ");
    return `${newDate[1]} ${newDate[2]}, ${newDate[3]}`;
  };

  getFormattedTime = (eventDate) => {
    // Returns the date string formatted as local time: hr:min AM/PM (ex: 8:50 PM)
    const localTime = new Date(eventDate).toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" });
    return localTime[0] === "0" ? localTime.slice(1, localTime.length) : localTime;
  };

  changePage = (page) => {
    // This method is called when the user clicks on a pagination control, and updates state to the new page.
    // The setState callback function, then gets new events based on the update pagination.

    this.setState((prevState) => {
      let pagination = this.state.pagination;
      pagination.currentPage = page;
      return { pagination };
    }, this.updateEventsView);
  };

  onPageSizeChange = (e) => {
    // This function is called when the user changes the page size (next to the pagination controls).
    // This function updates the pagination pageSize in state, then calls the "updateEventsView" function, which uses the new pagination state variables.
    const newPageSize = e.currentTarget.value;
    this.setState(() => {
      const newPagination = { ...this.state.pagination };
      newPagination.pageSize = parseInt(newPageSize);
      if (newPagination.currentPage > newPagination.totalEvents / newPagination.pageSize) {
        newPagination.currentPage = Math.ceil(newPagination.totalEvents / newPagination.pageSize); // This protects against deleting the last event on the last page
      }
      return { pagination: newPagination };
    }, this.updateEventsView);
  };

  updateEventsView = () => {
    // This is the callback function for the Pagination "changePage" setState() call
    // This function will get new events depending on the pagination by calling the
    // "getEventDatabase" method, which will then set the new events to state

    // console.log(
    //   "About to get event database records: ",
    //   (this.state.pagination.currentPage - 1) * this.state.pagination.pageSize,
    //   this.state.pagination.currentPage * this.state.pagination.pageSize
    // );

    this.getEventDatabase(this.state.pagination.currentPage - 1, this.state.pagination.pageSize);

    // if (this.state.searchResultDate !== "") {
    // //
    //   const searchDates = getFormattedSearchDates();
    //   eventService
    //     .getEventsByDateRange(
    //       this.state.pagination.currentPage - 1,
    //       this.state.pagination.pageSize,
    //       this.state.searchEventStartInput
    //     )
    //     .then(this.onSearchEventsSuccess)
    //     .catch(this.onSearchEventsError);
    // } else {
    //   this.getEventDatabase(this.state.pagination.currentPage - 1, this.state.pagination.pageSize);
    // }
  };

  onSearchFieldKeyPress = (e) => {
    if (e.keyCode === 13) {
      // User hit Enter...start event search
      this.clickSearchEventsButton();
    }
  };

  changeSearchInput = (e) => {
    e.preventDefault();
    const searchField = e.currentTarget.value;
    this.setState(() => {
      const searchEventStartInput = searchField;
      return { searchEventStartInput };
    });
  };

  onMarkerLoad = (marker) => {
    // console.log("marker: ", marker);
  };

  googleMap = () => {
    // console.log("Updating mainEvent map....");
    let lat, lng;
    // debugger;
    if (this.state.mainEvent && this.state.mainEvent.latitude !== 0) {
      lat = this.state.mainEvent.latitude;
      lng = this.state.mainEvent.longitude;
      return (
        <LoadScript googleMapsApiKey="AIzaSyDcfaN_qpX0SIR5slg1HFo4Gxn67MYzr5I">
          <GoogleMap
            mapContainerStyle={{ height: "500px", width: "100%" }}
            zoom={15}
            center={{
              lat,
              lng,
            }}
          >
            <Marker position={{ lat: lat, lng: lng }} />
          </GoogleMap>
        </LoadScript>
      );
    } else {
      // For now, if event does not have lat/lng, then just show an empty image....
      // In the future, calculate the lat/lng based off of the address....
      return (
        <img
          style={{ width: "100%", height: "100%" }}
          src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
          alt="Not able to load map."
        />
      );
    }
  };

  clickSearchByLocation = (e) => {
    e.preventDefault();
    this.props.history.push("/events/search");
  };

  render() {
    // console.log("Rendering Events.jsx");

    return (
      <div className="col pl-3 mr-3">
        <div className="row m-0 pl-0 pt-2 pb-2 align-items-end">
          <h3 className="col pl-0" id="mainTitle" style={{ maxWidth: "fit-content" }}>
            Events:
          </h3>
          <h4 className="col-3 pl-0" style={{ minWidth: "fit-content" }}>
            {this.state.searchResultDate === "" ? "Upcoming Events" : "Search Results"}
          </h4>
          <div className="col"></div>
          <Button
            className="col-1 mb-1 ml-0 mt-0"
            color="success"
            style={{ maxWidth: "fit-content", minWidth: "fit-content", height: "fit-content" }}
            onClick={this.clickRefreshEventsButton}
          >
            Refresh Events
          </Button>
        </div>
        <EventAddModal
          modalShown={this.state.eventAddModalShown}
          toggleModal={this.toggleModal}
          submitEventForm={this.clickEventSubmitButton}
          event={this.state.modalEvent}
          deleteEvent={this.clickEventDeleteButton}
        />
        <div className="row ml-0 mr-0 pl-0" id="mainView">
          <div
            className="col pl-3 pt-3 pb-3 m-0 mr-3 mb-3 border border-secondary rounded latestEventView"
            style={{ height: "fit-content", minWidth: "460px", backgroundColor: "rgb(210, 217, 235)" }}
          >
            <div className="row eventHeader pl-0 pr-3 pt-0 pb-0 mb-0">
              <div className="col">
                <h4 className="row m-0 latestEventName">
                  {" "}
                  {this.state.events.length !== 0 ? this.state.mainEvent.name : ""}
                </h4>
                <div className="row pr-0 pl-3 pt-3">
                  <div className="col-3 p-0">
                    <strong>Slug:</strong>{" "}
                    <Button
                      color="link"
                      className="pr-0 ml-3 pl-0 latestEventSlug"
                      id="slugLink"
                      type="submit"
                      onClick={this.clickSlugLink}
                    >
                      {this.state.events.length !== 0 ? this.state.mainEvent.slug : ""}
                    </Button>
                  </div>
                  {/* <div className="col p-0"></div> */}
                  <div className="col p-0 text-right">
                    <strong>Start Date:</strong>{" "}
                  </div>
                  <div className="col-1 pr-0 text-left" style={{ minWidth: "110px" }}>
                    {this.state.mainEvent.hasOwnProperty("dateStart")
                      ? this.getFormattedDate(this.state.mainEvent.dateStart)
                      : ""}
                  </div>
                </div>
                <div className="row pr-0 pl-3 pt-0">
                  <div className="col p-0 text-right">
                    <strong>Start Time:</strong>{" "}
                  </div>
                  <div className="col-1 pr-0 text-left" style={{ minWidth: "110px" }}>
                    {this.state.mainEvent.hasOwnProperty("dateStart")
                      ? this.getFormattedTime(this.state.mainEvent.dateStart)
                      : ""}
                  </div>
                </div>
              </div>
            </div>
            <p className="row pl-3 pr-3 pt-3 latestEventDesc">
              {this.state.events.length !== 0 ? this.state.mainEvent.description : ""}
            </p>
            <div className="row">
              <div
                className="col-9 pl-0 pt-3 pb-3 pr-3 mr-0 ml-3 mb-3"
                id="map"
                style={{ height: "500px", width: "100%" }}
              >
                {/*  GOOGLE MAP HERE */}
                {this.googleMap()}
                {/* GOOGLE MAP ABOVE */}
              </div>
              <div className="col ml-3" style={{ minWidth: "160px" }}>
                <h5 className="row pt-2">Event Location:</h5>
                <div className="row mb-3 latestEventAddress">
                  {this.state.events.length !== 0 ? this.state.mainEvent.address : ""}
                </div>
              </div>
            </div>
            <div className="row eventFooter"></div>
          </div>
          <div className="col-4 rightSide" style={{ minWidth: "385px" }}>
            <div
              className="row eventSearchBar justify-content-left p-3 mb-3 border border-secondary rounded"
              style={{ backgroundColor: "rgb(210, 217, 235)" }}
            >
              <div className="col">
                <h5 className="row">Search Events By Date</h5>
                <div className="row">
                  <Form className="col form-inline pl-0 pr-0" style={{ flexFlow: "row" }}>
                    <Input
                      className="form-control"
                      type="date"
                      id="searchEventStartInput"
                      name="searchEventStartInput"
                      value={this.state.searchEventStartInput}
                      onChange={this.changeSearchInput}
                      style={{ width: "inherit", minWidth: "100px", maxWidth: "230px" }}
                    />
                    <Button
                      color="link"
                      className="navbar-toggler pr-0 ml-3 pl-0"
                      id="eventSearchButton"
                      type="submit"
                      onClick={this.clickSearchEventsButton}
                      style={{ fontSize: "x-large" }}
                    >
                      <span>
                        <FontAwesomeIcon icon={faSearch} />
                      </span>
                    </Button>
                  </Form>
                </div>
                <div className="row mt-3" style={{ marginBottom: "-13px" }}>
                  <h5 className="col pl-0">
                    Search Events By Location
                    <span>
                      <Button
                        color="link"
                        className="pr-0 ml-3 pl-0"
                        style={{ fontSize: "x-large" }}
                        // type="button"
                        onClick={this.clickSearchByLocation}
                      >
                        <FontAwesomeIcon icon={faBullseye} />
                      </Button>
                    </span>
                  </h5>
                </div>
              </div>
            </div>

            <div className="row border border-secondary rounded" style={{ backgroundColor: "rgb(210, 217, 235)" }}>
              <div className="col">
                <div className="row pt-2 mb-2">
                  <h3 className="col" style={{ textAlign: "center" }}>
                    Upcoming Events
                    <span>
                      <Button
                        color="link"
                        className="pr-0 ml-3 pl-0"
                        onClick={this.clickAddEventButton}
                        id="addEventButton"
                        style={{ fontSize: "x-large" }}
                      >
                        <FontAwesomeIcon icon={faPlusCircle} />
                      </Button>
                    </span>
                  </h3>
                </div>
                <div className="row eventPagination pl-1 pr-1 pb-1 justify-content-center" style={{}}>
                  <Pagination
                    total={this.state.pagination.totalEvents}
                    pageSize={this.state.pagination.pageSize}
                    current={this.state.pagination.currentPage}
                    onChange={this.changePage}
                  />
                </div>
                <div className="row pb-3 justify-content-center">
                  <div className="ml-2 my-auto" style={{ fontWeight: "500" }}>
                    {" "}
                    Events per page:{" "}
                  </div>
                  <select
                    type="select"
                    className="my-select-box ml-2 mr-2 col"
                    style={{ maxWidth: "60px", minWidth: "fit-content" }}
                    name="friendsPerPage"
                    value={this.state.pagination.pageSize}
                    onChange={this.onPageSizeChange}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <div className="row upcomingEvents justify-content-center">
                  <div className="col" id="displayEventCards">
                    {this.state.eventsObjs}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Events);
