import React from "react";
import EventNav from "./EventNav";
// import * as eventService from "./services/eventService";

class EventMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideCard: false,
      currentCard: {
        content: "",
        description: "",
        title: "",
      },
    };
  }
  // const style={"max-width: 540px;"} to card mb-3
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <h1>EVENT MAIN</h1>

            <div className="row">
              {/* -------------------------------------- CARD MAIN */}
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src="" className="card-img" alt="event location" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <h6>Content</h6>
                      <p className="card-text">
                        Description with supporting text below as a natural
                        lead-in to additional content. This content is a little
                        bit longer.
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------------------------------- EVENT NAV BAR */}
          <div className="col-4">
            <EventNav {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default EventMain;
