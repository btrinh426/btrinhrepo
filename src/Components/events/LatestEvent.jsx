import React from "react";

const formatAddress = (event) => {
  //the map retrieval function that I will implement at the Events level and pass in
  let addressArr = event.metaData.location.address.split(",");
  addressArr.pop();
  addressArr.shift();
  let addressString = addressArr.join("+");
  let url = `https://maps.googleapis.com/maps/api/staticmap?center=${addressString}&marker&zoom=12&size=500x500&key=API_KEY_HERE`;
  return url;
};

const LatestEvent = (props) => {
  //set variables to plug into card
  let addressArr = props.oneEvent.metaData.location.address.split(",");
  let addressLineOne = addressArr[0];
  let addressLineTwo = `${addressArr[1]}, ${addressArr[2]} ${addressArr[3]}`;
  let dateArr = props.oneEvent.metaData.dateStart.split("T");
  let date = dateArr[0];
  let timeArr = dateArr[1].split("Z");
  let time = timeArr[0].split(":")[0];

  return (
    <React.Fragment>
      <div
        className="card col-7 LatestEventCard"
        style={{
          backgroundColor: "rgb(244 248 251)",
          paddingBottom: "20px",
          height: "100%",
        }}
      >
        <div className="card-body">
          <div
            className="card-body"
            style={{
              border: "1px solid gray",
              marginBottom: "0%",
              height: "100%",
              backgroundColor: "white",
            }}
          >
            <h2 className="card-title" style={{ color: "#656565" }}>
              Get Your Tickets for {props.oneEvent.name} Now!
            </h2>
            <div className="row">
              <small className="col-6" style={{ textAlign: "left" }}>
                Slug: {props.oneEvent.slug}
              </small>
              <small className="col-6" style={{ textAlign: "right" }}>
                Date: {date}
              </small>
            </div>
          </div>
        </div>
        <div
          className="card-body"
          style={{
            height: "75%",
            borderTop: "1px solid gray",
            marginTop: "0px",
          }}
        >
          <div className="row">
            <p>{props.oneEvent.description}</p>
          </div>
          <div className="row">
            <figure
              className="col-5 "
              style={{
                height: "100%",
                width: "100%",
                border: "none",
                color: "#656565",
              }}
            >
              <div>
                {/* Commented out so the api isn't called every time the page refreshes.
                <img
                  alt="MAP"
                  src={formatAddress(props.oneEvent)}
                  style={{ height: "300px", width: "300px" }}
                ></img> */}
              </div>
            </figure>

            <figure
              className="col-6 mt-1"
              style={{
                height: "100%",
                border: "1px solid gray",
                color: "#656565",
                backgroundColor: "white",
                paddingTop: "100px",
              }}
            >
              <div className="row">
                <h4 className="ml-4">Event Location:</h4>
              </div>
              <div className="row">
                <h5 className="ml-4">{addressLineOne}</h5>
              </div>
              <div className="row">
                <h5 className="ml-4">{addressLineTwo}</h5>
              </div>
              <div className="row">
                <h5 className="ml-4">Date: {date}</h5>
              </div>
              <div className="row">
                <h5 className="ml-4 mb-4">Time: {time} pm</h5>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LatestEvent;
