import React from "react";
import GoogleMapReact from "google-map-react";

const Map = (props) => (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_GOOGLE_KEY }}
        defaultCenter={props.location}
        defaultZoom={10}
      >
        {props.mappedLocations.length > 0 ? (
          props.mappedLocations
        ) : (
          <LocationPin
            lat={props.location.lat}
            lng={props.location.lng}
            text={props.location.address}
          />
        )}
      </GoogleMapReact>
    </div>
  </div>
);

export const LocationPin = ({ text }) => (
  <div className="pin">
    <img alt="pin" height="15px" src="/Pin.png" />
    <p className="pin-text">{text}</p>
  </div>
);

export default Map;
