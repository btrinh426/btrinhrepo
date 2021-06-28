import React from "react";
import * as eventService from "./services/eventService";
import SingleEvent from "./SingleEvent";

class Events extends React.Component {
  state = {
    mainEvent: {
      name: "",
      description: "",
      summary: "",
      slug: "",
      date: 0,
    },
    pageIndex: 0,
    pageSize: 10,
  };

  componentDidMount() {
    eventService
      .getAll(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetEventsSuccess)
      .catch(this.onGetEventsError);

    // eventService
    //   .getMain()
    //   .then(this.onGetMainSuccess)
    //   .catch(this.onGetMainError);
  }

  onViewMore = (event) => {
    console.log(event);
  };
  onEdit = (event) => {
    console.log(event);
  };

  showMainEvent = (event) => {
    //let date = event.metaData.dateStart.split("T")[0].split("-");
    //date = date[1] + "." + date[2] + "." + date[0];

    return (
      <div className="card">
        <div className="card-header text-center">
          <h2>
            Event: <strong>{this.state.mainEvent.name}</strong>
          </h2>
        </div>
        <div className="card-body container">
          <div className="row">
            <h6 className="text-left float-left col-6">
              Link: {this.state.mainEvent.slug}
            </h6>
            <h6 className="text-right float-right col-6">
              Date: {this.state.mainEvent.date}
            </h6>
          </div>
          <div className="card-text text-left pt-1 px-2">
            {this.state.mainEvent.description}
          </div>
        </div>
      </div>
    );
  };

  mapEvent = (event) => {
    let date = event.metaData.dateStart.split("T")[0].split("-");
    date = date[1] + "." + date[2] + "." + date[0];

    return (
      <SingleEvent
        key={event.id}
        event={event}
        onView={this.onViewMore}
        onEdit={this.onEdit}
      ></SingleEvent>
    );
  };

  onGetEventsSuccess = (response) => {
    console.log(response.data.item.pagedItems);
    let events = response.data.item.pagedItems;
    let mainEvent = events[events.length - 1];
    mainEvent.date = mainEvent.metaData.dateStart.split("T")[0].split("-");
    mainEvent.date =
      mainEvent.date[1] + "." + mainEvent.date[2] + "." + mainEvent.date[0];
    console.log(mainEvent.date);

    this.setState((prevState) => {
      return {
        ...prevState,
        events: events.map(this.mapEvent),
        mainEvent,
      };
    });
  };
  onGetEventsError = (err) => {
    console.warn(err);
  };

  //   onGetMainSuccess = (response) => {
  //     console.log(response);
  //   };
  //   onGetMainError = (err) => {
  //     console.warn(err);
  //   };

  render() {
    return (
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="col-9 text-center">
            {this.showMainEvent(this.state.mainEvent)}
            {/* <div className="card">
              <div className="card-header text-center">
                <h2>Event Name</h2>
              </div>
              <div className="card-body container">
                <div className="row">
                  <h6 className="text-left float-left col-6">
                    Link: {this.state.mainEvent.slug}
                  </h6>
                  <h6 className="text-right float-right col-6">Date:</h6>
                </div>
                <div className="card-text text-left pt-1 px-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Egestas maecenas pharetra convallis posuere morbi leo urna.
                  Aliquam ultrices sagittis orci a scelerisque purus semper eget
                  duis. Proin sagittis nisl rhoncus mattis rhoncus urna neque.
                  Mauris commodo quis imperdiet massa tincidunt nunc. Tortor
                  posuere ac ut consequat semper viverra. Netus et malesuada
                  fames ac turpis. Donec pretium vulputate sapien nec sagittis.
                  Blandit volutpat maecenas volutpat blandit aliquam etiam.
                  Fringilla phasellus faucibus scelerisque eleifend donec
                  pretium vulputate sapien nec. Euismod lacinia at quis risus
                  sed vulputate odio ut enim. Ante in nibh mauris cursus mattis
                  molestie. Tempor orci eu lobortis elementum. Dictum at tempor
                  commodo ullamcorper a lacus vestibulum sed. Faucibus a
                  pellentesque sit amet porttitor eget. Nec ullamcorper sit amet
                  risus nullam. Tortor condimentum lacinia quis vel eros donec.
                  Nunc sed augue lacus viverra. Fringilla phasellus faucibus
                  scelerisque eleifend. Viverra vitae congue eu consequat ac
                  felis donec. Tortor at auctor urna nunc id cursus. Nam libero
                  justo laoreet sit amet cursus sit amet.
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-3 container">
            <div className="card row mb-5 mx-auto">Search</div>
            <div className="card">
              <div className="card-header">
                <h5>Upcoming Events:</h5>
              </div>
              <div className="card-body container">
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
