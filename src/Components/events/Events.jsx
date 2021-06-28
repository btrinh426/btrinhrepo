import React from "react";
import LatestEvent from "./LatestEvent";
import UpcomingEvent from "./UpcomingEvent";
import EventModal from "./EventModal";
import EventForm from "./EventForm";
import * as eventService from "../../services/eventServices";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

//Plug Api key at index.html, Events.jsx, LatestEvent.jsx

class Events extends React.Component {
  state = {
    pageIndex: 0,
    pageSize: 4,
    current: 1,
    mappedLatest: "",
    mappedUpcoming: "",
    isOpen: false,
    latestEvent: { name: "" },
    formData: {},
  };
  componentDidMount = () => {
    this.onLoadGetEvents();
  };

  onLoadGetEvents = () => {
    eventService
      .getUpcoming(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetUpcomingSuccess)
      .catch(this.onGetUpcomingError);
  };
  onGetUpcomingSuccess = (response) => {
    this.setState((prevState) => {
      let total = response.data.item.totalCount;
      let events = response.data.item.pagedItems;
      let nextEvent = events.slice(0, 1);
      events.shift();
      let upcomingEvents = events;
      let newState = { ...prevState };
      newState.latestEvent = nextEvent;
      newState.mappedLatest = nextEvent.map(this.mapLatest);
      newState.mappedUpcoming = upcomingEvents.map(this.mapUpcoming);
      newState.totalCount = total;
      return newState;
    });
  };
  onGetUpcomingError = (err) => {
    console.error(err);
  };

  mapLatest = (event) => {
    return <LatestEvent key={event.id} oneEvent={event} />;
  };
  mapUpcoming = (event) => {
    return (
      <UpcomingEvent
        key={event.id}
        onEditClicked={this.onEditClicked}
        onViewMoreClicked={this.onViewMoreClicked}
        oneEvent={event}
      ></UpcomingEvent>
    );
  };
  onViewMoreClicked = (event) => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      let newLatest = this.mapLatest(event);
      newState.mappedLatest = newLatest;
      return newState;
    });
  };
  toggleModal = () => {
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen, //here we flip the bool value of the previous state.
      };
    });
  };
  onFormFieldChanged = (e) => {
    //captures input values and sets them in state
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState((prevState) => {
      let newState = { ...prevState };
      let inputName = currentTarget.name;
      newState.formData[inputName] = newValue;
      return newState;
    });
  };
  onEditClicked = (editEvent) => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.formData = editEvent;
      return newState;
    }, this.toggleModal());
  };
  onChange = (page) => {
    //pagination controls
    eventService
      .getUpcoming(page - 1, this.state.pageSize)
      .then(this.onGetUpcomingSuccess)
      .catch(this.onGetUpcomingError);
    this.setState({
      current: page,
    });
  };
  storeResults = (results) => {
    //captures results from autocomplete api
    this.setState((prevState) => {
      let newState = { ...prevState };
      let newAddressObj = this.filterResults(results);
      newState.formData.metaData.location = newAddressObj;
      return newState;
    });
  };
  filterResults = (results) => {
    //massages results into a new metaData.location object
    let capturedAddress = results[0].formatted_address.split(" ");
    let zipCode = capturedAddress[capturedAddress.length - 2];
    capturedAddress.splice(capturedAddress.length - 2, 2);
    let address = capturedAddress.join(" ");
    let coordinates = results[0].geometry.viewport;
    let latitude = coordinates.Ya.i;
    let longitude = coordinates.Sa.i;
    return { zipCode, address, latitude, longitude };
  };

  submitInfo = (e) => {
    console.log(e);
  };

  //when implemented, this will grab the address and put it into a url format to get the map for the LatestEvent component
  //this functionality is currently implemented within the component itself

  // formatAddress = () => {
  //   let event = {
  //     id: 6977,
  //     description:
  //       "Qui sunt do nisi incididunt ea adipisicing exercitation quis cillum. Amet dolor aute esse nostrud. Amet ipsum aute velit et exercitation nulla Lorem enim velit in nostrud. Id duis officia ut fugiat dolor laboris elit esse.",
  //     name: "reprehenderitCon 20XX",
  //     summary:
  //       "Proident irure consectetur magna adipisicing est duis ullamco Lorem laboris consectetur ad laboris cupidatat.",
  //     headline: "Sint fugiat amet eiusmod deserunt deserunt sit do tempor.",
  //     slug: "E33421",
  //     statusId: "Active",
  //     metaData: {
  //       dateStart: "2020-11-15T12:00:00Z",
  //       dateEnd: "2021-12-31T12:00:00Z",
  //       location: {
  //         latitude: -7.248505,
  //         longitude: 161.607642,
  //         zipCode: "26196",
  //         address: "589 Village Road, Springville, Massachusetts, 3433",
  //       },
  //     },
  //   };

  //   let address = event.metaData.location.address;
  //   let addressArr = address.split(",");
  //   let length = addressArr.length - 1;
  //   // let zip = addressArr.slice(length)[0]; //store zipcode
  //   addressArr.pop();
  //   // let formattedAddress = addressArr.join(" ");
  //   addressArr.shift();
  //   let addressString = addressArr.join("+");
  //   // let url = `https://maps.googleapis.com/maps/api/staticmap?center=${addressString}&marker&zoom=12&size=500x500&key=API_KEY_HERE`;
  // };

  render() {
    return (
      <div className="container-fluid mt-5" style={{ height: "100%" }}>
        <div className="row" style={{ height: "100%" }}>
          {this.state.mappedLatest}
          <div
            className="card col-4"
            style={{
              paddingBottom: "200px",
              border: "none",
            }}
          >
            <div className="card-body">
              <div className="row">
                <React.Fragment>
                  <div className="input-group col-10">
                    <input
                      type="text"
                      className="form-control"
                      name="startDate"
                      placeholder="Start Date yyyy/mm/dd"
                      onChange={this.onSearchBarChanged}
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="endDate"
                      placeholder="End Date yyyy/mm/dd"
                      onChange={this.onSearchBarChanged}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-dark  ml-3"
                      style={{ color: "#5f5f5f", height: "75%" }}
                      onClick={this.onSearchClicked}
                    >
                      Search
                    </button>
                  </div>
                </React.Fragment>
                <button
                  className="btn btn-outline-info col-4"
                  style={{ fontSize: ".75em" }}
                >
                  Add Event
                </button>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <Pagination
                  onChange={this.onChange}
                  current={this.state.current}
                  total={this.state.totalCount}
                />
                {this.state.mappedUpcoming}
              </div>
            </div>
          </div>
        </div>
        <React.Fragment key="modalKey">
          <EventModal
            className="col-12"
            isOpen={this.state.isOpen}
            toggleModal={this.toggleModal}
            title={`Editing an Event `}
            content={
              <EventForm
                passResults={this.storeResults}
                formData={this.state.formData}
                submitInfo={this.submitInfo}
                onFormFieldChanged={this.onFormFieldChanged}
              />
            }
          />
        </React.Fragment>
      </div>
    );
  }
}

export default Events;
