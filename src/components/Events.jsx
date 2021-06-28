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
  };

  componentDidMount = () => {
    // console.log("Events component mounted....getting events database....");
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
    console.log("Click Add Event Button....");
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
    console.log("toggleModal running...");
    this.setState(() => {
      let newState = { ...this.state };
      newState.eventAddModalShown = !newState.eventAddModalShown;
      newState.modalEvent = targetEvent;
      return newState;
    });
  };

  getEventDatabase = (pageIndex = 0, pageSize = this.state.pagination.pageSize) => {
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
    // console.log("Success getting events from database.");
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
    // console.log("Pagination page size:", this.state.pagination.pageSize);
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
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.events = events;
      newState.mainEvent = events[0];
      newState.eventsObjs = eventsObjs;
      newState.pagination.totalEvents = response.data.item.totalCount;
      return newState;
    });
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

    // Put this card's information in the main window
    this.setState(() => {
      const mainEvent = event;
      return { mainEvent };
    }, window.scrollTo(0, 0));
  };

  clickEventCardEditButton = (event) => {
    console.log(`View event, ID#: ${event.id}`);
    const targetEvent = this.state.events.find((anyEvent) => anyEvent.id === event.id);
    this.toggleModal(targetEvent);
  };

  clickEventSubmitButton = (eventData) => {
    this.setState(
      () => {
        const modalEvent = eventData;
        return { modalEvent };
      },
      () => {
        const newEvent = this.formatEventData(this.state.modalEvent);
        if (this.state.modalEvent.id === "") {
          // Add new event
          // console.log("Adding new event.");
          eventService.addEvent(newEvent).then(this.onAddEventSuccess).catch(this.onAddEventError);
        } else {
          // Update old event
          // console.log("Updating existing event.");
          eventService.updateEvent(newEvent).then(this.onUpdateEventSuccess).catch(this.onUpdateEventError);
        }
      }
    );
  };

  formatEventData = (event) => {
    if (event.id === "") {
      //Format new event
      return {
        metaData: {
          dateStart: event.dateStart,
          dateEnd: event.dateEnd,
          location: {
            latitutde: 0,
            longitude: 0,
            zipCode: event.zipCode,
            address: event.address,
          },
        },
        name: event.name,
        headline: event.headline,
        description: event.description,
        summary: event.summary,
        slug: event.slug,
        statusId: event.statusId,
      };
    } else {
      //Format existing event
      const eventInState = this.state.events.find((stateEvent) => stateEvent.id === event.id);

      return {
        id: event.id,
        metaData: {
          dateStart: event.dateStart,
          dateEnd: event.dateEnd,
          location: {
            latitutde: eventInState.metaData.latitude, //This needs to be fixed to input a correct lat/long
            longitude: eventInState.metaData.longitude, //This needs to be fixed to input a correct lat/long
            zipCode: event.zipCode,
            address: event.address,
          },
        },
        name: event.name,
        headline: event.headline,
        description: event.description,
        summary: event.summary,
        slug: event.slug,
        statusId: event.statusId,
      };
    }
  };

  onAddEventSuccess = (response) => {
    toast.success(`Added new event, ID: ${response.data.item}`);
    console.log("Event added, ID# ", response.data.item);
  };

  onAddEventError = (error) => {
    debugger;
    toast.error("Could not add new event.");
    console.error(error);
  };

  onUpdateEventSuccess = (response) => {
    toast.success(`Updated event`);
    console.log(`Updated event.`);
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
      .getEventsByDateRange(0, 50, searchDates.start, searchDates.end)
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
      let pagination = this.state.pagination;
      pagination.currentPage = page;
      return { pagination };
    }, this.updateEventsView);
  };

  updateEventsView = () => {
    console.log(
      "About to get event database records: ",
      (this.state.pagination.currentPage - 1) * this.state.pagination.pageSize,
      this.state.pagination.currentPage * this.state.pagination.pageSize
    );

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

  render() {
    // console.log("Rendering Events.jsx");

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
                  {this.state.events.length !== 0 ? this.state.mainEvent.name : ""}
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
                      {this.state.events.length !== 0 ? this.state.mainEvent.slug : ""}
                    </Button>
                  </div>
                  <div className="col p-0"></div>
                  <div className="col p-0 text-right">
                    Start Date:{" "}
                    <span className="latestEventDate">
                      {this.state.events.length !== 0 ? this.state.mainEvent.metaData.dateStart : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="row pl-3 pr-3 pt-3 latestEventDesc">
              {this.state.events.length !== 0 ? this.state.mainEvent.description : ""}
            </p>
            <div className="row">
              <div className="col-9 p-3 mr-0 ml-3 mb-3" id="map" style={{ height: "500px", width: "100%" }}></div>
              <div className="col ml-3" style={{ minWidth: "160px" }}>
                <h5 className="row">Event Location:</h5>
                <div className="row mb-3 latestEventAddress">
                  {this.state.events.length !== 0 ? this.state.mainEvent.metaData.location.address : ""}
                </div>
                <div className="row">
                  <div className="pl-0" style={{ width: "30px !important" }}>
                    Date:
                  </div>
                  <div className="col pl-3 latestEventDate my-Label text-nowrap">
                    {this.state.events.length !== 0
                      ? this.getFormattedDate(this.state.mainEvent.metaData.dateStart)
                      : ""}
                  </div>
                </div>
                <div className="row">
                  <div className="pl-0" style={{ width: "30px !important" }}>
                    Time:
                  </div>
                  <div className="col pl-3 latestEventTime my-Label">
                    {this.state.events.length !== 0
                      ? this.getFormattedTime(this.state.mainEvent.metaData.dateStart)
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
                      type="date"
                      id="searchEventStartInput"
                      name="searchEventStartInput"
                      value={this.state.searchEventStartInput}
                      onChange={this.changeSearchInput}
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
                    total={this.state.pagination.totalEvents}
                    defaultPageSize={this.state.pagination.pageSize}
                    current={this.state.pagination.currentPage}
                    onChange={this.changePage}
                  />
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
                    id="searchEventStartInput"
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
