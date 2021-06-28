import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Input, Form } from "reactstrap";
import Pagination from "rc-pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";

import * as eventService from "../services/eventService";
import EventAddModal from "./EventAddModal";
import EventCard from "./EventCard";

// import { render } from "react-dom";

class Events extends Component {
  state = {
    events: [],
    eventsObjs: [],
    searchString: "",
    isSearchResult: false,
    pagination: {
      currentPage: 1,
      totalEvents: 0,
      pageSize: 5,
    },
    eventAddModalShown: false,
    modalEvent: {},
  };

  componentDidMount = () => {
    console.log("Events component mounted....getting events database....");
    this.getEventDatabase(0, 100); // For the first call to the event database try to get the first 100 events
  };

  componentDidUpdate = () => {
    // console.log(`componentDidUpdate. `, this.state.events);
    // console.log(`prevState: `, prevState);
    // if (this.state.events != prevState.events) {
    //   this.getEventDatabase();
    // }
  };

  clickAddEventButton = (e) => {
    e.preventDefault();
    // console.log("Click Add Event Button....");
    // Open EventAddModal here
    this.setState(() => {
      const newState = { ...this.state };
      newState.eventAddModalShown = true;
      return newState;
    });
  };

  clickShowHideEvents = (e) => {
    console.log("Clicked Show/Hide Events Button.");
    // if (e.currentTarget.innerText.indexOf("Show") !== -1) {
    //   document.getElementById("mainTitle").innerText = "Events";
    //   e.currentTarget.innerText = "Hide Active Events";
    //   document.getElementById("searchEventsInput").value = "";
    //   document.getElementById("displayEventCards").classList.remove("d-none");
    //   this.props.history.push("/events");
    //   this.setState((prevState) => {
    //     const newState = { ...prevState };
    //     newState.isSearchResult = false;
    //     newState.searchString = "";
    //     newState.pagination.currentPage = 1;
    //     return newState;
    //   }, this.updateEventsView);
    // } else {
    //   e.currentTarget.innerText = "Show Active Events";
    //   document.getElementById("displayEventCards").classList.add("d-none");
    // }
  };

  getEventDatabase = (pageIndex = 0, pageSize = this.state.pagination.pageSize) => {
    const searchDates = this.getFormattedSearchDates();
    eventService
      .getEventsByDateRange(pageIndex, pageSize, searchDates.start, searchDates.end)
      .then(this.onGetEventDatabaseSuccess)
      .catch(this.onGetEventDatabaseError);

    // eventService.getEvents(pageIndex, pageSize).then(this.onGetEventDatabaseSuccess).catch(this.onGetEventDatabaseError);
  };

  onGetEventDatabaseSuccess = (response) => {
    console.log("Success getting events from database.");
    this.updateStateWithEvents(response);
  };

  onGetEventDatabaseError = (error) => {
    debugger;
    let errorText = error.response.data.errors.join("\n");
    console.error("Error getting events from database:");
    console.error(errorText);
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
    let events, eventsObjs;
    console.log("Pagination page size:", this.state.pagination.pageSize);
    if (this.state.pagination.totalEvents === 0) {
      // If this is the first call to get events, do not map all the events: only the appropriate page size of events
      events = [...response.data.item.pagedItems].splice(0, this.state.pagination.pageSize);
      eventsObjs = [...response.data.item.pagedItems]
        .splice(0, this.state.pagination.pageSize)
        .map(this.mapSingleEvent);
    } else {
      eventsObjs = response.data.item.pagedItems.map(this.mapSingleEvent);
      events = response.data.item.pagedItems;
    }
    this.setState(
      (prevState) => {
        const newState = { ...prevState };
        newState.events = events;
        newState.eventsObjs = eventsObjs;
        newState.pagination.totalEvents = response.data.item.totalCount;
        return newState;
      },
      () => {
        console.log("Finished setting event array in state.");
      }
    );
  };

  mapSingleEvent = (aEvent) => {
    // This function takes a event from the event array and returns a formatted react element for that event to be used in the rendering of the page
    // console.log(`Map event:  ${event.headline}`);
    // debugger;
    return (
      <div
        className={aEvent.statusId !== "Active" ? " cardparent notInDatabase" : "cardParent"}
        key={aEvent.id.toString()}
        id={aEvent.id}
      >
        <EventCard event={aEvent} clickView={this.clickEventCardViewButton} clickEdit={this.clickEventCardEditButton} />
      </div>
    );
  };

