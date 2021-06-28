import React, { Component } from "react";
import EventCard from "./EventCard";
import FeaturedEvent from "./FeaturedEvent";
import { getAllEvents, addEvent, editEvent } from "../services/eventsService";
import EventModal from "./EventModal";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import { LocationPin } from "./Map";
import { uploadFile } from "../services/filesService";

// Get rid of constructor and super, unless actually using
// The date: slice part is problematic - WILL WORRY ABOUT THIS LATER
// Create env file .env.development - grab key from there
// Then

class Events extends Component {
  state = {
    featuredEvent: {},
    mappedEvents: [],
    totalEvents: 0,
    dateRange: {
      dateStart: "2021-01-01",
      dateEnd: "2030-12-31",
    },
    pageIndex: 0,
    pageSize: 3,
    modalState: {
      modalShow: "",
      display: "none",
    },
    formData: {
      name: "",
      headline: "",
      description: "",
      summary: "",
      slug: "",
      dateStart: "",
      dateEnd: "",
      statusId: "",
      address: "",
      zipCode: "",
    },
    mappedLocations: [],
    file: "",
  };

  componentDidMount() {
    console.log("mounted!");
    console.log(process.env.REACT_APP_API_GOOGLE_KEY);
    let pageIndex = this.state.pageIndex;
    let pageSize = this.state.pageSize;
    let dateStart = this.state.dateRange.dateStart;
    let dateEnd = this.state.dateRange.dateEnd;

    getAllEvents(pageIndex, pageSize, dateStart, dateEnd)
      .then(this.onGetAllEventsSuccess)
      .catch(this.onGetAllEventsError);
  }

  onGetAllEventsSuccess = (res) => {
    console.log("getAllEvents success!", res);

    const allEvents = res.data.item.pagedItems;
    const [featuredEvent] = res.data.item.pagedItems;
    console.log("featuredEvent", featuredEvent);
    const totalEvents = res.data.item.totalCount;

    this.setState((prevState) => {
      return {
        mappedEvents: allEvents.map(this.mapEvent),
        totalEvents: totalEvents,
        featuredEvent: featuredEvent,
      };
    });
  };

  onGetAllEventsError = (err) => {
    console.log("getAllEvents error.", err.response);
  };

  mapEvent = (event) => {
    return (
      <EventCard
        key={`Event-${event.id}`}
        event={event}
        onEdit={this.onEdit}
        onViewMore={this.onViewMore}
      ></EventCard>
    );
  };

  onEdit = (event) => {
    console.log("edit clicked");
    this.setState({
      modalState: {
        modalShow: "show",
        display: "block",
      },
      formData: {
        id: event.id,
        name: event.name,
        headline: event.headline,
        description: event.description,
        summary: event.summary,
        slug: event.slug,
        dateStart: new Date(event.metaData?.dateStart)
          .toISOString()
          .slice(0, 10),
        dateEnd: new Date(event.metaData?.dateEnd).toISOString().slice(0, 10),
        statusId: event.statusId,
        address: event.metaData?.location?.address,
        zipCode: event.metaData?.location?.zipCode,
      },
    });
  };

  onViewMore = (event) => {
    console.log("view more clicked");
    this.setState(() => {
      return {
        featuredEvent: event,
      };
    });
  };

  onModalClose = (e) => {
    console.log("modal close clicked");
    e.preventDefault();

    this.setState({
      modalState: {
        modalShow: "",
        display: "none",
      },
    });
  };

