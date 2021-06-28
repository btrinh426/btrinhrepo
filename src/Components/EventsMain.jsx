import React from "react";
import EventsJumbo from "./EventsJumbo";
import EventCards from "./EventCards";
import { InputGroup, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import EventsService from "../services/EventsService";
import Pagination from "rc-pagination";
import EventsModal from "./EventsModal";

class EventsMain extends React.Component {
  state = {
    pageInfo: {
      startPageIndex: 0,
      currentPage: 0,
      totalRecords: "",
      pageSize: 3,
    },
    eventObjects: "",
    showModal: false,
    selectedEventForModal: "",
    isEdit: false,
  };

  componentDidMount() {
    this.getAllEvents();
  }

  getAllEvents = () => {
    EventsService.getEvents(this.state.pageInfo.startPageIndex, 100)
      .then(this.onGetEventsSuccess)
      .catch(this.onGetEventsFail);
  };

  onGetEventsSuccess = (response) => {
    let eventsArr = response.data.item.pagedItems;
    let removeDeletedEvents = (event) => event.statusId !== "Deleted";
    let activeArr = eventsArr.filter(removeDeletedEvents);
    console.log(activeArr);
    let newEventsArr = activeArr.map(this.mapEventCards);
    let activeRecordCount = newEventsArr.length;
    var pagedEventArr = [];

    while (newEventsArr.length > 0) {
      pagedEventArr.push(newEventsArr.splice(0, this.state.pageInfo.pageSize));
    }

    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.eventObjects = pagedEventArr;
      newState.pageInfo.totalRecords = activeRecordCount;
      return newState;
    });
  };

  onGetEventsFail = (error) => {
    console.log(error.response);
  };

  mapEventCards = (event) => {
    return (
      <div key={event.id}>
        <EventCards event={event} editEvent={this.editEvent}></EventCards>
      </div>
    );
  };

  editEvent = (payload) => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.showModal = true;
      newState.selectedEventForModal = payload;
      newState.isEdit = true;
      return newState;
    });
  };

  addEvent = () => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.isEdit = false;
      newState.showModal = true;
      return newState;
    });
  };

  updateStateAfterAdd = () => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.isEdit = true;
      return newState;
    });
  };

  closeModal = () => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.showModal = false;
      newState.selectedEventForModal = "";
      return newState;
    });
  };

  pageChange = (page) => {
    let pageIndex = page - 1;
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.pageInfo.currentPage = pageIndex;
      return newState;
    });
  };

  render() {
    //console.log(this.state);
    return (
      <div className="row mt-3 ml-3 mr-3">
        <div className="col-8 bg-white border">
          <EventsJumbo></EventsJumbo>
        </div>
        <div className="col">
          <div className="col-11">
            <div className="col d-flex justify-content-center">
              <button
                className="btn btn-primary btn-lg col-6 mb-4"
                onClick={this.addEvent}
              >
                <FontAwesomeIcon icon={faPlusCircle} className="mr-3" />
                Add Event
              </button>
            </div>
            <div className="bg-white col border ml-1 mr-1">
              <h6 className="mt-2 mb-3 ml-2">Upcoming Events</h6>
              <InputGroup>
                <Input />
                <Button
                  color="secondary mb-2"
                  style={{ borderRadius: "0px 3px 3px 0px" }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup>
              {this.state.showModal && (
                <EventsModal
                  eventPayload={this.state.selectedEventForModal}
                  showModal={this.state.showModal}
                  closeModal={this.closeModal}
                  isEdit={this.state.isEdit}
                  mainGetAllEvents={this.getAllEvents}
                ></EventsModal>
              )}
              {/* Cards go here */}
              {this.state.eventObjects[this.state.pageInfo.currentPage]}
              <div className="row d-flex justify-content-center mt-3 mb-3">
                <Pagination
                  onChange={this.pageChange}
                  current={this.state.pageInfo.currentPage + 1}
                  total={this.state.pageInfo.totalRecords}
                  pageSize={this.state.pageInfo.pageSize}
                ></Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventsMain;