  clickEventCardViewButton = (event) => {
    console.log(`View event, ID#: ${event.id}`);
    if (!this.state.eventAddModalShown) {
      this.setState(() => {
        let eventToShow = { ...this.state.modalEvent };
        eventToShow = event;
        return { eventToShow };
      }, this.toggleModal(this.state.modalEvent));
    } else {
      console.log("Event Add/Update Modal already open.");
    }
    // const eventInfo = this.state.events.find((event) => event.id === eventId);
    // this.setState(() => {
    //   const newState = { ...this.state };
    //   newState.eventAddModalShown = true;
    //   return newState;
    // });
  };

  clickEventCardEditButton = (eventId) => {
    console.log(`Edit event, ID#: ${eventId}`);
    // const targetURL = `../events/${eventId}/edit`;
    // let eventInfo = this.state.events.find((event) => event.id === eventId);
    // this.props.history.push(targetURL, { eventInfo });
    // document.getElementById("getEvents").innerText = "Show Active Events";
  };

  clickEventSubmitButton = (e) => {
    e.preventDefault();
    const eventData = this.getNewEventData();
    if (!this.state.eventForm.hasOwnProperty("id")) {
      // Add new event
      eventService.addEvent(eventData).then(this.onAddEventSuccess).catch(this.onAddEventError);
    } else {
      // Update old event
      eventData.id = this.state.eventForm.id;
      eventService.updateEvent(eventData).then(this.onUpdateEventSuccess).catch(this.onUpdateEventError);
    }
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

  clickSearchEventsButton = (e) => {
    if (e) {
      e.preventDefault();
    }
    const searchString = document.getElementById("searchEventsInput").value;
    console.log("Search Button clicked. Search string: ", searchString);

    // const notWhiteSpace = /\S\w*/;
    // if (!searchString.match(notWhiteSpace)) {
    //   toast.error(`Invalid search string.`);
    //   return;
    // }
    // const searchDates = getFormattedSearchDates(searchString, 30);
    // // The second argument is the number of days to search from the start date (defaults to 30 days)

    // eventService
    //   .getEventsByDateRange(0, 50, searchDates.start, searchDates.end)
    //   .then(this.onGetEventByDateRangeSuccess)
    //   .catch(this.onGetEventByDateRangeError);
  };

  onGetEventByDateRangeSuccess = (response) => {
    document.getElementById("mainTitle").innerText = "Search Results";
    if (!this.state.isSearchResult || this.state.searchString !== document.getElementById("searchEventsInput").value) {
      // This was the first search result
      document.getElementById("getEvents").innerText = "Show Active Events";
      document.getElementById("displayEventCards").classList.remove("d-none");

      console.log("Success searching for event.");
      console.log("Response data:");
      console.log(response.data.item.pagedItems);
      const totalCount = response.data.item.totalCount;
      const totalPages = response.data.item.totalPages;
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
        newState.searchString = document.getElementById("searchEventsInput").value;
        newState.isSearchResult = true;
        return newState;
      });
    } else {
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

    document.getElementById("getEvents").innerText = "Show Active Events";
  };

  onGetEventByDateRangeError = (error) => {
    debugger;
    const errorText = error.response.statusText;
    // const searchDate = this.searchTextFromAxiosResponse(error);
    console.error(`Error searching events.`);
    console.error(errorText);
    toast.error(`No events found within a month of the date entered.`);
  };

