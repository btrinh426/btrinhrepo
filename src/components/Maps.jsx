import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

class Maps extends Component {
  // const mapStyles = {
  //     width: '100%',
  //     height: '100%',
  //   };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      />
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "TOKEN HERE",
})(MapContainer);