  onNewEvent = (e) => {
    console.log("new event clicked");
    e.preventDefault();

    this.setState({
      formData: {
        name: "",
        headline: "",
        description: "",
        summary: "",
        slug: "",
        dateStart: "",
        dateEnd: "",
        statusId: "",
        address: "",
        zipCode: "",
      },
      modalState: {
        modalShow: "show",
        display: "block",
      },
    });
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    if (inputName === "statusId") {
      const isChecked = currentTarget.checked;
      if (isChecked) {
        newValue = "Active";
      } else {
        newValue = "NotSet";
      }
    }

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData: formData };
    });
  };

  onSubmit = () => {
    console.log("submit clicked");
    let formData = this.state.formData;
    let id = formData.id;
    const payload = {
      name: formData.name,
      headline: formData.headline,
      description: formData.description,
      summary: formData.summary,
      slug: formData.slug,
      statusId: formData.statusId,
      metaData: {
        dateStart: new Date(formData.dateStart).toISOString(),
        dateEnd: new Date(formData.dateEnd).toISOString(),
        location: {
          address: formData.address,
          zipCode: formData.zipCode,
        },
      },
    };

    if (id) {
      editEvent(payload, id)
        .then(this.onEditEventSuccess)
        .catch(this.onEditEventError);
    } else {
      addEvent(payload)
        .then(this.onAddEventSuccess)
        .catch(this.onAddEventError);
    }
  };

  onEditEventSuccess = (res) => {
    console.log("editEvent success!", res);
    toast.success("Success! Your event has been updated.");
  };

  onEditEventError = (err) => {
    console.log("editEvent error.", err.response);
    toast.error("Oops. Something went wrong. Please try again.");
  };

  onAddEventSuccess = (res) => {
    console.log("addEvent success!", res);
    toast.success("Success! Your event was added.");
  };

  onAddEventError = (err) => {
    console.log("addEvent error.", err.response);
    toast.error("Oops. Something went wrong.");
  };

  onChangePage = (val) => {
    console.log("val", val);

    let pageIndex = val - 1;
    let pageSize = this.state.pageSize;
    let dateStart = this.state.dateRange.dateStart;
    let dateEnd = this.state.dateRange.dateEnd;

    this.setState(() => {
      return {
        pageIndex: pageIndex,
      };
    });

    getAllEvents(pageIndex, pageSize, dateStart, dateEnd)
      .then(this.onGetAllEventsSuccess)
      .catch(this.onGetAllEventsError);
  };

  onDateInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let input = currentTarget.name;
    this.setState(() => {
      let dateRange = { ...this.state.dateRange };

      dateRange[input] = newValue;

      return { dateRange };
    });
  };

  onSearch = () => {
    let pageIndex = this.state.pageIndex;
    let pageSize = this.state.pageSize;
    let dateStart = this.state.dateRange.dateStart;
    let dateEnd = this.state.dateRange.dateEnd;

    getAllEvents(pageIndex, pageSize, dateStart, dateEnd)
      .then(this.onGetAllEventsSuccess)
      .catch(this.onGetAllEventsError);
  };

  onViewAllOnMap = () => {
    let pageIndex = this.state.pageIndex;
    let pageSize = this.state.pageSize;
    let dateStart = this.state.dateRange.dateStart;
    let dateEnd = this.state.dateRange.dateEnd;

    getAllEvents(pageIndex, pageSize, dateStart, dateEnd)
      .then(this.onGetAllEventsForMapSuccess)
      .catch(this.onGetAllEventsForMapError);
  };

  onGetAllEventsForMapSuccess = (res) => {
    console.log("onGetAllEventsForMap success!", res);

    const eventsForMap = res.data.item.pagedItems;

    this.setState(() => {
      return {
        mappedLocations: eventsForMap.map(this.mapLocation),
      };
    });
  };

  onGetAllEventsForMapError = (err) => {
    console.log("onGetAllEventsForMap error.", err.response);
  };

  mapLocation = (event) => {
    console.log("locationPin", event);
    return (
      <LocationPin
        key={`LocationPin-${event.id}`}
        lat={event.metaData.location.latitude}
        lng={event.metaData.location.longitude}
        text={`${event.metaData.location.address} ${event.metaData.location.zipCode}`}
      />
    );
  };

  onFileUpload = (file) => {
    console.log("fileUpload clicked");

    console.log("file", file);
    const formData = new FormData();

    formData.append("file", file, file.name);
    uploadFile(formData)
      .then(this.onFileUploadSuccess)
      .catch(this.onFileUploadError);
  };

  onFileUploadSuccess = (res) => {
    console.log("fileUploaded successfully!", res);
    let file = res.data.items[0];
    console.log("file", file);

    this.setState(() => {
      return {
        formData: {
          ...this.state.formData,
          slug: file,
        },
      };
    });
  };

  onFileUploadError = (err) => {
    console.log("fileUpload error.", err.response);
    console.log("error", err);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body" id="latest-event">
                  <h2 className="featuredEvent-title">
                    {this.state.featuredEvent.headline}
                  </h2>
                  <div className="row">
                    <FeaturedEvent
                      key={`FeaturedEvent-${this.state.featuredEvent.id}`}
                      featuredEvent={this.state.featuredEvent}
                      mappedLocations={this.state.mappedLocations}
                    ></FeaturedEvent>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body" id="search-events">
                  <h6 className="card-title">Search events from:</h6>
                  <div className="form-row">
                    <div className="col-5">
                      <label
                        htmlFor="date-start-input"
                        className="col-form-label"
                        placeholder="Start date"
                      ></label>
                      <div>
                        <input
                          className="form-control"
                          type="date"
                          name="dateStart"
                          style={{ width: "120%" }}
                          onChange={this.onDateInputChange}
                          value={this.state.dateRange.dateStart}
                          id="date-end-input"
                        />
                      </div>
                    </div>
                    <div className="col-5">
                      <label
                        htmlFor="date-end-input"
                        className="col-form-label"
                        placeholder="End date"
                      ></label>
                      <div>
                        <input
                          className="form-control"
                          type="date"
                          name="dateEnd"
                          style={{ marginLeft: "40px", width: "120%" }}
                          onChange={this.onDateInputChange}
                          value={this.state.dateRange.dateEnd}
                          id="date-end-input"
                        />
                      </div>
                      <button
                        type="search"
                        className="btn btn-primary"
                        id="search-button"
                        style={{
                          marginTop: "10px",
                          // marginLeft: "-15px !important",
                        }}
                        onClick={this.onSearch}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="row">
                  <div className="col-md-6">
                    <Pagination
                      className="eventPagination"
                      onChange={this.onChangePage}
                      current={this.state.pageIndex + 1}
                      pageSize={this.state.pageSize}
                      total={this.state.totalEvents}
                      style={{ marginTop: "20px", marginLeft: "20px" }}
                    ></Pagination>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="btn btn-light float-right"
                      style={{ marginTop: "20px", marginRight: "20px" }}
                      onClick={this.onNewEvent}
                    >
                      New Event
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        type="button"
                        className="btn btn-light float-right"
                        style={{ marginTop: "20px", marginLeft: "227px" }}
                        onClick={this.onViewAllOnMap}
                      >
                        View All On Map
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body" id="upcoming-events">
                  <h4 className="card-title">Upcoming Events</h4>

                  <div className="row">{this.state.mappedEvents}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EventModal
          onFileUpload={this.onFileUpload}
          file={this.state.file}
          onFormFieldChange={this.onFormFieldChange}
          onNewEvent={this.onNewEvent}
          onModalClose={this.onModalClose}
          modalShow={this.state.modalState.modalShow}
          display={this.state.modalState.display}
          event={this.state.formData}
          onSubmit={this.onSubmit}
        ></EventModal>
      </React.Fragment>
    );
  }
}

export default Events;
