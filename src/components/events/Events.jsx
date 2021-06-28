import React from "react";
import EventSmall from "./EventSmall";
import EventModal from "./EventModal";

class Events extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row d-flex p-3">
          <div className="col-9">
            <div className="row d-flex justify-content-center">
              <div className="bd-highlight">Event Title Bar</div>
            </div>
            <div className="row">
              <div className="col">
                <div className="row d-flex justify-content-center">
                  <div className="bd-highlight text-center">
                    Event Info kuajshdf ;oadfg ;'lskfdgj;oalidfjg;oaldfkjhb
                    z'd;lkfjbz'fldgkbjma;zodifhjvna;ozIDFnb'zpdkfnb;kaJSDNv;
                    LDKZFnbm'zlidfgnb;lzkdcvnb'lzfdcgnmb/lzkfgpoiadrs;iousdf;kjbhgad;kljfrgn;kuzdJbn;kjzdn;kjhfzbdk;jfnbz;dkljfbn;zfgl'djk
                  </div>
                </div>
                <div className="row d-flex">
                  <div className="col d-flex justify-content-center">
                    <div
                      className="bd-highlight text-center"
                      style={{ height: "270px", width: "360px" }}
                    >
                      Map Holder
                    </div>
                  </div>
                  <div className="col d-flex justify-content-center">
                    <div className="bd-highlight text-center align-text-center">
                      Address Info
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="row">
              <div className="col p-1">
                <form>
                  <input
                    type="text"
                    className="form-control"
                    id="search"
                    name="search"
                    placeholder="search..."
                    // onChange={this.onFormFieldChanged}
                    // value={this.state.title}
                  />
                </form>
              </div>
              <div className="col-3">
                <div className="d-flex p-1 justify-content-center bd-highlight">
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="search"
                    name="search"
                    onClick={this.onSearchClicked}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center">
                <div className="bd-highlight">Pagination 1 -2 -3 -4 </div>
              </div>
              <div className="col-3">
                <div className="d-flex p-1 justify-content-center bd-highlight">
                  {/* <button
                    className="btn btn-primary"
                    type="button"
                    id="add"
                    // onClick={this.onAddClicked}
                  >
                    <span class="event-button">x</span>Add
                    <span class="event-button">x</span>
                  </button> */}
                  <EventModal />
                </div>
              </div>
            </div>
            {/* all small event cards go here - show 3 records */}
            <div className="row d-flex">
              <EventSmall />
              <EventSmall />
              <EventSmall />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
