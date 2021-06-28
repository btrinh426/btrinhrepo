import React from "react";

function SingleEvent(props) {
  let event = props.oneEvent;
  // let photoURL = String(
  //   `http://localhost:3000/friendImages/` + friend.imageUrl
  // );
  let photoURL = "https://i.imgur.com/CQmOoYR.jpg";

  function onMore() {
    console.log("in here?");
    props.onClick(event);
  }

  function onEdit() {
    props.onEditClick(event);
  }
  return (
    <div className="container" style={{ paddingBottom: "25px" }}>
      <div className="event-card bg-blk-box">
        <div className="card-body">
          <div className="row">
            <div className="col align-self-center">
              <div className="row justify-content-md-center">
                <img className="card-img-top" src={event.image} alt="..." />
              </div>
            </div>
            <div className="col-8">
              <h4 className="card-name">{event.title}</h4>
              <p className="card-headline">{event.headline}</p>
              <p className="card-start">{event.eventDate}</p>
              <p className="card-slug d-none">slug</p>
              <p className="card-id d-none">ID</p>
              <button
                className="btn btn-primary viewMore"
                onClick={onMore}
                data-event-id={event.id}
              >
                View More
              </button>
              <button className="btn btn-secondary editEvent">Edit Me</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(SingleEvent);
