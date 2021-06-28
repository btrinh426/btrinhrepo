import React from "react";
import eventService from "../services/eventService";
import SingleEvent from "./SingleEvent";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import Pagination from "rc-pagination";

class Events extends React.Component {
  state = { events: [], eventsComponents: [] };
  showEvents = () => {
    eventService
      .getEvents(0)
      .then(this.onShowEventsSuccess)
      .catch(this.onShowEventsError);
  };

  componentDidMount() {
    this.showEvents();
  }

  onShowEventsSuccess = (response) => {
    let newData = response.data.item.pagedItems;
    let totalItem = response.data.item.totalCount;
    let current = response.data.item.pageIndex;
    console.log(response);
    this.setState(() => {
      let newState = {};
      newState.events = newData;
      newState.current = current + 1;
      newState.total = totalItem;
      newState.eventsComponents = newData.map(this.mapEvent);
      return newState;
    });
  };

  onShowEventsError = (response) => {
    console.log(response);
  };

  mapEvent = (oneEvent) => {
    return (
      <SingleEvent
        key={oneEvent.id}
        events={oneEvent}
        onDeleteById={this.onDeleteById}
        onEdit={this.editEvent}
      ></SingleEvent>
    );
  };

  onDeleteById = (event) => {
    console.log(event);
    eventService
      .deleteEventById(event.id)
      .then(this.onDeleteEventSuccess)
      .catch(this.onDeleteEventError);
  };

  onDeleteEventSuccess = (response) => {
    console.log(response);
    this.setState((prevState) => {
      const indexOfEvent = this.state.events.findIndex(
        (aEvent) => aEvent.id === response
      );

      console.log(indexOfEvent);

      const updatedEvent = [...prevState.eventsComponents];

      if (indexOfEvent >= 0) {
        updatedEvent.splice(indexOfEvent, 1);
      }
      updatedEvent.map(this.mapEvent);
      return {
        eventsComponents: updatedEvent,
      };
    }, this.stateChanged);
  };

  onDeleteEventError = (response) => {
    console.log(response);
    toast.error("Delete Friend error");
  };

  editEvent = (event) => {
    this.props.history.push("/event/edit/" + event.id, {
      type: "EDIT_EVENT",
      payload: { ...event },
    });
  };

  fieldChangeEvent = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      return newState;
    });
  };

  searchEvent = () => {
    console.log(this.state.searchName);
    var data = this.state.searchName;
    var pageIndex = 0;
    if (data) {
      eventService
        .searchEvent(data, pageIndex)
        .then(this.onShowEventsSuccess)
        .catch(this.onShowEventsError);
    } else {
      this.showEvents();
    }
  };

  onChange = (page) => {
    var searchInput = this.state.searchName;

    if (searchInput) {
      this.setState((prevState) => {
        var pageIndex = prevState.current;
        pageIndex = page - 1;
        eventService
          .searchFriend(searchInput, pageIndex)
          .then(this.onSearchAndGetFriendSuccess)
          .catch(this.OnSearchAndGetFriendError);
        return { current: page };
      });
    } else {
      this.setState((prevState) => {
        var pageIndex = prevState.current;
        pageIndex = page - 1;
        eventService
          .getEvents(pageIndex, 3)
          .then(this.onShowEventsSuccess)
          .catch(this.onShowEventsError);
        return { current: page };
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <h1>Events</h1>
          <form
            className="form-inline my-2 my-lg-0"
            style={{ padding: "10px" }}
          >
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search Event"
              aria-label="Search"
              name="searchName"
              onChange={this.fieldChangeEvent}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              value={this.state.searchName}
              onClick={this.searchEvent}
            >
              Search
            </button>
            <div className="col float-right">
              <button
                className="btn btn-outline-success my-2 my-sm-0 "
                style={{ float: "right" }}
                type="button"
              >
                <NavLink to="/event/new" exact>
                  Add Event
                </NavLink>
              </button>
            </div>
          </form>
        </div>
        <hr />
        <div className="container">
          <div className="row">{this.state.eventsComponents}</div>
          <div></div>
          <Pagination
            onChange={this.onChange}
            current={this.state.current}
            total={this.state.total}
            // pageSize={this.state.pageSize}
            pageSize={4}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Events;
