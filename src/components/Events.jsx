import React, { Component } from "react";
// import { Maps } from "./Maps";

class Events extends Component {
  // const mapStyles = {
  //         width: '100%',
  //         height: '100%',
  //       };

  render() {
    return (
      <div className="card-deck">
        <div className="card">
          <h5 className="card-title">Concert in the Park</h5>

          <img
            class="rounded-circle"
            alt="100x100"
            src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg"
            data-holder-rendered="true"
          />

          <div className="card-body">
            <p className="card-text">
              This is Concert in the Park! Concert in the Park is a family
              venue. All ages welcome. Enjoy the outdoor atmosphere, music
              begins at 6pm.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
          {/* <Maps
            google={this.props.google}
            zoom={8}
            // style={mapStyles}
            initialCenter={{ lat: 47.444, lng: -122.176 }}
          >
            {" "}
          </Maps> */}
        </div>

        <div className="card">
          <h5 className="card-title">Card title</h5>

          <img className="card-img-top" src="..." alt="Card image cap" />
          <div className="card-body">
            <p className="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Events;
