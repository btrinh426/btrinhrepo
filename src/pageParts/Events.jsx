import React from "react";
import SingleEvent from "./SingleEvent";
import * as eventService from "../services/eventService";

class Events extends React.Component {
  state = {
    photoUrl: "https://i.imgur.com/CQmOoYR.jpg",
    events: [],
    mainEvent: {},
  };

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents = () => {
    eventService
      .getEvents()
      .then(this.onGetEventsSuccess)
      .catch(this.onGetEventsError);
  };

  onGetEventsSuccess = (response) => {
    console.log(response.data.items);

    let myEvents = response.data.items;
    let main = myEvents[0];

    console.log(myEvents[0]);
    myEvents.shift();
    // //let totalCount = response.data.item.totalCount;

    this.setState((prevState) => {
      return {
        prevState,
        events: myEvents.map(this.mapEvent),
        mainEvent: main,
        //total: totalCount,
      };
    });
  };

  onGetEventsError = (errResponse) => {
    console.log("no friends");
  };

  onViewMore = (event) => {
    console.log("gettin back to events");
    console.log(event);

    eventService
      .getExclusion(event.id)
      .then(this.onGetEventsSuccess)
      .catch(this.onGetEventsError);
  };

  mapEvent = (event) => {
    return (
      <React.Fragment key={event.id}>
        <SingleEvent
          oneEvent={event}
          onClick={this.onViewMore}
          //   onEditClick={this.onEditClick}
        />
      </React.Fragment>
    );
  };

  onOpenAdd = () => {
    console.log("add was clicked");
    this.props.history.push("/events/add");
  };

  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ paddingTop: "25px" }}>
          <div className="row ">
            <div className="col-justify-content-md-right">
              putting search box here
            </div>
            <div className="col-sm">
              <button className="btn btn-secondary editEvent">Search</button>
            </div>
            <div className="col-justify-content-md-right">
              <button className="btn btn-secondary" onClick={this.onOpenAdd}>
                Add New Event
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>left side</h1>
              <div className="event-card bg-blk-box">
                <div className="card-body">
                  <h1 className="card-name">{this.state.mainEvent.title}</h1>
                  <img
                    className="card-img-top"
                    src={this.state.mainEvent.image}
                    alt="..."
                  />
                  <p>{this.state.mainEvent.headline}</p>
                  <p>{this.state.mainEvent.summary}</p>
                  <p>
                    When: {this.state.mainEvent.eventDate} | Where:
                    {this.state.mainEvent.address}
                  </p>
                  <button className="btn btn-secondary edit">Edit</button>
                </div>
              </div>
            </div>
            <div className="col">
              <h2> right side </h2>
              {this.state.events}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Events;
