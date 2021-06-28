import React from "react";

function UpcomingEvent(props) {
  let dateArr = props.oneEvent.metaData.dateStart.split("T");
  let date = dateArr[0];

  const onViewMoreClicked = () => {
    props.onViewMoreClicked(props.oneEvent);
  };
  const onEditClicked = () => {
    props.onEditClicked(props.oneEvent);
  };

  return (
    <div
      className="col-12 "
      style={{
        borderBottom: ".5px solid #656565",
        marginTop: "5px",
        fontSize: ".75em",
        backgroundColor: "white",
      }}
    >
      <div className="row ml-3 ">
        <p>{props.oneEvent.headline}</p>
      </div>
      <div className="row ml-3">
        <p>{date}</p>
      </div>
      <div className="row ml-3">
        <small>{props.oneEvent.description}</small>
      </div>
      <div className="row">
        <button
          className="btn btn-primary mt-3"
          style={{ marginLeft: "15px", height: "30px", fontSize: ".75em" }}
          type="button"
          onClick={onViewMoreClicked}
        >
          View More
        </button>

        <button
          className="btn btn-dark mt-3 "
          style={{ marginLeft: "50%", height: "30px", fontSize: ".75em" }}
          type="button"
          onClick={onEditClicked}
        >
          Edit Event
        </button>
      </div>
    </div>
  );
}

export default UpcomingEvent;
