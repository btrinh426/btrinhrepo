import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

function ViewOnMap(props) {
  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  const mapMarkers = (event) => {
    return (
      <Marker
        key={event.id}
        onLoad={onLoad}
        position={{
          lat: event.location.latitude,
          lng: event.location.longitude,
        }}
      />
    );
  };
  return (
    <div
      className="d-flex w-100 justify-content-around p-5"
      style={{ height: "800px" }}
    >
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        zoom={8}
        center={{
          lat: props.totalEvents[0].location.latitude,
          lng: props.totalEvents[0].location.longitude,
        }}
      >
        {props.totalEvents.map(mapMarkers)}
      </GoogleMap>
    </div>
  );
}

export default ViewOnMap;
