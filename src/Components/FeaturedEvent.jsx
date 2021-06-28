import React from "react";
import MapContainer from "./Map";

const FeaturedEvent = (props) => {
  const eventTime = new Date(
    props.featuredEvent.metaData?.dateStart
  ).toLocaleTimeString();
  const zipCode = props.featuredEvent.metaData?.location.zipCode;

  return (
    <React.Fragment>
      <div className="col-md-12">
        <div
          className="featured-event-card"
          style={{
            paddingBotton: "10px",
            marginBottom: "10px",
          }}
        >
          <img
            src={props.featuredEvent.slug}
            width="400px"
            alt="..."
            marginTop="15px"
            marginBottom="15px"
          />
          <h5
            className="event-headline text-black-50"
            style={{ marginTop: "15px" }}
          >
            {props.featuredEvent.summary}
          </h5>
          <h5 className="event-date text-black-50 custom-padding">
            {props.featuredEvent.description}
          </h5>

          <div className="row" style={{ marginTop: "25px" }}>
            <div className="col-md-6">
              <MapContainer
                location={{
                  address: `${props.featuredEvent.metaData?.location.address} ${zipCode}`,
                  lat: props.featuredEvent.metaData?.location.latitude,
                  lng: props.featuredEvent.metaData?.location.longitude,
                }}
                mappedLocations={props.mappedLocations}
              />
            </div>
            <div className="col-md-6">
              <div className="location-info">
                <h5 className="location-info-title">Location:</h5>
                <h6 className="event-summary text-black-50 custom-padding">
                  {`${props.featuredEvent.metaData?.location.address} ${zipCode}`}
                </h6>
                <h6 className="event-time text-black-50">{eventTime}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeaturedEvent;