  getFormattedDate = (eventDate) => {
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
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.pagination.currentPage = page;
      return newState;
    }, this.updateEventsView);
  };

  updateEventsView = () => {
    this.getEventDatabase(this.state.pagination.currentPage - 1, this.state.pagination.pageSize);

    // if (this.state.isSearchResult) {
    //   const searchDates = getFormattedSearchDates();
    //   eventService
    //     .getEventsByDateRange(
    //       this.state.pagination.currentPage - 1,
    //       this.state.pagination.pageSize,
    //       this.state.searchString
    //     )
    //     .then(this.onSearchEventsSuccess)
    //     .catch(this.onSearchEventsError);
    // } else {
    //   this.getEventDatabase(this.state.pagination.currentPage - 1, this.state.pagination.pageSize);
    // }
  };

  clickSlugLink = (e) => {
    e.preventDefault();
    const targetEvent = this.state.events.find((event) => event.slug === e.currentTarget.innerText);
    console.log({ targetEvent });
    console.log(`Clicked slug for event, ID#: ${this.state.events[0].id}`);
    if (!this.state.eventAddModalShown) {
      this.setState(() => {
        let modalEvent = { ...this.state.modalEvent };
        modalEvent = targetEvent;
        return { modalEvent };
      }, this.toggleModal(this.state.modalEvent));
    } else {
      console.log("Event Add/Update Modal already open.");
    }
  };

  toggleModal = (targetEvent = {}) => {
    console.log("toggleModal running...");
    this.setState(() => {
      let newState = { ...this.state };
      newState.eventAddModalShown = !newState.eventAddModalShown;
      newState.modalEvent = targetEvent;
      return newState;
    });
  };

  onSearchFieldKeyPress = (e) => {
    if (e.keyCode === 13) {
      // User hit Enter...start event search
      this.clickSearchEventsButton();
    }
  };

  render() {
    console.log("Rendering Events.jsx");

    // Format event Button:
    // let eventShowHideButton;
    // if (this.state.events.length === 0) {
    //   eventShowHideButton = (
    //     <Button
    //       className="col-1 mb-1 ml-0 mt-0 mr-3"
    //       id="getEvents"
    //       color="success"
    //       style={{ minWidth: "170px", height: "fit-content" }}
    //       onClick={this.clickShowHideEvents}
    //     >
    //       Show Active Events
    //     </Button>
    //   );
    // } else {
    //   eventShowHideButton = (
    //     <Button
    //       className="col-1 mb-1 ml-0 mt-0 mr-3"
    //       id="getEvents"
    //       color="success"
    //       style={{ minWidth: "170px", height: "fit-content" }}
    //       onClick={this.clickShowHideEvents}
    //     >
    //       Hide Active Events
    //     </Button>
    //   );
    // }

    return (
      <div className="col pl-3 mr-3">
        <div className="row m-0 pl-0 pt-2 pb-2">
          <h3 className="col pl-0" id="mainTitle">
            Events
          </h3>
        </div>
        <EventAddModal
          modalShown={this.state.eventAddModalShown}
          toggleModal={this.toggleModal}
          submitEventForm={this.clickEventSubmitButton}
          event={this.state.modalEvent}
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
                  {this.state.events.length !== 0 ? this.state.events[0].name : ""}
                </h4>
                <div className="row pr-0 pl-3 pt-3">
                  <div className="col-3 p-0">
                    Slug:{" "}
                    <Button
                      color="link"
                      className="pr-0 ml-3 pl-0 latestEventSlug"
                      id="slugLink"
                      type="submit"
                      onClick={this.clickSlugLink}
                    >
                      {this.state.events.length !== 0 ? this.state.events[0].slug : ""}
                    </Button>
                  </div>
                  <div className="col p-0"></div>
                  <div className="col p-0 text-right">
                    Start Date:{" "}
                    <span className="latestEventDate">
                      {this.state.events.length !== 0 ? this.state.events[0].metaData.dateStart : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="row pl-3 pr-3 pt-3 latestEventDesc">
              {this.state.events.length !== 0 ? this.state.events[0].description : ""}
            </p>
            <div className="row">
              <div className="col-9 p-3 mr-0 ml-3 mb-3" id="map" style={{ height: "500px", width: "100%" }}></div>
              <div className="col ml-3" style={{ minWidth: "160px" }}>
                <h5 className="row">Event Location:</h5>
                <div className="row mb-3 latestEventAddress">
                  {this.state.events.length !== 0 ? this.state.events[0].metaData.location.address : ""}
                </div>
                <div className="row">
                  <div className="pl-0" style={{ width: "30px !important" }}>
                    Date:
                  </div>
                  <div className="col pl-3 latestEventDate my-Label text-nowrap">
                    {this.state.events.length !== 0
                      ? this.getFormattedDate(this.state.events[0].metaData.dateStart)
                      : ""}
                  </div>
                </div>
                <div className="row">
                  <div className="pl-0" style={{ width: "30px !important" }}>
                    Time:
                  </div>
                  <div className="col pl-3 latestEventTime my-Label">
                    {this.state.events.length !== 0
                      ? this.getFormattedTime(this.state.events[0].metaData.dateStart)
                      : ""}
                  </div>
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
                      id="searchEventStartInput"
                      type="date"
                      placeholder=""
                      style={{ width: "inherit", minWidth: "100px" }}
                    />
                    <Button
                      color="link"
                      className="navbar-toggler pr-0 ml-3 pl-0"
                      id="eventSearchButton"
                      type="submit"
                      onClick={this.clickSearchEventsButton}
                    >
                      <span>
                        <FontAwesomeIcon icon={faSearch} />
                      </span>
                    </Button>
                  </Form>
                </div>
              </div>
            </div>

            <div
              className="row upcomingEventView border border-secondary rounded"
              style={{ backgroundColor: "rgb(210, 217, 235)" }}
            >
              <div className="col">
                <div className="row">
                  <span className="col h4 pl-3 pt-2 mb-0eventListLabel align-middle">Upcoming Events</span>
                  <span className="align-middle pr-3">
                    <Button
                      color="link"
                      className="m-0 p-0"
                      onClick={this.clickAddEventButton}
                      id="addEventButton"
                      style={{ fontSize: "xx-large" }}
                    >
                      <span>
                        <FontAwesomeIcon icon={faPlusCircle} />
                      </span>
                    </Button>
                  </span>
                </div>
                <div className="row eventPagination p-3 justify-content-center ">
                  <Pagination
                    total={this.state.pagination.totalJobs}
                    defaultPageSize={this.state.pagination.pageSize}
                    current={this.state.pagination.currentPage}
                    onChange={this.changePage}
                  />
                </div>
                <div className="row upcomingEvents justify-content-center">
                  <div className="col" id="displayEventCards"></div>
                </div>
              </div>
              <div className="eventCardTemplate d-none">
                <div
                  className="card border-1 p-2 mt-0 ml-0 mr-0 mb-3"
                  style={{
                    /* width: 15rem; */
                    /* height: 20rem; */
                    borderColor: "#929089",
                    backgroundColor: "rgb(100 152 107 / 30%) !important",
                  }}
                >
                  <div className="" style={{ textAlign: "center", alignItems: "center" }}></div>

                  <div className="card-body pt-0" style={{ textAlign: "center" }}>
                    <h5 className="card-title eventName">Event Name</h5>
                    <h6 className="card-title eventDate">Event dateStart</h6>
                    <p className="card-text m-0 eventDesc" style={{ maxHeight: "200px", overflow: "auto" }}>
                      Event description.
                    </p>
                  </div>

                  <div className="card-footer text-center p-2">
                    <div>
                      <Button type="submit" color="primary" className=" btn-sm mr-1 viewEvent">
                        View More
                      </Button>
                      <Button type="submit" color="secondary" className=" btn-sm mr-1 ml-1 editEvent">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      /* <div
          className="container row border border-secondary rounded mb-0 mr-3 ml-0 pl-3 pt-3 pr-3 pb-0 "
          id="mainView"
          style={{ backgroundColor: "rgb(210, 217, 235)", minWidth: "600px", maxWidth: "2100px" }}
        >
          <div className="col pl-3 pt-0 pb-0 m-0">
            <div className="row pl-0 pr-3 pt-0 pb-0 mb-3">
              <Button
                className="col-1 btn mb-1 ml-0 mt-0 mr-3"
                id="addEventButton"
                color="primary"
                style={{ minWidth: "200px", height: "fit-content" }}
                onClick={this.clickAddEventButton}
              >
                Add A Event
              </Button>
              {eventShowHideButton}
              <div className="col">
                <div className="row">
                  <Input
                    className="Form-control mr-2 mb-1"
                    id="searchEventsInput"
                    type="search"
                    aria-Label="Search"
                    style={{ minWidth: "150px", maxWidth: "200px" }}
                    onKeyDown={this.onSearchFieldKeyPress}
                  />
                  <Button
                    color="link mb-1 p-0"
                    id="searchEventsButton"
                    type="submit"
                    onClick={this.clickSearchEventsButton}
                  >
                    <span>
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="row" id="displayEventCards">
              <div className="col">
                <div className="row mb-3">
                  <Pagination
                    total={this.state.pagination.totalEvents}
                    defaultPageSize={this.state.pagination.pageSize}
                    current={this.state.pagination.currentPage}
                    onChange={this.changePage}
                  />
                </div>
                <div className="row">
                  <div className="col nav-item pl-0 pr-3">
                    <div className="row displayEventCards pl-3 pr-3 pb-0 pt-0">{this.state.eventsObjs}</div>
                    <div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */
    );
  }
}

export default withRouter(Events);
