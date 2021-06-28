import React from "react";

function ViewOnMap(props) {
  const mapRef = props.mapDiv;
  return (
    <div
      className="d-flex w-100 justify-content-around p-5"
      style={{ height: "800px" }}
    >
      <div
        ref={mapRef}
        id="map2"
        style={{ height: "100%", width: "100%" }}
      ></div>
    </div>
  );
}

export default ViewOnMap;
